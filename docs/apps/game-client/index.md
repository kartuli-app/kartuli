---
section: Apps/Game Client
title: Game Client Hub
description: "Hub for the game client app: overview, root scripts, and CI/CD."
type: hub
---

# Game Client Hub

## Overview

The game client is the Georgian language learning game application (Next.js). It is deployable to Vercel and runs in staging (preview) and production.

**In-repo README:** [apps/game-client/README.md](https://github.com/kartuli-app/kartuli/blob/main/apps/game-client/README.md)

## Root scripts that apply

From the repository root you can use:

| Script | Description |
|--------|-------------|
| `pnpm c:dev:game-client` | Start development server (port 3000) |
| `pnpm c:build:game-client` | Build for production |
| `pnpm c:preview:game-client` | Run production build locally |
| `pnpm c:e2e:game-client` | Run E2E tests against local game client (BASE_URL=http://localhost:3000) |

See [Root scripts](../../tech/development/root-scripts.md) for the full list of root-level commands.

## Offline and PWA

- [Offline PWA and Service Worker](./offline-pwa-service-worker.md) — Service worker implementation (Serwist), dev vs prod, and Vercel allowlist for `/serwist/`.

## CI/CD

- [CI/CD Staging](./ci-cd-staging.md) — Runs on PR when the game client (or backoffice) is affected; build, optional Vercel preview, E2E, Lighthouse.
- [CI/CD Production](./ci-cd-production.md) — Runs on push to `main` when game-client (or related) paths change; deploy to Vercel, E2E, Lighthouse.

## References

### Related docs

- [Staging pipelines](../../tech/development/staging-pipelines.md)
- [Production pipelines](../../tech/development/production-pipelines.md)
- [Documentation Home](../../index.md)

### Providers

- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
- [Vercel Next.js Hosting](../../providers/vercel-nextjs-hosting.md)
