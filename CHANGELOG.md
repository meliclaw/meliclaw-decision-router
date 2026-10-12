# Changelog

All notable changes to Meliclaw Decision Router are documented here. Format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Rebranded product name from "vLLM Semantic Router" to "Meliclaw Decision
  Router" across `website/`, root documentation (`README.md`, `AGENTS.md`,
  `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`), and `deploy/`
  manifests — text/branding only. The CRD API group `vllm.ai` and the Helm
  chart directory `deploy/helm/semantic-router/` are unchanged (structural
  rename deferred).

### Added

- Local Docker Compose service `meliclaw-decision-router` for the Orbstack
  group `meliclaw-ai-gateway-core`, built from a new
  `deploy/compose/Dockerfile.local` (`ubuntu:26.04`, arm64).
- `deploy/compose/docker-compose.scaleway.yml` for remote deployment on the
  Scaleway VPS (arm64, built on the host).
- SDD spec for this change under
  `.spec/features/rebrand-meliclaw-decision-router/`.
