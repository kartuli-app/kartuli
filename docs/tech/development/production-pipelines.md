---
section: Tech/Development
title: Production Pipelines
description: "How production deploy works: path filters, main-only, per-app workflows."
---

# Production Pipelines

## Overview

Production runs only on **push to `main`**. There is no single orchestrator; each app or tool has its own production workflow (if it has a production deploy). Workflows use **path filters** so they run only when relevant files change.

## Production workflows

| Workflow | App/tool | Path filters (examples) | Deploy target |
|----------|----------|--------------------------|---------------|
| [production-w-app-game-client.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/production-w-app-game-client.yml) | Game client | `apps/game-client/**`, `packages/ui/**`, `packages/theme/**`, `tools/e2e/**`, lockfiles, workflow file | Vercel (www.kartuli.app) |
| [production-w-app-backoffice-client.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/production-w-app-backoffice-client.yml) | Backoffice client | `apps/backoffice-client/**`, `packages/ui/**`, `packages/theme/**`, `tools/e2e/**`, lockfiles, workflow file | Vercel (backoffice.kartuli.app) |
| [production-w-tool-web-docs-client.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/production-w-tool-web-docs-client.yml) | Web docs client | `docs/**`, `tools/web-docs-client/**`, lockfiles, workflow file | GitHub Pages |

Each workflow runs only when `github.ref == 'refs/heads/main'` (push to main); path filters further restrict when it runs.

## Typical steps (Next.js apps)

1. Checkout, CI setup, validate monorepo package.
2. Deploy to Vercel (production) using app-specific project ID and secrets.
3. Run E2E production tests against the production URL.
4. Run Lighthouse CI.

## Per-app / per-tool docs

- [Game Client CI/CD Production](../../apps/game-client/ci-cd-production.md)
- [Backoffice Client CI/CD Production](../../apps/backoffice-client/ci-cd-production.md)
- [Web Docs Client CI/CD Production](../../tools/web-docs-client/ci-cd-production.md)
- [E2E in Production CI](../../tools/e2e/ci-cd-production.md)

## References

- [Pipeline overview](../architecture/pipeline-overview.md)
- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
