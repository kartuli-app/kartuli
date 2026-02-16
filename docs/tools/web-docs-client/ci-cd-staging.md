---
section: Tools/Web Docs Client
title: Web Docs Client CI/CD Staging
type: ci-cd
description: Validation pipeline that mirrors production generate/build/copy without deploying.
---

# Web Docs Client CI/CD Staging

## Overview

Runs the same generate, build, and copy steps as production without deploying.

Used to catch regressions (e.g. dependency or tooling changes) on pushes and pull requests to `main` when docs or web-docs-client sources change.

## Triggers

- Push to `main`, or pull request targeting `main`, when any of these paths change:
  - `docs/**`
  - `tools/web-docs-client/**`
  - `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `package.json`
  - `.github/workflows/web-docs-client-validate-staging.yml`

## Pipeline Steps

1. Checkout repository, install dependencies.
2. Generate LLM bundle from docs (writes to `docs/kartuli-llm.txt`).
3. Build docs site (`pnpm run c:build:docs`).
4. Copy LLM bundle into built assets so the site could serve it at the same URL as production.
5. Validate output artifacts: bundle exists in `docs/`, built `index.html` exists, bundle exists in `dist/assets`.

## Validation Gates

- LLM bundle generation succeeds.
- Docs build succeeds.
- Copy step succeeds.
- Artifact checks pass (bundle file, dist index, bundle in assets).

## Failure Handling

- Inspect the workflow run logs in GitHub Actions.
- Fix the failing step (e.g. fix docs, script, or dependencies) and push or re-run the workflow.

## References

### Related Docs

- [Web Docs Client Hub](./index.md)
- [Web Docs Client CI/CD Production](./ci-cd-production.md)

### Providers

- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
