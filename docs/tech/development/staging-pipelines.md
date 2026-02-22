---
section: Tech/Development
title: Staging Pipelines
description: "How staging CI works: orchestrator, affected detection, and per-app/tool workflows."
---

# Staging Pipelines

## Overview

Staging runs on **pull requests** targeting `main` (and optionally via `workflow_dispatch`). A single entry workflow, the **Staging Orchestrator**, runs first. It detects which packages are **affected** (Turbo `build` affected vs `origin/main`), then calls the appropriate reusable workflows only for those targets. A separate **validate-e2e** job runs lint and typecheck for the E2E package on every PR that runs the orchestrator.

## Orchestrator flow

1. **detect-affected** — Checkout, install deps, `git fetch origin main`, run `pnpm exec turbo run build --dry=json --affected` (base: `origin/main`). Map package names to workflow target arrays: **nextjs_targets** (game-client, backoffice-client), **web_docs_targets** (web-docs-client), **storybook_targets** (storybook).
2. **call-nextjs-staging-workflow** — If any Next.js app is affected, call [staging-w-app-nextjs.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-w-app-nextjs.yml) once per target (matrix: game-client, backoffice-client) with `deploy_target: local`.
3. **call-web-docs-staging-workflow** — If web-docs-client is affected, call [staging-w-tool-web-docs-client.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-w-tool-web-docs-client.yml).
4. **call-storybook-staging-workflow** — If storybook is affected, call [staging-w-tool-storybook.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-w-tool-storybook.yml).
5. **validate-e2e** — Lint and typecheck `@kartuli/e2e` (no Playwright run).

## Workflow files (staging)

| Workflow | Purpose |
|----------|---------|
| `staging-orchestrator.yml` | Entry point; detect affected; call per-app/tool workflows; validate-e2e |
| `staging-w-app-nextjs.yml` | Next.js apps: build, optional Vercel preview, E2E, Lighthouse |
| `staging-w-tool-web-docs-client.yml` | Web docs: generate LLM bundle, build, preview, E2E |
| `staging-w-tool-storybook.yml` | Storybook: build, preview, E2E smoke |

## Per-app / per-tool docs

- [Game Client CI/CD Staging](../../apps/game-client/ci-cd-staging.md)
- [Backoffice Client CI/CD Staging](../../apps/backoffice-client/ci-cd-staging.md)
- [Web Docs Client CI/CD Staging](../../tools/web-docs-client/ci-cd-staging.md)
- [Storybook CI/CD Staging](../../tools/storybook/ci-cd-staging.md)
- [E2E in Staging CI](../../tools/e2e/ci-cd-staging.md)

## References

- [Pipeline overview](../architecture/pipeline-overview.md)
- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
