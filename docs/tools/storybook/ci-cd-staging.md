---
section: Tools/Storybook
title: Storybook CI/CD Staging
type: ci-cd
description: "Staging pipeline for Storybook: build, preview, E2E smoke."
---

# Storybook CI/CD Staging

## Overview

The Storybook staging workflow runs on **pull requests** when the orchestrator detects that `@kartuli/storybook` is affected (Turbo `build` affected vs `origin/main`). It builds Storybook, starts the preview server, and runs E2E smoke tests.

Workflow file: [staging-w-tool-storybook.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-w-tool-storybook.yml)

## Triggers

- **Pull request** targeting `main`: the [Staging Orchestrator](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-orchestrator.yml) runs, detects affected packages via `turbo run build --dry=json --affected`, and calls the Storybook staging workflow when `@kartuli/storybook` is in the affected set.
- Paths that can affect Storybook include: `tools/storybook/**`, shared packages (e.g. `packages/ui/**`), `package.json`, `pnpm-lock.yaml`, `turbo.json`, and the workflow file itself.
- **workflow_dispatch** for manual runs.

## Pipeline steps

1. Checkout, CI setup (Node, dependencies).
2. Validate monorepo package for `storybook`.
3. Build: `pnpm turbo run build --filter=@kartuli/storybook`.
4. Start preview server in background (port 6006).
5. Setup Playwright, run E2E: `pnpm --filter @kartuli/e2e exec playwright test tests/storybook` with `BASE_URL=http://localhost:6006`.
6. On E2E failure: upload E2E artifacts.

## References

### Related docs

- [Storybook Hub](./index.md)
- [Staging pipelines](../../tech/development/staging-pipelines.md)

### Providers

- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
