---
section: Providers
title: GitHub Actions CI/CD
type: provider
description: How GitHub Actions is used for CI/CD workflows and its usage boundaries.
---

# GitHub Actions CI/CD

## Overview

GitHub Actions runs our CI/CD workflows. This doc covers capability, usage, limits, and operations.

## Capability

- Run workflows (build, test, deploy) on push, pull request, or manual dispatch.
- Hosted runners, workflow YAML, artifacts, and secrets.
- Event-based and manual triggering.

## Current usage

- **Staging:** [Staging Orchestrator](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-orchestrator.yml) runs on every PR to `main`. It detects affected packages via `turbo run build --dry=json --affected` (base: `origin/main`), then calls the appropriate reusable workflows: Next.js apps (staging-w-app-nextjs), Web Docs Client (staging-w-tool-web-docs-client), Storybook (staging-w-tool-storybook). A validate-e2e job runs lint and typecheck for the E2E package.
- **Production:** Per-app/tool workflows run on push to `main` when path filters match: game client and backoffice client deploy to Vercel then run E2E and Lighthouse; web-docs-client deploys to GitHub Pages.
- Uses Turbo (remote cache), Vercel action (Next.js deploy), and Vercel protection bypass for E2E against preview URLs.

### Testing the staging orchestrator

**Locally (same as CI):** From your branch, run `git fetch origin main` then:

`pnpm exec turbo run build --dry=json --affected | jq -r '.tasks[]? | .package' | sort -u`

(Make sure `origin/main` is fetched first.) That lists packages that would run `build`; the workflow uses the same `--affected` flag.

**In CI:** Open a PR that touches at least one app, package, or tool (e.g. change a file under `apps/game-client/`, `packages/ui/`, or `docs/`).
In the PR go to **Checks** → **Orchestrator (Staging)** → **detect-affected** job; the summary shows the same list (or “No packages” if the change doesn’t affect any build).

## Pipeline strategy (cost optimization)

GitHub Actions is **free** for our public repo, while other providers (e.g. Vercel) have limits and cost for build minutes.

We run as much as possible in GitHub Actions and as little as possible elsewhere.

For app deploy: typecheck, lint, tests, and (after deploy) E2E and Lighthouse run in Actions. Only the **Next.js build and deploy** run on Vercel. That keeps Vercel usage low and uses Actions for everything else.

## Limits and cost

- For **public repositories**, GitHub Actions usage is **free** for standard GitHub-hosted runners. See [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions) and [GitHub Pricing](https://github.com/pricing).

## Secrets

**Where to find them:** [Repository secrets](https://github.com/kartuli-app/kartuli/settings/secrets/actions) — Repository → Settings → Secrets and variables → Actions. All are repo secrets.

**Fork pull requests:** GitHub does not pass repository secrets to workflows triggered by a `pull_request` from a fork. So when someone opens a PR from a fork, jobs that need these secrets (e.g. deploy, Turbo cache) will not receive them and may fail. This is expected and is a security measure. See [GitHub Repo Management](./github-repo-management.md) for the collaboration model and optional settings.

#### `TURBO_TOKEN`

- **Used in:** Staging orchestrator, all staging workflows (staging-w-app-nextjs, staging-w-tool-web-docs-client, staging-w-tool-storybook), validate-e2e job, and all production workflows (production-w-app-game-client, production-w-app-backoffice-client, production-w-tool-web-docs-client).
- **What it's for:** Turbo remote cache (Vercel). Set as job env so `pnpm turbo run` (build, lint, typecheck, etc.) can use Vercel Remote Cache.
- **Where to get it:** Vercel → Turbo / Remote Caching.

#### `VERCEL_TOKEN`

- **Used in:** Staging orchestrator (passed to staging-w-app-nextjs), staging-w-app-nextjs, production-w-app-game-client, production-w-app-backoffice-client.
- **What it's for:** Vercel API token for `amondnet/vercel-action`. Deploys preview (staging) and production (main).
- **Where to get it:** Vercel → Settings → Access Tokens.

#### `VERCEL_ORG_ID`

- **Used in:** Same workflows as `VERCEL_TOKEN` (staging orchestrator → nextjs, staging-w-app-nextjs, production-w-app-game-client, production-w-app-backoffice-client).
- **What it's for:** Vercel team/org ID. Passed to vercel-action as `vercel-org-id` and `scope`.
- **Where to get it:** Vercel project/team settings.

#### `VERCEL_PROJECT_ID_GAME_CLIENT`

- **Used in:** Staging orchestrator (passed to staging-w-app-nextjs when target is game-client), staging-w-app-nextjs, production-w-app-game-client.
- **What it's for:** Vercel project ID for the game client. Passed to vercel-action as `vercel-project-id`.
- **Where to get it:** Vercel → Project (game client) → Settings.

#### `VERCEL_PROJECT_ID_BACKOFFICE_CLIENT`

- **Used in:** Staging orchestrator (passed to staging-w-app-nextjs when target is backoffice-client), staging-w-app-nextjs, production-w-app-backoffice-client.
- **What it's for:** Vercel project ID for the backoffice client. Passed to vercel-action as `vercel-project-id`.
- **Where to get it:** Vercel → Project (backoffice client) → Settings.

#### `VERCEL_PROTECTION_BYPASS_SECRET_GAME_CLIENT` and `VERCEL_PROTECTION_BYPASS_SECRET_BACKOFFICE_CLIENT`

- **Used in:** Staging orchestrator (passed to staging-w-app-nextjs), staging-w-app-nextjs when running E2E against Vercel preview (`deploy_target: vercel`). The workflow passes the appropriate one as `VERCEL_PROTECTION_BYPASS_SECRET` so smoke tests use a single env key. Production E2E does not use these (production is not protected).
- **What it's for:** Bypass for Vercel Deployment Protection per project. Same value as each project’s “Protection Bypass for Automation” (Vercel: `VERCEL_AUTOMATION_BYPASS_SECRET`).
- **Where to get it:** Vercel → Project → Security → Deployment Protection, per project. See [E2E README](https://github.com/kartuli-app/kartuli/blob/main/tools/e2e/README.md) for setup.

**Rotation:** Update the secret in Settings when a credential rotates; re-run the workflow or push to trigger runs that use it.

## Operations

- Keep workflows observable and easy to debug (clear step names, logs).
- Use clear workflow naming and scoped path triggers.
- Review pipeline efficiency as workflow count grows.

## References

### Related Docs

- [GitHub Repo Management](./github-repo-management.md) — Collaboration model, fork vs direct collaborator, and protection of workflows and secrets.
- [Staging pipelines](../tech/development/staging-pipelines.md) — [Production pipelines](../tech/development/production-pipelines.md)
- [Game Client Hub](../apps/game-client/index.md) — [Backoffice Client Hub](../apps/backoffice-client/index.md)
- [Web Docs Client Hub](../tools/web-docs-client/index.md) — [Storybook Hub](../tools/storybook/index.md) — [E2E Hub](../tools/e2e/index.md)
- [GitHub Pricing](https://github.com/pricing)
- [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)

### Providers

- [Vercel Next.js Hosting](./vercel-nextjs-hosting.md)
- [GitHub Pages Hosting](./github-pages-hosting.md)
