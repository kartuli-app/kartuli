# E2E Testing Setup

## Folder layout and suites

Tests are grouped by app under `tests/`:

- **game-client** – Next.js game app (smoke)
- **backoffice-client** – Next.js backoffice app (smoke)
- **storybook** – Storybook (smoke only; no Lighthouse)
- **web-docs-client** – VitePress docs (smoke only; no Lighthouse)

**BASE_URL** is always set by the caller: use the root scripts (`c:e2e:game-client`, etc.) locally, or set `BASE_URL` in CI when running `pnpm --filter @kartuli/e2e exec playwright test tests/<target>`.

Lighthouse is run only for Next.js apps (game-client, backoffice-client) in their workflows. Storybook and web-docs are smoke-tested only (no Lighthouse).

### Testing Locally

Start the app in one terminal (e.g. `pnpm c:dev:game-client`), then run the matching e2e suite:

```bash
pnpm c:e2e:game-client
pnpm c:e2e:backoffice-client
pnpm c:e2e:storybook
pnpm c:e2e:web-docs-client
```

Each script sets the appropriate `BASE_URL` (localhost + port). To run all e2e tests: `pnpm e2e`.

### Troubleshooting

If tests are still being skipped:
1. Verify `BASE_URL` points to a reachable app.
2. Check the staging workflow logs for the deployed preview URL or local server URL.
3. If only one suite is failing, rerun the scoped command (`pnpm c:e2e:game-client`, etc.) against the same target to isolate the issue.
