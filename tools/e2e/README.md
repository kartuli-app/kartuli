# E2E Testing Setup

## Folder layout and suites

Tests are grouped by app under `tests/`:

- **game-client** – Next.js game app (smoke)
- **backoffice-client** – Next.js backoffice app (smoke)
- **storybook** – Storybook (smoke only; no Lighthouse)
- **web-docs-client** – VitePress docs (smoke only; no Lighthouse)

**BASE_URL** is always set by the caller: use the root scripts (`c:e2e:game-client`, etc.) locally, or set `BASE_URL` in CI when running `pnpm --filter @kartuli/e2e exec playwright test tests/<target>`.

Lighthouse is run only for Next.js apps (game-client, backoffice-client) in their workflows. Storybook and web-docs are smoke-tested only (no Lighthouse).

## Vercel Protection Bypass

The E2E tests use Vercel's Protection Bypass feature to test against preview URLs without authentication issues.

### Setup in GitHub

We use **two** repository secrets (one per Next.js project):

- `VERCEL_PROTECTION_BYPASS_SECRET_GAME_CLIENT` — same value as the game client project’s “Protection Bypass for Automation” in Vercel.
- `VERCEL_PROTECTION_BYPASS_SECRET_BACKOFFICE_CLIENT` — same value as the backoffice client project’s “Protection Bypass for Automation” in Vercel.

In CI (staging Next.js workflow), the workflow passes the appropriate one as **`VERCEL_PROTECTION_BYPASS_SECRET`** to the E2E step, so tests always see a single env key. Production E2E does not use these (production is not protected).

**Full list of repository secrets and where to create them:** [GitHub Actions CI/CD — Secrets](https://github.com/kartuli-app/kartuli/blob/main/docs/providers/github-actions-ci-cd.md#secrets) (or see the docs site: Providers → GitHub Actions CI/CD → Secrets).

### Setup in Vercel (per project)

1. Go to the Vercel project (game client or backoffice client).
2. Navigate to **Security** → **Deployment Protection**.
3. Enable **Protection Bypass for Automation**.
4. Copy the generated secret — this is the value to store in the corresponding GitHub secret above (and for local testing, as `VERCEL_PROTECTION_BYPASS_SECRET`).

### How it works

- Vercel exposes the value as `VERCEL_AUTOMATION_BYPASS_SECRET`; our E2E tests read `VERCEL_PROTECTION_BYPASS_SECRET`.
- In CI, the staging workflow sets `VERCEL_PROTECTION_BYPASS_SECRET` from the correct per-app GitHub secret.
- Tests add the `x-vercel-protection-bypass` header to requests when the secret is set.

### Testing Locally

Start the app in one terminal (e.g. `pnpm c:dev:game-client`), then run the matching e2e suite:

```bash
pnpm c:e2e:game-client
pnpm c:e2e:backoffice-client
pnpm c:e2e:storybook
pnpm c:e2e:web-docs-client
```

Each script sets the appropriate `BASE_URL` (localhost + port). To run all e2e tests: `pnpm test:e2e`.

For Vercel preview URLs, set the bypass secret:

```bash
export VERCEL_PROTECTION_BYPASS_SECRET="your-secret-here"
pnpm test:e2e
```

Or inline: `VERCEL_PROTECTION_BYPASS_SECRET="your-secret-here" pnpm test:e2e`

### Security Notes

- The bypass secret is only used for E2E testing
- It's stored securely in GitHub Secrets
- The secret is only available in CI/CD environments
- Local testing requires manual setup (as shown above)

### Troubleshooting

If tests are still being skipped:
1. Verify both GitHub repository secrets are set: `VERCEL_PROTECTION_BYPASS_SECRET_GAME_CLIENT` and `VERCEL_PROTECTION_BYPASS_SECRET_BACKOFFICE_CLIENT`.
2. Check that each secret value matches the corresponding Vercel project’s “Protection Bypass for Automation” secret.
3. In CI, the workflow passes one of them as `VERCEL_PROTECTION_BYPASS_SECRET`; check the CI logs for that env and for any errors.