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
  cross-arch build needed). Reachable only over Tailscale (no public IP/domain
  provisioned) — WireGuard covers transport encryption, so this runs
  `config/config.dev.yaml` in `-gateway=standalone` mode (HTTP only, same as
  local). If/when this is exposed to the public internet, revisit TLS: either
  terminate at a Scaleway Load Balancer in front, or mount real certs and
  switch to `config/config.yaml`'s `https-8443` listener — see `ASM-003` in
  `.spec/features/rebrand-meliclaw-decision-router/spec.md`.

## Deploying to the VPS

```bash
git clone https://github.com/meliclaw/meliclaw-decision-router.git
cd meliclaw-decision-router
docker compose -f deploy/compose/docker-compose.scaleway.yml up -d --build
```

## Open items

- Model/kernel cache (`meliclaw-decision-router-models` volume) is local to
  the VPS — back it up or re-warm it after a VPS rebuild.
