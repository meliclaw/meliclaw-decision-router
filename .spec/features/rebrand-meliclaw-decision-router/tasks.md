# Tasks: Rebrand meliclaw decision router

> feature: rebrand-meliclaw-decision-router

## T-001 — Script de rebrand sobre website/ [concluida]
- Refs: US-001, AC-001
- Arquivos: website/docs, website/blog, website/i18n, website/src, website/docusaurus.config.ts
- Notas: script roda fora do repo versionado (scratchpad), aplica substituições
  ordenadas (vLLM Semantic Router → Meliclaw Decision Router; vllm-semantic-router
  → meliclaw-decision-router; Semantic Router → Decision Router com revisão
  humana por amostragem), preserva URLs reais `github.com/vllm-project/semantic-router`.
- Esforço: medio

## T-002 — Rebrand manual dos 6 docs raiz [concluida]
- Refs: US-001, AC-002
- Arquivos: README.md, AGENTS.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, GOVERNANCE.md, SECURITY.md
- Notas: inclui linha de atribuição de fork no README.md.
- Esforço: baixo

## T-003 — Rebrand de texto em deploy/ (preservando CRD/Helm) [concluida]
- Refs: US-001, AC-001, AC-003
- Arquivos: deploy/kserve, deploy/README.md
- Notas: NÃO tocar deploy/helm/semantic-router/ (nome de diretório) nem
  deploy/kubernetes/crds/vllm.ai_*.yaml (nome de arquivo e `group:` interno).
- Esforço: baixo

## T-004 — Dockerfile local (ubuntu:26.04, arm64) [concluida]
- Refs: US-002, AC-004
- Arquivos: deploy/compose/Dockerfile.local
- Notas: reusa passos de build de tools/docker/Dockerfile.extproc (go build
  ./cmd, CGO para valkey-glide, pacote model-runtime) sobre base ubuntu:26.04;
  não altera o Dockerfile canônico upstream.
- Esforço: alto

## T-005 — Config dev trimmed [concluida]
- Refs: US-002, AC-004
- Arquivos: config/config.dev.yaml
- Notas: subconjunto de listeners sem TLS, reusando fragments existentes em config/fragments.
- Esforço: medio

## T-006 — Serviço no compose Orbstack [concluida]
- Refs: US-002, AC-004
- Arquivos: ../../meliclaw-ai-gateway-core.yml
- Notas: adiciona serviço meliclaw-decision-router + volume
  meliclaw-decision-router-models, seguindo o padrão de
  meliclaw-router-core/meliclaw-harnex-router já existentes no arquivo.
- Esforço: medio

## T-007 — Compose de produção Scaleway [concluida]
- Refs: US-003, AC-005
- Arquivos: deploy/compose/docker-compose.scaleway.yml, deploy/compose/README.md
- Notas: build na própria VPS (arm64), sem pull de imagem CI (decisão
  confirmada); documenta volumes de cache de modelo e onde termina o TLS.
- Esforço: medio

## T-008 — CHANGELOG.md [concluida]
- Refs: US-001, US-002, US-003
- Arquivos: CHANGELOG.md
- Notas: formato Keep a Changelog; entrada inicial cobrindo rebrand + deploy local + deploy remoto.
- Esforço: baixo
