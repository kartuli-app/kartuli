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

- Staging and production pipelines for: Web Docs Client (staging validation, production deploy).
- App deploy (PR and main): game client and apps build, deploy to Vercel (preview and production), then E2E smoke tests and Lighthouse CI. Uses Turbo, Vercel action, and Vercel protection bypass.
- **Orchestrator (staging):** runs on every PR to `main` only (staging = pre-merge). Detects which apps/packages/tools would run `build` using `turbo run build --dry=json --affected` (compares to default branch). No invocations yet; detection only. Workflow: [`.github/workflows/orchestrator-staging.yml`](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/orchestrator-staging.yml).

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

- **Used in:** App Deploy (PR, Main).
- **What it's for:** Turbo remote cache (Vercel). Set as job env so `pnpm turbo run typecheck/lint/build/test` can use Vercel Remote Cache.
- **Where to get it:** Vercel → Turbo / Remote Caching.

#### `VERCEL_TOKEN`

- **Used in:** App Deploy (PR, Main).
- **What it's for:** Vercel API token for `amondnet/vercel-action`. Deploys preview (PR) and production (main).
- **Where to get it:** Vercel → Settings → Access Tokens.

#### `VERCEL_ORG_ID`

- **Used in:** App Deploy (PR, Main).
- **What it's for:** Vercel team/org ID. Passed to vercel-action as `vercel-org-id` and `scope`.
- **Where to get it:** Vercel project/team settings.

#### `VERCEL_PROJECT_ID`

- **Used in:** App Deploy (PR, Main).
- **What it's for:** Vercel project ID. Passed to vercel-action as `vercel-project-id`.
- **Where to get it:** Vercel project settings.

#### `VERCEL_PROTECTION_BYPASS_SECRET_GAME_CLIENT` and `VERCEL_PROTECTION_BYPASS_SECRET_BACKOFFICE_CLIENT`

- **Used in:** Staging (Next.js app workflow) when running E2E against Vercel preview. The workflow passes the appropriate one as `VERCEL_PROTECTION_BYPASS_SECRET` so smoke tests use a single env key. Production E2E does not use these (production is not protected).
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
- [Web Docs Client Hub](../tools/web-docs-client/index.md)
- [Web Docs Client CI/CD Production](../tools/web-docs-client/ci-cd-production.md)
- [Web Docs Client CI/CD Staging](../tools/web-docs-client/ci-cd-staging.md)
- [GitHub Pricing](https://github.com/pricing)
- [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)

### Providers

- [GitHub Pages Hosting](./github-pages-hosting.md)
