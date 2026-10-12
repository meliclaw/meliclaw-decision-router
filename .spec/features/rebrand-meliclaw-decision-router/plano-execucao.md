# Plano de execução — rebrand-meliclaw-decision-router

> gerado por `onp-spec plano` em 2026-10-11 19:32 — NÃO edite à mão;
> mudou tasks.md ou a config? Regenere: `onp-spec plano rebrand-meliclaw-decision-router`

## Resumo — o que vai acontecer

- **8 tarefa(s) pendente(s)**: 8 em 8 faixa(s) paralela(s) + 0 sequencial(is)
- **1 faixa = 1 worktree + 1 branch + 1 janela de contexto limpa** — faixas não compartilham nenhum arquivo entre si
- prefere outra seleção ou uma após a outra? Regenere com `onp-spec plano rebrand-meliclaw-decision-router --paralelizar T-xxx,T-yyy` ou `--sequencial`
- tudo acontece na branch de trabalho `spec/rebrand-meliclaw-decision-router`; levar para a main é decisão sua

## Faixas e ondas

### Onda 1 — faixa-1 ∥ faixa-2 ∥ faixa-3

#### faixa-1 — branch `spec/rebrand-meliclaw-decision-router-faixa-1` — worktree `../onp-worktrees/meliclaw-decision-router-rebrand-meliclaw-decision-router-faixa-1`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-001 | Script de rebrand sobre website/ | `claude-sonnet-5` | medium | `website/**/*.md`, `website/**/*.mdx`, `website/**/*.ts`, `website/**/*.tsx`, `website/docusaurus.config.ts` |

#### faixa-2 — branch `spec/rebrand-meliclaw-decision-router-faixa-2` — worktree `../onp-worktrees/meliclaw-decision-router-rebrand-meliclaw-decision-router-faixa-2`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-002 | Rebrand manual dos 6 docs raiz | `claude-sonnet-5` | low | `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `GOVERNANCE.md`, `SECURITY.md` |

#### faixa-3 — branch `spec/rebrand-meliclaw-decision-router-faixa-3` — worktree `../onp-worktrees/meliclaw-decision-router-rebrand-meliclaw-decision-router-faixa-3`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-003 | Rebrand de texto em deploy/ (preservando CRD/Helm) | `claude-sonnet-5` | low | `deploy/kserve/**`, `deploy/README.md` |

### Onda 2 — faixa-4 ∥ faixa-5 ∥ faixa-6

#### faixa-4 — branch `spec/rebrand-meliclaw-decision-router-faixa-4` — worktree `../onp-worktrees/meliclaw-decision-router-rebrand-meliclaw-decision-router-faixa-4`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-004 | Dockerfile local (ubuntu:26.04, arm64) | `claude-sonnet-5` | high | `deploy/compose/Dockerfile.local` |

#### faixa-5 — branch `spec/rebrand-meliclaw-decision-router-faixa-5` — worktree `../onp-worktrees/meliclaw-decision-router-rebrand-meliclaw-decision-router-faixa-5`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-005 | Config dev trimmed | `claude-sonnet-5` | medium | `config/config.dev.yaml` |

#### faixa-6 — branch `spec/rebrand-meliclaw-decision-router-faixa-6` — worktree `../onp-worktrees/meliclaw-decision-router-rebrand-meliclaw-decision-router-faixa-6`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-006 | Serviço no compose Orbstack | `claude-sonnet-5` | medium | `../meliclaw-ai-gateway-core.yml` |

### Onda 3 — faixa-7 ∥ faixa-8

#### faixa-7 — branch `spec/rebrand-meliclaw-decision-router-faixa-7` — worktree `../onp-worktrees/meliclaw-decision-router-rebrand-meliclaw-decision-router-faixa-7`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-007 | Compose de produção Scaleway | `claude-sonnet-5` | medium | `deploy/compose/docker-compose.scaleway.yml`, `deploy/compose/README.md` |

#### faixa-8 — branch `spec/rebrand-meliclaw-decision-router-faixa-8` — worktree `../onp-worktrees/meliclaw-decision-router-rebrand-meliclaw-decision-router-faixa-8`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-008 | CHANGELOG.md | `claude-sonnet-5` | low | `CHANGELOG.md` |

## Gestão de branches e commits

1. branch de trabalho `spec/rebrand-meliclaw-decision-router` criada do ponto atual (se ainda não existir)
2. cada faixa nasce dela como branch própria e roda no seu worktree — **1 tarefa = 1 commit** (`T-xxx feature: título`)
3. terminou a onda → merge `--no-ff` de cada faixa de volta, na ordem; conflito interrompe a faixa e pede resolução humana
4. faixa mesclada → worktree removido, branch apagada, tarefa marcada `[concluida]` no tasks.md
5. gate final na branch de trabalho: `onp-spec verify rebrand-meliclaw-decision-router` + `onp-spec audit --ci` — **exit 0 ou não está pronto**

## Como executar

### ▶ Execução — Claude Code headless

```bash
bash .spec/features/rebrand-meliclaw-decision-router/executar-tarefas.sh
```

Cada faixa roda `claude -p` com **janela de contexto limpa**, no seu worktree, com
`--model` e `--effort` já definidos por tarefa e permissões `acceptEdits`. Os prompts exatos estão
embutidos no script — quer rodar uma faixa na mão, é só copiá-los de lá.
Logs: `../onp-worktrees/meliclaw-decision-router-rebrand-meliclaw-decision-router-logs/`.

### 📣 Acompanhamento — tabela + resumo no chat (a cada 1 min)

O script roda em **background**: o agente AVISA o usuário antes de iniciar e,
enquanto roda, posta no chat a cada ~1 minuto a **tabela de andamento** (qual
tarefa está rodando, qual não está, o que concluiu/falhou) junto com o
**resumo geral de andamento** (escrito por IA; sem IA, o motor resume). Ao
final, o usuário recebe o resumo completo da execução. A qualquer momento:

```bash
onp-spec resumo rebrand-meliclaw-decision-router --tabela   # a tabela de andamento
onp-spec resumo rebrand-meliclaw-decision-router            # o resumo em texto
```

