---
description: Target selection, server lifecycle, diagnostic artifacts and deployed verification.
status: implemented
intent: reference
---

# E2E and Production Smoke Tests

## Purpose and target boundaries

E2E verifies an assembled surface through browser navigation. Production smoke tests are a smaller explicitly selected suite against the deployed surface. They are not equivalent to running every E2E test against production.

Targets are `game-client`, `backoffice-client`, `storybook` and `web-docs-client`. Each target owns its suite directory, local URL, production-style server command and identity file `kartuli-e2e-target.json`. The runner exposes the selected address as the named origin `app`, which Playwright uses as `baseURL`. Today's suites are single-origin. A later scenario that needs a second origin should add another named URL rather than overloading `app`.

Chromium is the only browser project. The test timeout is 30 seconds and the assertion timeout is 5 seconds.

## Local workflow

From the repository root, one command builds the production-style preview, waits until the target identity file responds, runs that target's suite and stops the server:

```bash
pnpm e2e game-client
pnpm e2e backoffice-client
pnpm e2e storybook
pnpm e2e web-docs-client
```

`pnpm run c:e2e:<target>` is the same command. Game Client listens on port 3000, Backoffice on 3001, Storybook on 6006 and Web Docs on `http://localhost:4173/kartuli`. The runner does not guess a fallback port.

Install Chromium once with `pnpm --filter @kartuli/e2e exec playwright install chromium`.

Pass `--ui`, `--headed` or `--debug` to the same command. Pass only one of those modes. Extra Playwright arguments go after `--`:

```bash
pnpm e2e game-client --ui
pnpm e2e game-client --headed
pnpm e2e game-client --debug
pnpm e2e game-client -- --grep "not-found"
```

If that target is already serving its local URL and the identity file matches, pass `--reuse-server`. That includes an intentional `c:dev:*` process. Without the flag, a busy port is an error so the suite cannot attach to the wrong service. `--reuse-server` and `--url` together are rejected.

## External URLs

`--url` runs the same suite against an already deployed or already started server and does not start a local process. The identity file must identify the selected target.

```bash
pnpm e2e game-client --url https://www.kartuli.app --production
pnpm e2e web-docs-client --url http://localhost:4173/kartuli
```

`--production` selects the production-safe directory. Game Client and Backoffice use `tests/<target>/production`. Web Docs' production-safe suite is the whole `tests/web-docs-client` directory. Storybook has no production suite, so `--production` fails. Staging workflows omit `--production` and pass the preview or local URL. Production workflows pass both `--url` and `--production`.

## CI, retries and diagnostics

CI uses one worker and retries a failed test once. The retry absorbs a transient browser or network failure. It does not mean the first attempt passed. Local runs do not retry.

Traces use `retain-on-failure-and-retries`, so the failed attempt is kept when a later attempt passes. Screenshots and video are kept on failure. CI reporters are the GitHub reporter plus an HTML report. Local runs use the list reporter and open the HTML report on failure.

A green CI job can still be flaky. The Playwright summary prints a flaky count, and the GitHub reporter adds a warning annotation. Download the `e2e-artifacts-<target>-<context>-<run>` artifact from that job: it is uploaded whenever `test-results` retained files from a failed attempt, including a retry that later passed. Clean runs do not upload an artifact. Retention is three days. Traces, screenshots, video and the HTML report can contain rendered page content and identifiers. Treat them as sensitive.

The HTML report is generated under `tools/e2e/playwright-report`. Open a local report with `pnpm --filter @kartuli/e2e exec playwright show-report`.

`page.goto()` resolves at the browser load event, but modern application UI can continue rendering afterward. Tests should use web-first assertions for the relevant learner-visible state; the configured 5-second assertion timeout remains the UI readiness contract. The localized Game Client not-found checks therefore assert that the expected heading becomes visible instead of waiting under the broader per-test timeout. They do not use a sleep, a network-idle heuristic, or a broader retry/expect timeout.

The not-found suite also opens English and Russian generic/removed URLs with JavaScript and service
workers disabled. Those checks assert HTTP 404, document language, localized heading/message and the
requested pathname. This is initial-document coverage: serialized React payload text or later client
restoration cannot make it pass. Keep this separate from the normal browser assertions and axe check,
which verify the assembled interactive surface.

Production app workflows run `pnpm e2e <app> --url <production-url> --production` after deployment. The docs production workflow runs `pnpm e2e web-docs-client --url <pages-url> --production`. See [Deployment](../../07-platform/02-deployment.md) for ordering. Do not use production endpoints for exploratory mutating tests without an explicit safe test design.
