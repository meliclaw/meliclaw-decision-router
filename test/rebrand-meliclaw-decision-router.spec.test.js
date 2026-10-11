// Testes de spec da feature rebrand-meliclaw-decision-router
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

function grepFiles(pattern, dir) {
  try {
    const out = execFileSync('grep', ['-rl', pattern, dir], { cwd: ROOT, encoding: 'utf8' });
    return out.split('\n').filter(Boolean);
  } catch (err) {
    if (err.status === 1) return []; // grep: no matches
    throw err;
  }
}

// Histórico (blog + citações acadêmicas) é registro factual, não rebrand.
// Docs gerados (docs-cli-check, api-docs-check) refletem código Go/Python
// não tocado nesta spec (fora de escopo — ver .spec/.../spec.md, Fora de
// escopo) — rebrandeá-los à mão quebraria o check de geração no CI.
const HISTORICAL_PATTERN = /(^|\/)blog(\/|$)|docusaurus-plugin-content-blog|researchContent\.js$|publications\.js$|fleet-sim\/(refs\.bib|fleet-sim\.tex)$|docs\/api\/cli\.md$|docs\/api\/apiserver\.md$|openapi\/apiserver\/apiserver\.openapi\.json$|docs\/api\/crd-reference\.md$/;

// US-001 — Rebrand de marca em docs e website
test('AC-001: Website sem a marca antiga @spec:AC-001', () => {
  const hits = grepFiles('vLLM Semantic Router', 'website').filter((f) => !HISTORICAL_PATTERN.test(f));
  assert.deepEqual(hits, [], `arquivos ainda com "vLLM Semantic Router" fora do histórico: ${hits.join(', ')}`);
});

// US-001 — Rebrand de marca em docs e website
test('AC-002: Documentos raiz com atribuição preservada @spec:AC-002', () => {
  // README.md e SECURITY.md citam a marca antiga apenas em texto de
  // atribuição/upstream (revisado manualmente); os demais devem estar limpos.
  const filesMustBeClean = ['CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'GOVERNANCE.md'];
  for (const f of filesMustBeClean) {
    const text = readFileSync(path.join(ROOT, f), 'utf8');
    assert.ok(!text.includes('vLLM Semantic Router'), `${f} ainda usa "vLLM Semantic Router"`);
  }
  const contributing = readFileSync(path.join(ROOT, 'CONTRIBUTING.md'), 'utf8');
  assert.ok(contributing.includes('Meliclaw Decision Router'), 'CONTRIBUTING.md não menciona "Meliclaw Decision Router"');
  const readme = readFileSync(path.join(ROOT, 'README.md'), 'utf8');
  assert.ok(readme.includes('Meliclaw Decision Router') && readme.includes('fork of'), 'README.md não menciona Meliclaw Decision Router / atribuição de fork');
  const security = readFileSync(path.join(ROOT, 'SECURITY.md'), 'utf8');
  assert.ok(security.includes('Meliclaw Decision Router'), 'SECURITY.md não menciona "Meliclaw Decision Router"');
  const agents = readFileSync(path.join(ROOT, 'AGENTS.md'), 'utf8');
  assert.ok(agents.includes('Meliclaw Decision Router') && agents.includes('fork of'), 'AGENTS.md não menciona Meliclaw Decision Router / atribuição de fork');
});

// US-001 — Rebrand de marca em docs e website
test('AC-003: Estruturas técnicas da marca antiga preservadas @spec:AC-003', () => {
  const crdDir = path.join(ROOT, 'deploy/kubernetes/crds');
  const helmDir = path.join(ROOT, 'deploy/helm/semantic-router');
  assert.ok(existsSync(helmDir), 'deploy/helm/semantic-router/ deveria continuar existindo');
  const crdFiles = grepFiles('vllm.ai', 'deploy/kubernetes/crds');
  assert.ok(crdFiles.length > 0, 'deploy/kubernetes/crds deveria continuar usando o group vllm.ai');
  assert.ok(existsSync(crdDir), 'deploy/kubernetes/crds/ deveria continuar existindo');
});

// US-002 — Deploy local no Orbstack
test('AC-004: Serviço sobe e fica saudável @spec:AC-004', () => {
  const composePath = path.resolve(ROOT, '../../meliclaw-ai-gateway-core.yml');
  assert.ok(existsSync(composePath), `compose não encontrado em ${composePath}`);
  const text = readFileSync(composePath, 'utf8');
  assert.ok(text.includes('meliclaw-decision-router:'), 'serviço meliclaw-decision-router não está no compose');
  assert.ok(existsSync(path.join(ROOT, 'deploy/compose/Dockerfile.local')), 'Dockerfile.local não existe');
  // Validação sintática: docker compose config não falha. Subir o container
  // de fato (docker compose up) fica fora do test runner — ver AC-004 no
  // README de verificação manual.
  execFileSync('docker', ['compose', '-f', composePath, 'config', '--quiet'], { encoding: 'utf8' });
});

// US-003 — Deploy remoto na VPS Scaleway
test('AC-005: Compose de produção existe e valida @spec:AC-005', () => {
  const composePath = path.join(ROOT, 'deploy/compose/docker-compose.scaleway.yml');
  assert.ok(existsSync(composePath), 'docker-compose.scaleway.yml não existe');
  execFileSync('docker', ['compose', '-f', composePath, 'config', '--quiet'], { encoding: 'utf8' });
});
