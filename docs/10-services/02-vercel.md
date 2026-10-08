---
description: Vercel project evidence, Git integration versus Actions deployments, credentials and release diagnosis.
status: implemented
intent: reference
---

# Vercel

Vercel hosts the two Next.js apps. GitHub shows both provider Git-integration statuses and deployments
requested explicitly by Actions. These are distinct execution paths.
[Deployment](../07-platform/02-deployment.md) owns the release sequence and
[Remote Build Cache](../07-platform/03-remote-build-cache.md) owns Turbo cache behavior.

## Observed projects and environments

Last verified project mapping: **2026-10-06**. Recheck the project root and domain in the
[Vercel dashboard](https://vercel.com/dashboard) before changing deployment configuration.

| Workspace | Provider project | Production URL configured in Actions |
| --- | --- | --- |
| `apps/game-client` | `kartuli-game-client` | `https://www.kartuli.app` |
| `apps/backoffice-client` | `kartuli-backoffice-client` | `https://backoffice.kartuli.app` |

A successful Git-integration status can mean “Canceled by Ignored Build Step”. Inspect the
status description and Actions deployment output separately. Verify effective project settings and
secret-to-project mapping with the project owner.

## Deployment paths

| Path | Trigger and execution | Validation / evidence |
| --- | --- | --- |
| Vercel Git integration | Provider responds to repository changes | Provider check and bot comment; builds can be ignored |
| Actions local staging | Affected app, `deploy_target: local` | Builds/starts Game Client on port 3000 or Backoffice on port 3001, then runs Lighthouse and Playwright |
| Actions Vercel staging | Affected app, `deploy_target: vercel` | Explicit preview deploy, Lighthouse and Playwright using `preview-url` |
| Actions production | Matching main push paths or main manual dispatch | Explicit `--prod` deployment, smoke tests and Lighthouse against configured production domain |

`staging-orchestrator.yml` creates local/vercel matrix entries for affected apps.
`staging-w-app-nextjs.yml` selects the app's project secret; both production workflows name their
project explicitly. The action revision is pinned, but `vercel-version: latest` means its CLI version
is not pinned in these workflows. There is no `working-directory` input selecting an app here;
provider project configuration is therefore part of the build contract.

Actions sets `github-deployment: false`, so absence of a GitHub Deployment object does not establish
that this explicit action never deployed. Follow its output and provider URL.
The local version step supplies `NEXT_PUBLIC_APP_VERSION` to the local build only; the workflow does
not pass that environment variable to the Vercel action as a build environment value.

## Configuration names

| Name / storage | Purpose |
| --- | --- |
| `VERCEL_TOKEN` secret | Authenticate explicit Actions deployments |
| `VERCEL_ORG_ID` secret | Deployment organization and action scope |
| `VERCEL_PROJECT_ID_GAME_CLIENT` secret | Select Game Client |
| `VERCEL_PROJECT_ID_BACKOFFICE_CLIENT` secret | Select Backoffice |
| `TURBO_TOKEN` secret | Separate remote-cache authorization |
| `TURBO_TEAM` variable | Separate remote-cache team selection |

Provider environment variables, build/install commands, framework settings, domain assignments,
preview access controls and credential scopes remain settings to inspect in the dashboard projects.
A working deployment token does not prove Turbo cache access, and a public project link does not
verify the configured secret value.

## Diagnosing deployments

1. Identify app, SHA, event and deployment path; distinguish native Git status from the Actions job.
2. For a skipped app job, inspect affected mapping. For an ignored provider deployment, inspect the
   provider's Ignored Build Step.
3. For deploy failure, inspect the first provider/build error and the selected secret names and project.
4. For an empty `preview-url`, inspect deployment output before debugging Lighthouse or E2E.
5. For a successful deploy followed by failed tests, use that deployment's URL/artifacts and inspect
   preview protection, redirects, domain propagation and application behavior.
6. Read the final workflow result; the preview Telegram message is sent before E2E.

Both app production path filters include their real shared workspace dependencies, including
`packages/ui/**` and `packages/tailwind-config/**`, plus the root build/dependency inputs documented in
[Deployment](../07-platform/02-deployment.md). The filters remain explicit and separate from staging's
Turbo affected-workspace selection. Native Vercel triggers remain separately configured.

Read-only starting points are `gh pr checks PR_NUMBER`, the Vercel dashboard, and
`gh run view RUN_ID`. E2E failure artifacts retain three days and production Lighthouse artifacts
seven. Staging Lighthouse uses warning assertions; production uses error assertions.

## Recovery and ownership gaps

The repository has no automated rollback/promotion workflow or documented provider recovery command.
Verify the last healthy deployment, domain mapping and authorized recovery procedure with the project
owner before using them in an incident. Provider membership, rotation, retention and preview access
policy require direct administration evidence. Docs hosting uses GitHub Pages, not these Vercel projects.
