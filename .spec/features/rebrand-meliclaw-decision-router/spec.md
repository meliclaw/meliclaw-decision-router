# Spec: Rebrand meliclaw decision router

> feature: rebrand-meliclaw-decision-router
> status: pronto

## Contexto

Este projeto é fork de `vllm-project/semantic-router` e será comercializado
sob Apache 2.0 como "Meliclaw Decision Router". Referências de marca
"vLLM Semantic Router" em docs/website precisam mudar para evitar conflito de
marca registrada, e o serviço precisa de um caminho de deploy local
(Orbstack/Docker Compose) e remoto (VPS Scaleway).

## Histórias

### US-001 — Rebrand de marca em docs e website

Como responsável legal/produto, quero que toda menção pública ao nome
"vLLM Semantic Router" seja substituída por "Meliclaw Decision Router" nos
documentos e no site, para que não haja violação de marca ao comercializar o
produto.

#### AC-001 — Website sem a marca antiga

- **Dado** o diretório `website/` com 641 arquivos mencionando a marca antiga
- **Quando** o script de substituição roda sobre `website/**/*.{md,mdx,ts,tsx}`
- **Então** `grep -rl "vLLM Semantic Router" website/` não retorna nenhum
  arquivo (exceto, se existir, uma nota de atribuição explícita de fork)

#### AC-002 — Documentos raiz com atribuição preservada

- **Dado** os 6 arquivos `README.md`, `AGENTS.md`, `CONTRIBUTING.md`,
  `CODE_OF_CONDUCT.md`, `GOVERNANCE.md`, `SECURITY.md`
- **Quando** revisados manualmente
- **Então** cada um usa "Meliclaw Decision Router" como nome do produto E
  `README.md` contém uma linha citando que é fork de "vLLM Semantic Router"
  sob Apache 2.0 (atribuição exigida pela licença)

#### AC-003 — Estruturas técnicas da marca antiga preservadas

- **Dado** o CRD group `vllm.ai` e o diretório do chart Helm
  `deploy/helm/semantic-router/`
- **Quando** o rebrand de texto é aplicado
- **Então** `deploy/kubernetes/crds/vllm.ai_*.yaml` (nome de arquivo e
  `group:` no conteúdo) e o caminho `deploy/helm/semantic-router/` continuam
  existindo sem alteração estrutural

### US-002 — Deploy local no Orbstack

Como desenvolvedor, quero rodar o Meliclaw Decision Router localmente via
Docker Compose no grupo visual Orbstack `meliclaw-ai-gateway-core`, para
testar o serviço antes de publicar.

#### AC-004 — Serviço sobe e fica saudável

- **Dado** o arquivo
  `/Volumes/Backup/Projects/src/heyzify/agentic-platform/meliclaw-ai-gateway-core.yml`
  com o novo serviço `meliclaw-decision-router` (build `ubuntu:26.04`)
- **Quando** `docker compose -f meliclaw-ai-gateway-core.yml --profile meliclaw-ai-gateway-core up -d meliclaw-decision-router`
- **Então** `docker inspect --format='{{.State.Health.Status}}' meliclaw-decision-router`
  retorna `healthy` dentro de 90s

### US-003 — Deploy remoto na VPS Scaleway

Como operador, quero um compose de produção documentado para rodar o router
na VPS Scaleway, para publicar o serviço fora do ambiente local.

#### AC-005 — Compose de produção existe e valida

- **Dado** o arquivo `deploy/compose/docker-compose.scaleway.yml`
- **Quando** `docker compose -f deploy/compose/docker-compose.scaleway.yml config`
- **Então** o comando sai com código 0 (compose sintaticamente válido)

## Fora de escopo

- Renomear o CRD group `vllm.ai` ou o diretório do chart Helm
  `deploy/helm/semantic-router/` (mudança estrutural, feature futura).
- Traduzir o conteúdo técnico de `deploy/kserve/inference-examples/` além da
  substituição de texto de marca.
- Provisionar a VPS Scaleway em si (criar a instância, DNS, etc.) — só o
  compose/documentação do lado do repositório.

## Suposições

| ID | Suposição | Status | Resolução |
|---|---|---|---|
| ASM-001 | A imagem `ubuntu:26.04` tem suporte oficial multi-arch (arm64) nos mirrors apt disponíveis no momento do build | confirmada | VPS Scaleway e Orbstack local são ambos arm64 — mesma base, sem build cross-arch. |
| ASM-002 | A VPS Scaleway roda apenas CPU (sem GPU dedicada) | confirmada | Instância arm64 confirmada pelo usuário; sem menção de GPU. |
| ASM-003 | TLS termina em frente ao router (load balancer Scaleway ou proxy), não dentro do container | aberta | — |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-001 | A VPS Scaleway já está provisionada? Qual o tier (CPU/RAM/arquitetura)? | respondida | Já existe, arquitetura ARM64. |
| Q-002 | O deploy remoto deve puxar imagem já publicada via CI (`docker-publish.yml`) ou buildar na própria VPS? | respondida | Build na própria VPS (clona o repo, `docker compose build` local). |
