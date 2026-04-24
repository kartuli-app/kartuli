# E2E Testing Setup

## Folder layout and suites

Tests are grouped by app under `tests/`:

- **game-client** – Next.js game app (smoke)
- **backoffice-client** – Next.js backoffice app (smoke)
- **storybook** – Storybook (smoke only; no Lighthouse)
- **web-docs-client** – VitePress docs (smoke only; no Lighthouse)

**BASE_URL** is always set by the caller: use the root scripts (`c:e2e:game-client`, etc.) locally, or set `BASE_URL` in CI when running `pnpm --filter @kartuli/e2e exec playwright test tests/<target>`.

Start each app (or use the matching `c:dev:*` script), then from the repo root:

```bash
pnpm c:e2e:game-client
pnpm c:e2e:backoffice-client
pnpm c:e2e:storybook
pnpm c:e2e:web-docs-client
```

To run the whole E2E package: `pnpm e2e`. For preview or production URLs, set `BASE_URL` to that origin; deployment protection is expected to be off so no extra headers are required.

## Lighthouse (Next.js apps only)

Lighthouse CI runs in GitHub Actions for **game-client** and **backoffice-client** only (not Storybook or web-docs). It uses the composite action [`.github/actions/ci-quality-lighthouse`](../../.github/actions/ci-quality-lighthouse/action.yml) with repo-root configs:

- **`lighthouse-config-strict.json`** – full category assertions (including SEO). Used for production runs and for **staging with `deploy_target: local`**.
- **`lighthouse-config-preview.json`** – same as strict except **`categories:seo` is off**, so Vercel preview `noindex` does not fail CI. Used for **staging with `deploy_target: vercel`**.

Workflows pass `LIGHTHOUSE_ASSERT_LEVEL` (`warn` on staging, `error` on production) on the Lighthouse step; configs substitute it for performance, accessibility, and best-practices.

The composite appends a **job summary** block (heading + report link); it does not post PR comments for Lighthouse.
