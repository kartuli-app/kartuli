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

Game Client uses local port 3000 and Backoffice uses local port 3001 for development, start and preview.
The root `c:e2e:*` commands select the matching suite and set its local target through `BASE_URL`.
Direct Playwright commands, including the last two commands above, default to the configured localhost
3000 unless you supply `BASE_URL`. Root `e2e` runs the configured suite; use target selection when
testing one surface.

## CI and diagnostics

CI limits execution to one worker, retries once and uses the GitHub reporter. Traces are retained for a failed attempt and its retry, screenshots are taken on failure, and video is retained on failure. Local reports use the HTML reporter. The Next.js staging workflow uploads retained E2E output even when a retry lets Playwright exit successfully; clean runs do not create an artifact, and retained output expires after three days.

Investigate the first failure and its target URL before treating retries as stability. A 404 or server-start error is different from a failed UI assertion. Inspect screenshots/traces for actual state, and handle them as potentially sensitive records.

`page.goto()` resolves at the browser load event, but modern application UI can continue rendering afterward. Tests should use the relevant learner-visible element as their readiness boundary. The localized Game Client not-found checks therefore wait for the expected heading under the existing per-test budget before asserting it; they do not use a sleep, a network-idle heuristic, or a broader retry/expect timeout.

Production app workflows select `tests/<app>/production` against configured production URLs after deployment; docs also have a production workflow. See [Deployment](../../07-platform/02-deployment.md) for ordering. Do not use production endpoints for exploratory mutating tests without an explicit safe test design.
