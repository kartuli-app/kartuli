# E2E Testing Setup

Run a target from the repository root. The command selects the suite, URL and server lifecycle together.

```bash
pnpm --filter @kartuli/e2e exec playwright install chromium
pnpm e2e game-client
pnpm e2e backoffice-client
pnpm e2e storybook
pnpm e2e web-docs-client
```

`pnpm run c:e2e:<target>` calls the same runner. A managed run builds the production-style preview, waits for `kartuli-e2e-target.json` to name that target, runs the suite and stops the server.

## Modes

```bash
pnpm e2e game-client --ui
pnpm e2e game-client --headed
pnpm e2e game-client --debug
pnpm e2e game-client --url https://example.com --production
pnpm e2e game-client --reuse-server
pnpm e2e game-client -- --grep "not-found"
```

`--url` does not start a local server. `--reuse-server` uses the target's local port only when the identity file matches. `--production` runs the production-safe suite. Storybook has none. Web Docs' production-safe suite is its whole smoke directory, which is what the production docs workflow runs.

Playwright arguments after `--` are forwarded. Pass only one of `--ui`, `--headed` and `--debug`.

## Targets

| Target | Local URL | Managed server | Default suite | `--production` |
| --- | --- | --- | --- | --- |
| `game-client` | `http://localhost:3000` | `preview` (build and start) | `tests/game-client` | `tests/game-client/production` |
| `backoffice-client` | `http://localhost:3001` | `preview` (build and start) | `tests/backoffice-client` | `tests/backoffice-client/production` |
| `storybook` | `http://localhost:6006` | build, then preview | `tests/storybook` | none |
| `web-docs-client` | `http://localhost:4173/kartuli` | `preview` (build and serve) | `tests/web-docs-client` | same suite |

Lighthouse stays in the Next.js app workflows. Storybook and Web Docs are smoke-tested only.

## Diagnostics

Local failures open the HTML report and keep a trace, screenshot and video. CI retries once, keeps the failed attempt when the retry passes, and uploads `e2e-artifacts-<target>-<context>-<run>` for three days when those files exist. Clean runs do not upload an artifact. Browser artifacts can contain rendered page content.

The Playwright summary's flaky count and the GitHub reporter warning are the signal that a green run still retried. Inspect that artifact before treating the target as stable.

Orchestration rules are covered by `pnpm --filter @kartuli/e2e test`. See [E2E Runner](../../docs/03-tools/02-e2e-runner.md) and [E2E and production smoke](../../docs/06-quality/01-testing/03-e2e-smoke.md).
