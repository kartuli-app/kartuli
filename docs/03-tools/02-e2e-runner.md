---
description: Playwright execution, target selection and production smoke configuration.
status: implemented
intent: reference
---

# E2E Runner

## Execution contract

`tools/e2e/playwright.config.ts` runs Chromium tests under `tests/`. `BASE_URL` selects the target and defaults to `http://localhost:3000`; the config does not start a web server. CI uses one worker, one retry and the GitHub reporter, with traces on first retry and failure screenshots/video. Local runs use available workers and the HTML reporter.

Suites are grouped by surface. Game Client has page tests and a smaller production folder; Backoffice
currently has only a production smoke test; Storybook and Web Docs have tool-specific smoke suites.
`tests/helpers/expect-a11y.ts`, critical-error checks and locale URL helpers are shared test utilities,
not production code.

## Local operation

Install the exact lockfile-resolved browser and start the target before Playwright:

```bash
pnpm --filter @kartuli/e2e exec playwright install chromium
pnpm run c:preview:game-client
# in another terminal
pnpm run c:e2e:game-client
```

Equivalent root commands exist for Storybook and Web Docs. The Backoffice commands currently have a
known mismatch: development and `c:e2e:backoffice-client` use port 3001, while `start`/preview use port
3000. Against Backoffice preview, run the explicit form instead:

```bash
BASE_URL=http://localhost:3000 pnpm --filter @kartuli/e2e exec playwright test \
  tests/backoffice-client
```

Use `pnpm --filter @kartuli/e2e run e2e:ui` or `e2e:debug` for investigation and supply `BASE_URL`
when the target is not localhost:3000. Browser binaries and Linux system libraries are prerequisites
outside pnpm installation.

## Authoring and assertions

Use route-visible roles, names, URLs and user-observable state. Add `expectA11y` after the relevant
interactive state is open, not only on the initial page. Keep production tests non-destructive and
small: they verify deployed availability and critical contracts, not the entire local suite.

The Web Docs smoke suite verifies the complete global sidebar, header destinations and direct
`kartuli-llm.txt` response. Text destinations render as `<pre>` in a browser; documentation pages use
`<main>`. The LLM link opens a new tab, so tests wait for the popup and separately request the asset.

## Failure diagnosis and artifacts

Confirm the target URL and server readiness before interpreting an assertion. A connection refusal,
wrong app at the configured port or missing browser executable is different from a product regression.
On CI, inspect the first attempt plus retry trace; screenshots and videos are retained only on failure
according to the workflow upload step (currently three days).

Traces and screenshots may include page content and identifiers. Avoid logging secret URLs or using
mutating production fixtures without a reviewed cleanup strategy.

See [E2E and production smoke](../06-quality/01-testing/03-e2e-smoke.md) for layer selection and [Deployment](../07-platform/02-deployment.md) for production execution. Artifacts remain subject to [Data & Privacy](../09-data-and-privacy/index.md).
