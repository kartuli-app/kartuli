---
section: Tools/Web Docs Client
title: Web Docs Client CI/CD Production
type: ci-cd
description: Production deploy pipeline for the docs site and LLM bundle to GitHub Pages.
---

# Web Docs Client CI/CD Production

## Overview

Builds the docs site from `docs/`, generates and ships the LLM bundle into the built output, and deploys to GitHub Pages.

Runs on push and pull request to `main` when docs or web-docs-client sources change. Deployment to GitHub Pages runs only on `main`; PRs run generate and build only.

## Triggers

- Push to `main`, or pull request targeting `main`, when any of these paths change:
  - `docs/**`
  - `tools/web-docs-client/**`
  - `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `package.json`
  - `.github/workflows/web-docs-client-deploy-production.yml`

## Pipeline Steps

1. **Generate bundle** (always): Checkout, install dependencies, generate LLM bundle, upload bundle as workflow artifact.
2. **Build** (on `main` only): Checkout, install dependencies, download LLM bundle artifact into `docs/`, build docs site (`pnpm run c:build:web-docs-client`), copy bundle into built assets so the site can serve it, configure GitHub Pages, upload the built output as the Pages artifact.
3. **Deploy** (on `main` only): Deploy the Pages artifact to GitHub Pages.

## Validation Gates

- Generate-bundle job completes successfully.
- Build job completes successfully (build and copy steps).
- Deploy job completes successfully.

## Failure Handling

- Inspect the failing job’s logs in GitHub Actions.
- Fix the failing step (e.g. fix docs or script, fix lockfile) and push or re-run the workflow.
- If deploy fails after build succeeded, confirm root cause (e.g. permissions, Pages config) then retry deployment or re-run the workflow.

## References

### Related Docs

- [Web Docs Client Hub](./index.md)
- [Web Docs Client CI/CD Staging](./ci-cd-staging.md)

### Providers

- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
- [GitHub Pages Hosting Provider](../../providers/github-pages-hosting.md)
