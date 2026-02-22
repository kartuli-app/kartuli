---
section: Apps/Game Client
title: Game Client CI/CD Staging
type: ci-cd
description: "Staging pipeline for the game client: build, optional Vercel preview, E2E, Lighthouse."
---

# Game Client CI/CD Staging

## Overview

The game client (and backoffice client) share the **Staging – Next.js app** workflow. Staging runs on **pull requests** when the orchestrator detects that `@kartuli/game-client` or `@kartuli/backoffice-client` is affected (Turbo `build` affected vs `origin/main`).

The orchestrator calls the reusable workflow [staging-w-app-nextjs](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-w-app-nextjs.yml) once per affected target (e.g. `game-client`). Each run can use **local** (build + start + E2E + Lighthouse) or **vercel** (deploy preview + E2E against preview URL + Lighthouse).

## Triggers

- **Pull request** targeting `main`: the [Staging Orchestrator](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-orchestrator.yml) runs, detects affected packages via `turbo run build --dry=json --affected`, and calls the Next.js staging workflow for each of `game-client` and/or `backoffice-client` when their package is in the affected set.
- Paths that can affect the game client include: `apps/game-client/**`, shared packages (e.g. `packages/ui/**`), `package.json`, `pnpm-lock.yaml`, `turbo.json`, and the workflow file itself.

## Pipeline steps (per target)

1. Checkout, CI setup (Node, dependencies).
2. Validate monorepo package for the target.
3. **If deploy_target is local:** Build, start server, run E2E (smoke), run Lighthouse.
4. **If deploy_target is vercel:** Deploy to Vercel preview, run E2E against preview URL (with protection bypass), run Lighthouse.

## References

### Related docs

- [Game Client Hub](./index.md)
- [Game Client CI/CD Production](./ci-cd-production.md)
- [Staging pipelines](../../tech/development/staging-pipelines.md)

### Providers

- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
- [Vercel Next.js Hosting](../../providers/vercel-nextjs-hosting.md)
