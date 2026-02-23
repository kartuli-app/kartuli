---
section: Tools/E2E
title: E2E in Staging CI
type: ci-cd
description: "How E2E is used in staging: validate-e2e job and E2E steps in app/tool workflows."
---

# E2E in Staging CI

## Overview

E2E runs in staging in two ways: (1) a **validate-e2e** job in the Staging Orchestrator (lint + typecheck only), and (2) **E2E test steps** inside the Next.js, Storybook, and Web Docs staging workflows after each app is built and (where applicable) started or deployed.

## Where E2E runs in staging

| Workflow | E2E step |
|----------|----------|
| [Staging Orchestrator](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-orchestrator.yml) | **validate-e2e** job: lint and typecheck `@kartuli/e2e` (no Playwright run). |
| [Staging – Next.js app](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-w-app-nextjs.yml) | After build (and optional Vercel deploy): runs smoke E2E for the target (`game-client` or `backoffice-client`). If deploy_target is **vercel**, passes `VERCEL_PROTECTION_BYPASS_SECRET` so tests can hit the preview URL. |
| [Staging – Storybook](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-w-tool-storybook.yml) | After build and preview: runs E2E smoke for `tests/storybook` with `BASE_URL=http://localhost:6006`. |
| [Staging – Web Docs Client](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-w-tool-web-docs-client.yml) | After build and preview: runs E2E smoke for `tests/web-docs-client` with `BASE_URL=http://localhost:4173`. |

## Triggers

- All of the above run on **pull request** targeting `main` when the orchestrator runs and the corresponding app/tool is affected (or, for validate-e2e, every PR that runs the orchestrator).

## References

- [E2E Hub](./index.md)
- [E2E in Production CI](./ci-cd-production.md)
- [Staging pipelines](../../tech/development/staging-pipelines.md)
- [GitHub Actions CI/CD — Secrets](../../providers/github-actions-ci-cd.md#secrets) (Vercel protection bypass secrets)
