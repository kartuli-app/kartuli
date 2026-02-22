---
section: Apps/Backoffice Client
title: Backoffice Client CI/CD Production
type: ci-cd
description: Production deploy pipeline for the backoffice client to Vercel, with E2E and Lighthouse.
---

# Backoffice Client CI/CD Production

## Overview

Builds and deploys the backoffice client to Vercel (production), then runs E2E production tests and Lighthouse CI. Runs only on **push to `main`** when relevant paths change.

Workflow file: [production-w-app-backoffice-client.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/production-w-app-backoffice-client.yml)

## Triggers

- **Push to `main`** when any of these paths change:
  - `apps/backoffice-client/**`
  - `packages/ui/**`, `packages/theme/**`
  - `tools/e2e/**`
  - `package.json`, `pnpm-lock.yaml`, `turbo.json`
  - `.github/workflows/production-w-app-backoffice-client.yml`
- **workflow_dispatch** for manual runs.

## Pipeline steps

1. Checkout repository (full depth).
2. CI setup (Node, dependencies).
3. Validate monorepo package for `backoffice-client`.
4. **Deploy to Vercel** (production) using `VERCEL_PROJECT_ID_BACKOFFICE_CLIENT`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`.
5. **Run E2E production tests** against `https://backoffice.kartuli.app` (tests under `tools/e2e/tests/backoffice-client/production`).
6. **Run Lighthouse CI** (assertions; artifacts on failure).

## Failure handling

- Inspect the failing job in GitHub Actions (deploy, E2E, or Lighthouse).
- Fix the cause (e.g. build, tests, or Vercel config) and push to `main` or re-run the workflow.

## References

### Related docs

- [Backoffice Client Hub](./index.md)
- [Backoffice Client CI/CD Staging](./ci-cd-staging.md)
- [Production pipelines](../../tech/development/production-pipelines.md)

### Providers

- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
- [Vercel Next.js Hosting](../../providers/vercel-nextjs-hosting.md)
