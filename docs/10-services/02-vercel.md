---
description: App deployment credentials, project mapping and separate remote-cache configuration.
status: implemented
intent: reference
---

# Vercel

[Deployment](../07-platform/02-deployment.md) owns preview/production behavior. `staging-w-app-nextjs.yml` selects the appropriate app project; production app workflows pass `--prod` to `amondnet/vercel-action`.

| Configuration name | Location / purpose |
| --- | --- |
| `VERCEL_TOKEN` | GitHub secret authenticating deployment |
| `VERCEL_ORG_ID` | GitHub secret selecting organization/scope |
| `VERCEL_PROJECT_ID_GAME_CLIENT` | GitHub secret selecting Game Client project |
| `VERCEL_PROJECT_ID_BACKOFFICE_CLIENT` | GitHub secret selecting Backoffice project |
| `TURBO_TOKEN` | GitHub secret for remote build cache access |
| `TURBO_TEAM` | GitHub variable selecting remote-cache team |

[Remote Build Cache](../07-platform/03-remote-build-cache.md) is a separate capability from hosting. Do not assume cache and deployment credentials have the same scope/account.

## Manual verification required

Record nonsecret team/project mappings, project root/build/install settings, environment variables by environment, domain assignments, preview access policy, Git integration deployment behavior and credential scopes/rotation. Verify remote-cache account/team mapping, permissions and retention separately. Workflow variable names do not reveal or validate their configured values.

## Deployment flow and failure investigation

Staging uses a matrix containing `local` and `vercel` targets. The Vercel path selects the project secret for the app, deploys with the action and uses the resulting preview URL for subsequent work. Production app workflows provide `--prod` and use configured production URLs for smoke/Lighthouse checks. Native provider Git integration may also exist; its effective behavior must be verified separately from these Actions jobs.

For a failed deployment, identify the app, environment and workflow run first. Check whether failure occurred during validation, provider deployment or post-deploy testing. Compare the selected secret **name**, project root and resulting deployment URL; do not print secret values to debug mapping. A successful deploy followed by failing smoke checks is still a failed release validation.

Before changing project/build settings, record the verified current value, intended capability impact and how preview/production differ. Revalidate both applications if changing shared settings. Remote-cache credentials should be checked separately; a deployment token working does not prove cache authorization works.

A provider rollback/promotion procedure is not established in repository source. Verify and document it before relying on it during an incident.
