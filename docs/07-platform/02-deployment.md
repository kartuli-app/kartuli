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

## Preview and production sequences

App PR validation has two paths for each affected app. `local` builds and starts the Next server at
port 3000; `vercel` deploys a preview using the app-specific project secret. Both audit the resolved URL
with Lighthouse, comment results on the PR and run the app's full target E2E folder. Only the Vercel
path sends a preview deployment notification.

Production app workflows validate the target, deploy with `--prod`, run only
`tests/<app>/production`, run Lighthouse with error-level assertions and notify on success. Tests and
Lighthouse run against the configured canonical domain, not necessarily the action's returned deployment
URL. DNS/domain propagation and provider aliasing can therefore fail after a successful deploy step.

Docs production builds and uploads `.vitepress/dist`, deploys it through Pages, polls the live root and
LLM asset for up to five minutes, then runs the Web Docs Playwright suite. Deployment success followed
by propagation/E2E failure leaves a deployed site but a failed workflow and sends the post-deploy
failure notification.

## Implemented trigger limitations

Both production app workflows include `packages/theme/**`, but no such workspace exists. They do not
include the actual `packages/tailwind-config/**` path. A commit that changes only shared tokens may not
trigger app production deployment even though both apps consume that package. This is an implemented
gap requiring a separate workflow change; manual dispatch is the current repository-defined escape
hatch after assessing the intended release.

Path filters are not dependency graphs. When adding a shared package or changing consumption, compare
the Turbo graph, staging target map and every production workflow filter. Do not infer that successful
PR staging guarantees the corresponding main push workflow will start.

## Release verification and recovery

For an app release, verify the deploy step, production smoke test, Lighthouse result and live canonical
URL. For docs, verify the Pages environment URL, navigation and `assets/kartuli-llm.txt`. Record the
workflow/run and deployed revision when investigating drift.

No repository runbook defines Vercel rollback/promotion, Pages rollback, incident ownership or recovery
time. Confirm provider-side capabilities and authorization before an incident; do not improvise a
destructive redeploy based only on workflow names.

## Hosting boundaries

Vercel hosts the two configured apps; GitHub Pages hosts static docs. Provider account/project mappings, domain settings, environment protection and any additional provider-triggered deployment paths are **manual verification required**. See [Vercel](../10-services/02-vercel.md) and [GitHub](../10-services/01-github.md).

Preview availability is not a release decision. Rollback, promotion and incident/recovery runbooks remain planned. No deployment or hosting changes are introduced by these docs.
