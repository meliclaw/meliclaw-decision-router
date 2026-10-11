# Compose deploys

Two Compose setups, both using `deploy/compose/Dockerfile.local`
(`ubuntu:26.04`, arm64):

- **Local / Orbstack**: the service lives in the top-level
  `meliclaw-ai-gateway-core.yml` (Orbstack group `meliclaw-ai-gateway-core`),
  alongside the rest of the AI gateway stack. Uses `config/config.dev.yaml`
  (no TLS listener).
- **Scaleway VPS**: `docker-compose.scaleway.yml` in this directory. Standalone
  — no dependency on the other `meliclaw-ai-gateway-core` services. Builds the
  image on the VPS itself (arm64 host, same architecture as local dev, no
  cross-arch build needed). Uses the full `config/config.yaml` (TLS listener
  included — point `config/certs/` at real certs, or terminate TLS at a
  Scaleway Load Balancer in front of this service and drop the `8443`
  listener from the config instead).

## Deploying to the VPS

```bash
git clone https://github.com/meliclaw/meliclaw-decision-router.git
cd meliclaw-decision-router
docker compose -f deploy/compose/docker-compose.scaleway.yml up -d --build
```

## Open items

- TLS termination point (at the router vs. a Scaleway LB) — decide before
  exposing `8443` publicly; see `ASM-003` in
  `.spec/features/rebrand-meliclaw-decision-router/spec.md`.
- Model/kernel cache (`meliclaw-decision-router-models` volume) is local to
  the VPS — back it up or re-warm it after a VPS rebuild.
