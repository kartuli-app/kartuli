---
description: Playwright execution, target selection and production smoke configuration.
status: implemented
intent: reference
---

# E2E Runner

## Execution contract

`pnpm e2e <target>` is the entry point. Target definitions in `tools/e2e/src/targets.ts` select the suite, local URL, production preview command and identity file. `tools/e2e/playwright.config.ts` refuses to run until that selection is present, so a suite path and a URL are not chosen separately.

The managed local mode builds and starts the target's production-style preview, polls `kartuli-e2e-target.json` until it returns the expected target id, runs the suite and stops the process. Web Docs preview already includes its build. Storybook's managed command builds, then serves `storybook-static`. `c:preview:storybook` still only serves an existing build.

`--url <absolute-http-url>` is the external mode. It does not start a server. Use it for Vercel previews, staging, production smoke and a server you started yourself. `--reuse-server` is only for the target's own local URL when that process is already up and the identity file matches.

Current suites navigate against one named origin, `app`. Playwright `baseURL` is that URL. Tests should keep using relative navigation. Another named origin can be added beside `app` when a future scenario needs more than one service; do not encode a second product URL into `app`.

CI uses one worker, one retry and the GitHub reporter together with an HTML report. Local runs use available workers, no retries, the list reporter and the HTML report on failure. Traces are retained for a failed attempt and its retry. Screenshots and video are retained on failure.

Suites are grouped by surface. Game Client has page tests and a smaller production folder. Backoffice currently has only a production smoke test. Storybook has no production suite. Web Docs' production-safe suite is its whole smoke directory. `tests/helpers/expect-a11y.ts`, critical-error checks and locale URL helpers are shared test utilities, not production code.

## Local operation

Install the lockfile-resolved browser, then run a target:

```bash
pnpm --filter @kartuli/e2e exec playwright install chromium
pnpm e2e game-client
pnpm e2e backoffice-client --headed
pnpm e2e storybook --ui
pnpm e2e web-docs-client --debug
pnpm e2e game-client --production
```

Game Client uses port 3000 and Backoffice uses port 3001 for development, start and preview. A managed run fails if something is already listening, including the correct dev server, until you pass `--reuse-server` or stop that process. An identity mismatch names the other target instead of running the suite against it.

Against an existing URL:

```bash
pnpm e2e game-client --url https://www.kartuli.app --production
pnpm e2e web-docs-client --url http://localhost:4173/kartuli
```

A base-path URL keeps a trailing slash when one was supplied. `https://kartuli-app.github.io/kartuli/` stays a directory base, so relative navigation such as `./` remains under `/kartuli/`. Origin-only URLs such as `http://localhost:3000/` and `https://www.kartuli.app/` are stored without a trailing slash. A fragment is removed. A query string is kept.

Browser binaries and Linux system libraries are prerequisites outside pnpm installation. Unknown targets, malformed URLs, combined browser modes and a Storybook `--production` run fail before Playwright starts.

## Authoring and assertions

Use route-visible roles, names, URLs and user-observable state. Add `expectA11y` after the relevant
interactive state is open, not only on the initial page. Keep production tests non-destructive and
small: they verify deployed availability and critical contracts, not the entire local suite.

The Web Docs smoke suite verifies the complete global sidebar, header destinations and direct
`kartuli-llm.txt` response. Text destinations render as `<pre>` in a browser; documentation pages use
`<main>`. The LLM link opens a new tab, so tests wait for the popup and separately request the asset.

## Failure diagnosis and artifacts

The command prints the target, mode, suite and `app` URL before tests start. A refused connection, a timeout while the preview builds, or an identity mismatch is a configuration failure. A failed UI assertion comes after the identity check has passed.

CI retries once. Look for a flaky count in the Playwright summary and a warning annotation on the GitHub check. The failed attempt's trace is kept. Every E2E workflow uploads `e2e-artifacts-<target>-<context>-<run_number>` when those files exist, including when the retry passes and the job is green. Clean runs upload nothing. Retention is three days. The artifact includes `test-results` and the Playwright HTML report.

Traces, screenshots, video and HTML reports may include page content and identifiers. Avoid logging secret URLs or using mutating production fixtures without a reviewed cleanup strategy.

See [E2E and production smoke](../06-quality/01-testing/03-e2e-smoke.md) for layer selection and [Deployment](../07-platform/02-deployment.md) for production execution. Artifacts remain subject to [Data & Privacy](../09-data-and-privacy/index.md).
