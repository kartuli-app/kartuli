---
description: Configured local, preview and production deployment paths and hosting boundaries.
status: implemented
intent: architecture
---

# Deployment

| Environment / surface | Current deployment path | Repository source |
| --- | --- | --- |
| Local apps | Build/serve target in staging jobs; local developer scripts | Root `c:dev:*`, `c:preview:*`; `staging-w-app-nextjs.yml` |
| App previews | Vercel preview deployments in staging matrix | `staging-w-app-nextjs.yml` |
| Production Game Client | Vercel production deploy; configured URL `https://www.kartuli.app` | `production-w-app-game-client.yml` |
| Production Backoffice | Vercel production deploy; configured URL `https://backoffice.kartuli.app` | `production-w-app-backoffice-client.yml` |
| Production docs | Build artifact deployed to GitHub Pages, base `/kartuli/` | `production-w-tool-web-docs-client.yml` |
| Storybook / docs staging | Local validation/build and E2E workflow paths | `staging-w-tool-storybook.yml`, `staging-w-tool-web-docs-client.yml` |

Production workflows run on configured `main` push path filters or manual dispatch, with main-branch job guards. App workflows validate the target, call Vercel with `--prod`, run production E2E and Lighthouse, and notify Telegram. Docs builds include the LLM index, upload a Pages artifact, deploy through the `github-pages` environment and run follow-up checks. Consult the YAML for exact filters and steps; this page does not imply all shared-file changes currently trigger every consumer.

## Hosting boundaries

Vercel hosts the two configured apps; GitHub Pages hosts static docs. Provider account/project mappings, domain settings, environment protection and any additional provider-triggered deployment paths are **manual verification required**. See [Vercel](../10-services/02-vercel.md) and [GitHub](../10-services/01-github.md).

Preview availability is not a release decision. Rollback, promotion and incident/recovery runbooks remain planned. No deployment or hosting changes are introduced by these docs.
