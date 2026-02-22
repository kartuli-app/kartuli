---
section: Tools/E2E
title: E2E in Production CI
type: ci-cd
description: "How E2E is used in production: game-client and backoffice-client workflows run E2E after deploy."
---

# E2E in Production CI

## Overview

E2E production suites run **after** the corresponding app is deployed to production. Only the Next.js apps (game-client, backoffice-client) have production deploys and thus production E2E.

## Where E2E runs in production

| Workflow | E2E step |
|----------|----------|
| [Production – Game Client](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/production-w-app-game-client.yml) | After deploy to Vercel: runs `pnpm --filter @kartuli/e2e exec playwright test tests/game-client/production` with `BASE_URL=https://www.kartuli.app`. Production is not protected; no bypass secret. |
| [Production – Backoffice Client](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/production-w-app-backoffice-client.yml) | After deploy to Vercel: runs `pnpm --filter @kartuli/e2e exec playwright test tests/backoffice-client/production` with `BASE_URL=https://backoffice.kartuli.app`. |

## Triggers

- **Push to `main`** when the respective app’s path filters are satisfied. E2E runs in the same job as deploy, after the deploy step.

## References

- [E2E Hub](./index.md)
- [E2E in Staging CI](./ci-cd-staging.md)
- [Production pipelines](../../tech/development/production-pipelines.md)
