---
section: Providers
title: Vercel Next.js Hosting
type: provider
description: How Vercel hosts the Next.js apps (game client, backoffice) and which secrets are used.
---

# Vercel Next.js Hosting

## Overview

Vercel hosts the game client and backoffice client (Next.js apps). We use it for preview deployments (staging, PRs) and production. Deployment is triggered from GitHub Actions via the Vercel API; we use one Vercel project per app.

## Current usage

- **Game client:** Preview (from staging workflow when `deploy_target: vercel`) and production at [www.kartuli.app](https://www.kartuli.app).
- **Backoffice client:** Preview and production at [backoffice.kartuli.app](https://backoffice.kartuli.app).
- **Deployment Protection:** Preview deployments can use Vercel Deployment Protection; we use "Protection Bypass for Automation" so E2E tests can hit preview URLs. Production is not protected.

### Deployment Protection allowlist (game client)

The game client registers a **service worker** at `/serwist/sw.js`. The browser fetches that URL when the page loads; that request does **not** include the E2E bypass header. If the path is protected, the server returns 401 and the SW fails to load, which causes the "no critical console errors" E2E test to fail.

**Required for game client project:** In Vercel → **Game client project** → **Security** → **Deployment Protection** → **Allowlist**, add the path **`/serwist/`** so the service worker script can be fetched without authentication. (Backoffice client does not use a service worker; no allowlist needed there.)

## Secrets

The GitHub Actions workflows use several repository secrets to talk to Vercel. **Full list, names, and which workflows use them:** [GitHub Actions CI/CD — Secrets](./github-actions-ci-cd.md#secrets).

This section describes **where to obtain** each value in the Vercel dashboard:

| Secret / value | Where in Vercel |
|----------------|-----------------|
| **VERCEL_TOKEN** | Settings → Access Tokens. Create a token with scope for the team/org. |
| **VERCEL_ORG_ID** | Team or account settings; or project settings (often in the URL or API). |
| **VERCEL_PROJECT_ID_GAME_CLIENT** | Game client project → Settings. One project ID per app. |
| **VERCEL_PROJECT_ID_BACKOFFICE_CLIENT** | Backoffice client project → Settings. |
| **VERCEL_PROTECTION_BYPASS_SECRET_*** | Per project: Project → Security → Deployment Protection → enable "Protection Bypass for Automation"; copy the generated secret. Same value as Vercel’s `VERCEL_AUTOMATION_BYPASS_SECRET` for that project. |

After adding or rotating a secret in Vercel, update the corresponding [repository secret](https://github.com/kartuli-app/kartuli/settings/secrets/actions) in GitHub.

## Node.js and package manager

- **Node.js version:** In each project (game client, backoffice client), set **Build & Development Settings** → **Node.js Version** to **24** so builds use Node 24 (matches `engines.node` and `.nvmrc`).
- **Package manager and Corepack:** We pin the pnpm version in the root `package.json` via the `packageManager` field (e.g. `pnpm@10.30.2`). So that **Vercel uses that exact version** instead of inferring from the lockfile (which can yield pnpm 9 or 10), Corepack must be enabled on Vercel:

1. In the [Vercel dashboard](https://vercel.com/docs/builds/configure-a-build#corepack), open each project (game client, backoffice client).
2. Go to **Settings** → **Environment Variables**.
3. Add a variable: **Name** `ENABLE_EXPERIMENTAL_COREPACK`, **Value** `1`. Apply to all environments (Production, Preview, Development) so every build uses it.
4. Save. The next deployment will use Corepack and the pnpm version from `package.json`.

Without this, Vercel may use a different pnpm version (see [Package managers](https://vercel.com/docs/package-managers) and the lockfileVersion table).

## References

### Related docs

- [GitHub Actions CI/CD](./github-actions-ci-cd.md) — Workflows and full secrets list
- [Game Client Hub](../apps/game-client/index.md)
- [Backoffice Client Hub](../apps/backoffice-client/index.md)
- [E2E README](https://github.com/kartuli-app/kartuli/blob/main/tools/e2e/README.md) — Protection bypass and local E2E
