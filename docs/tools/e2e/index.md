---
section: Tools/E2E
title: E2E Testing Hub
description: "Hub for E2E testing: Playwright suites, root scripts, and how CI uses E2E in staging and production."
type: hub
---

# E2E Testing Hub

## Overview

The E2E package (`@kartuli/e2e`) runs Playwright tests against the game client, backoffice client, Storybook, and web-docs-client. Suites are grouped under `tests/` by app. **BASE_URL** is always set by the caller (root scripts locally, CI sets it per job).

**In-repo README:** [tools/e2e/README.md](https://github.com/kartuli-app/kartuli/blob/main/tools/e2e/README.md) — setup, Vercel protection bypass, and local testing.

## Root scripts that apply

| Script | Description |
|--------|-------------|
| `pnpm c:e2e:game-client` | E2E vs game client (BASE_URL=http://localhost:3000) |
| `pnpm c:e2e:backoffice-client` | E2E vs backoffice (BASE_URL=http://localhost:3001) |
| `pnpm c:e2e:storybook` | E2E vs Storybook (BASE_URL=http://localhost:6006) |
| `pnpm c:e2e:web-docs-client` | E2E vs web-docs (BASE_URL=http://localhost:4173) |
| `pnpm test:e2e` | Run all E2E tests (caller must set BASE_URL or use root scripts per target) |

See [Root scripts](../../tech/development/root-scripts.md) for the full list.

## CI/CD usage

- [CI/CD Staging](./ci-cd-staging.md) — How E2E is invoked in staging (orchestrator validate-e2e; Next.js, Storybook, Web Docs workflows run E2E).
- [CI/CD Production](./ci-cd-production.md) — How E2E is invoked in production (game-client and backoffice-client production workflows run E2E after deploy).

## References

### Related docs

- [Staging pipelines](../../tech/development/staging-pipelines.md)
- [Production pipelines](../../tech/development/production-pipelines.md)
- [GitHub Actions CI/CD — Secrets](../../providers/github-actions-ci-cd.md#secrets) — Full list of repository secrets (including Vercel protection bypass).
- [Documentation Home](../../index.md)
