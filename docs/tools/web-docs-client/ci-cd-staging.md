---
section: Tools/Web Docs Client
title: Web Docs Client CI/CD Staging
type: ci-cd
description: "Staging validation for the docs site via the orchestrator: build, preview, and E2E (no deploy)."
---

# Web Docs Client CI/CD Staging

## Overview

Staging runs only through the **Staging Orchestrator** on pull requests targeting `main`. The orchestrator detects affected packages (Turbo `build` task vs `origin/main`); when `@kartuli/web-docs-client` is affected, it calls this workflow.

**Workflow file:** [.github/workflows/staging-w-tool-web-docs-client.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-w-tool-web-docs-client.yml)

## Triggers

- **workflow_call** from the [Staging Orchestrator](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-orchestrator.yml) when `@kartuli/web-docs-client` is in the affected build set (Turbo `build` affected by the PR vs `origin/main`).
- **workflow_dispatch** (manual run).

Paths that can affect `@kartuli/web-docs-client` (and thus cause the orchestrator to invoke this workflow) include: `docs/**`, `tools/web-docs-client/**`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `package.json`, `turbo.json`, and related config.

## Pipeline Steps

Single job: **validate-build-and-quality**

1. Checkout repository
2. CI setup Node (`.github/actions/ci-setup-node`)
3. Validate monorepo package for `web-docs-client` (`.github/actions/ci-validate-monorepo-package`)
4. Generate LLM bundle: `node tools/web-docs-client/scripts/generate-llm-bundle.js`
5. Build: `pnpm turbo run build --filter=@kartuli/web-docs-client`
6. Start preview server in the background and wait until it is ready (e.g. `http://localhost:4173`)
7. Setup Playwright (`.github/actions/ci-setup-playwright`)
8. Run E2E: `pnpm --filter @kartuli/e2e exec playwright test tests/web-docs-client` (BASE_URL: `http://localhost:4173`)
9. On failure: upload E2E artifacts (`tools/e2e/test-results/`) with 3-day retention

Staging does **not** run the “copy LLM bundle to built assets” step or deploy; it validates build and runs smoke E2E against the preview server.

## Failure Handling

- Inspect the workflow run and job logs in GitHub Actions.
- Fix the failing step (e.g. docs, scripts, dependencies, or E2E tests) and push or re-run the workflow.

## References

### Related Docs

- [Web Docs Client Hub](./index.md)
- [Web Docs Client CI/CD Production](./ci-cd-production.md)
- [Staging pipelines](../../tech/development/staging-pipelines.md)

### Providers

- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
