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
