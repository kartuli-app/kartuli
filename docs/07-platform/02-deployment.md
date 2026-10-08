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

Production workflows run on configured `main` push path filters or manual dispatch, with main-branch job guards. App workflows validate the target, call Vercel with `--prod`, run production E2E and Lighthouse, and notify Telegram. Docs builds include the LLM index, upload a Pages artifact, deploy through the `github-pages` environment and run follow-up checks. The app trigger boundary is documented below; the YAML remains the executable source of truth.

## Preview and production sequences

App PR validation has two paths for each affected app. `local` builds and starts Game Client at
`http://localhost:3000` or Backoffice at `http://localhost:3001`; `vercel` deploys a preview using the
app-specific project secret. Both pass the resolved target URL to Lighthouse and Playwright, comment
results on the PR and run the app's full target E2E folder. Only the Vercel path sends a preview
deployment notification.

Production app workflows validate the target, deploy with `--prod`, run only
`tests/<app>/production`, run Lighthouse with error-level assertions and notify on success. Tests and
Lighthouse run against the configured canonical domain, not necessarily the action's returned deployment
URL. DNS/domain propagation and provider aliasing can therefore fail after a successful deploy step.
Local port identities do not change these configured production domains.

GitHub Actions prepares deployments with the exact Node release from `.nvmrc`. The remote Vercel build
and Node function runtime use each project's provider-managed Node `24.x` setting, so Vercel may run a
newer Node 24 minor or patch than CI without crossing the supported major boundary. The root
`package.json` engine range, project settings and manually verified build configuration are documented in
[Vercel](../10-services/02-vercel.md).

Docs production builds and uploads `.vitepress/dist`, deploys it through Pages, then polls the
published site every five seconds. Each request is limited to 10 seconds, and the readiness step
stops after five minutes. The poll is ready when the live root responds and the saved
`assets/kartuli-llm.txt` body contains `kartuli`. The workflow then runs the Web Docs Playwright
suite. Deployment success followed by propagation/E2E failure leaves a deployed
site but a failed workflow and sends the post-deploy failure notification.

## Production app trigger boundary

Both production app workflows watch the same shared build boundary because both apps depend directly
on `@kartuli/ui` and `@kartuli/tailwind-config`. Their app-specific paths remain separate.

| Watched path | Game Client | Backoffice | Why it triggers production |
| --- | --- | --- | --- |
| App workspace | `apps/game-client/**` | `apps/backoffice-client/**` | App source, assets, manifest and app-scoped build configuration |
| Shared workspaces | `packages/ui/**`, `packages/tailwind-config/**` | Same | Imported code and the shared CSS/token contract |
| Root build configuration | `.nvmrc`, `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `tsconfig.json`, `turbo.json` | Same | Runtime/package-manager selection, workspace/catalog resolution, frozen dependency graph, inherited TypeScript configuration and Turbo task graph |
| Production verification | `tools/e2e/**` | Same | Playwright package, shared helpers/configuration and production smoke tests executed after deployment |
| Workflow definition | `.github/workflows/production-w-app-game-client.yml` | `.github/workflows/production-w-app-backoffice-client.yml` | A change to the owning production sequence exercises that sequence on `main` |

The filters intentionally do not include unrelated docs, tools, packages or validation-only root
configuration. Manual dispatch remains available for an assessed release that is outside these paths.

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
