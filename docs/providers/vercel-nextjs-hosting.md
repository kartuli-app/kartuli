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

## References

### Related docs

- [GitHub Actions CI/CD](./github-actions-ci-cd.md) — Workflows and full secrets list
- [Game Client Hub](../apps/game-client/index.md)
- [Backoffice Client Hub](../apps/backoffice-client/index.md)
- [E2E README](https://github.com/kartuli-app/kartuli/blob/main/tools/e2e/README.md) — Protection bypass and local E2E
