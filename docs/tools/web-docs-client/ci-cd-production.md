---
section: Tools/Web Docs Client
title: Web Docs Client CI/CD Production
type: ci-cd
description: "Production deploy for the docs site and LLM bundle to GitHub Pages (main only, no conditionals)."
---

# Web Docs Client CI/CD Production

## Overview

Dedicated production workflow: validates the package, generates the LLM bundle, builds the VitePress site, copies the bundle into the built output, and deploys to GitHub Pages. It runs only on **push to `main`** (when relevant paths change) or when manually dispatched. There are no branch conditionals inside the workflow—production is separate from staging; staging is handled by the [Staging Orchestrator](../../tech/development/staging-pipelines.md).

**Workflow file:** [.github/workflows/production-w-tool-web-docs-client.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/production-w-tool-web-docs-client.yml)

## Triggers

- **Push to `main`** when any of these paths change:
  - `docs/**`
  - `tools/web-docs-client/**`
  - `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `package.json`
  - `.github/workflows/production-w-tool-web-docs-client.yml`
- **workflow_dispatch** (manual run)

Pull requests do **not** run this workflow; they go through staging via the orchestrator.

## Pipeline Steps

1. **build** (runs on `main` only)
   - Checkout repository
   - CI setup Node (`.github/actions/ci-setup-node`)
   - Validate monorepo package for `web-docs-client` (`.github/actions/ci-validate-monorepo-package`)
   - Generate LLM bundle: `node tools/web-docs-client/scripts/generate-llm-bundle.js`
   - Build docs: `pnpm run c:build:web-docs-client`
   - Copy LLM bundle into built assets: `node tools/web-docs-client/scripts/copy-llm-bundle.js`
   - Configure GitHub Pages (enablement)
   - Upload artifact: `tools/web-docs-client/.vitepress/dist` as the Pages artifact

2. **deploy** (depends on `build`, runs on `main` only)
   - Deploy the uploaded artifact to GitHub Pages (environment: `github-pages`)

## Concurrency

- Group name includes the workflow name and the current Git ref (e.g. `refs/heads/main`). See the workflow file for the exact expression.
- New runs cancel in-progress runs for the same ref.

## Failure Handling

- Inspect the failing job (build or deploy) in GitHub Actions.
- Fix the failing step (e.g. docs, scripts, lockfile) and push to `main` or re-run the workflow.
- If deploy fails after build succeeded, check permissions and GitHub Pages configuration, then retry or re-run.

## References

### Related Docs

- [Web Docs Client Hub](./index.md)
- [Web Docs Client CI/CD Staging](./ci-cd-staging.md)
- [Staging pipelines](../../tech/development/staging-pipelines.md)

### Providers

- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
- [GitHub Pages Hosting Provider](../../providers/github-pages-hosting.md)
