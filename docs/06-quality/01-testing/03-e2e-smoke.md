---
description: Target selection, server lifecycle, diagnostic artifacts and deployed verification.
status: implemented
intent: reference
---

# E2E and Production Smoke Tests

## Purpose and target boundaries

E2E verifies an assembled surface through browser navigation. Production smoke tests are a smaller explicitly selected suite against the deployed surface. They are not equivalent to running every E2E test against production.

`tools/e2e/playwright.config.ts` uses Chromium, a 30-second test timeout and a 5-second assertion timeout. `BASE_URL` defaults to localhost:3000. The web-server block is commented out: start the server yourself or use the workflow that starts/deploys it.

## Local workflow

In one terminal run `pnpm run c:preview:game-client`; in another run `pnpm run c:e2e:game-client`. Equivalent target scripts exist for Storybook and Web Docs. Verify the actual server port before running tests; a port fallback can leave the runner pointing to the wrong service.

```bash
BASE_URL=http://localhost:3000 pnpm --filter @kartuli/e2e exec playwright test tests/game-client
BASE_URL=http://localhost:3000 pnpm --filter @kartuli/e2e exec playwright test tests/game-client/production
pnpm --filter @kartuli/e2e run e2e:ui
pnpm --filter @kartuli/e2e run e2e:debug
```

Backoffice is currently exceptional: its dev server and convenience E2E command use port 3001, while
its preview/start command uses port 3000. Against preview, set `BASE_URL=http://localhost:3000` and
select `tests/backoffice-client` explicitly. The last two commands above default to the configured base
URL unless you supply one. Root `e2e` runs the configured suite; use target selection when testing one
surface.

## CI and diagnostics

CI limits execution to one worker, retries once and uses the GitHub reporter. Trace is on first retry, screenshots on failure, and video retained on failure. Local reports use the HTML reporter. Workflow upload steps determine which artifacts persist and for how long.

Investigate the first failure and its target URL before treating retries as stability. A 404 or server-start error is different from a failed UI assertion. Inspect screenshots/traces for actual state, and handle them as potentially sensitive records.

Production app workflows select `tests/<app>/production` against configured production URLs after deployment; docs also have a production workflow. See [Deployment](../../07-platform/02-deployment.md) for ordering. Do not use production endpoints for exploratory mutating tests without an explicit safe test design.
