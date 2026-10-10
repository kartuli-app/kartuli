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

## Verified project contract

The following durable project settings were manually verified in the Vercel dashboard on
**2026-10-08**. No provider changes were required.

| Workspace | Provider project | Production URL configured in Actions |
| --- | --- | --- |
| `apps/game-client` | `kartuli-game-client` | `https://www.kartuli.app` |
| `apps/backoffice-client` | `kartuli-backoffice-client` | `https://backoffice.kartuli.app` |

| Setting | Game Client | Backoffice Client |
| --- | --- | --- |
| Framework | Next.js | Next.js |
| Root directory | `apps/game-client` | `apps/backoffice-client` |
| Build command | `pnpm turbo run build --filter=@kartuli/game-client` | `pnpm turbo run build --filter=@kartuli/backoffice-client` |
| Install command | `pnpm install --frozen-lockfile --prod=false` | `pnpm install --frozen-lockfile --prod=false` |
| Node.js Version | `24.x` | `24.x` |
| Ignored Build Step | `exit 0` | `exit 0` |

The ignored-build setting is intentional. Native Vercel Git builds stop successfully without building;
GitHub Actions performs the explicit preview and production deployments described below. A successful
Git-integration status can therefore mean “Canceled by Ignored Build Step”. Inspect the status description
and Actions deployment output separately. Recheck these settings and the secret-to-project mapping with
the project owner before changing deployment configuration.

## Node runtime precedence

Vercel exposes Node runtimes by supported major and automatically rolls minor and patch updates within
that major. Its [Node version documentation](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
also states that a valid `package.json#engines.node` range overrides the Project Settings selection. In
Kartuli, both inputs select only Node 24: the provider projects use `24.x`, while the root repository
manifest uses `>=24 <25`. Neither app workspace manifest declares a conflicting engine.

`.nvmrc` is not the Vercel patch pin. It selects the exact Node 24.13.1 release used for local work and
GitHub Actions; Vercel may deploy a different current Node 24 minor or patch. This is expected and remains
within Kartuli's supported-major contract. Re-verify provider settings in the dashboard and inspect a
deployment's build/runtime version when investigating drift.

## Deployment paths

| Path | Trigger and execution | Validation / evidence |
| --- | --- | --- |
| Vercel Git integration | Provider responds to repository changes | Provider check and bot comment; builds can be ignored |
| Actions local staging | Affected app, `deploy_target: local` | Builds/starts Game Client on port 3000 or Backoffice on port 3001, then runs Lighthouse and Playwright |
| Actions Vercel staging | Affected app, `deploy_target: vercel` | Explicit preview deploy, Lighthouse and Playwright using `preview-url` |
| Actions production | Matching main push paths or main manual dispatch | Explicit `--prod` deployment, smoke tests and Lighthouse against configured production domain |

`staging-orchestrator.yml` creates local/vercel matrix entries for affected apps.
`staging-w-app-nextjs.yml` selects the app's project secret; both production workflows name their
project explicitly. All three paths use the same exact `vercel-version` value. The full
`amondnet/vercel-action` commit SHA pins the Action implementation, while `vercel-version` separately
pins the npm `vercel` CLI package that the Action invokes. Neither dependency can change between
identical runs without a repository diff. There is no `working-directory` input selecting an app
here; provider project configuration is therefore part of the build contract.

The narrowly scoped `custom.regex` manager in `renovate.json` owns only these three
`vercel-version` fields. It resolves `vercel` through the npm datasource, applies the routine npm
release-age policy and groups eligible updates into `all dependencies`. Generic GitHub Action
`uses-with` extraction remains disabled, so the CLI has one active Renovate owner. Review a proposed
CLI upgrade separately from the pinned Action revision and validate both app previews before merge.

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

Provider environment variables, domain assignments, preview access controls and credential scopes remain
settings to inspect in the dashboard projects. The durable framework, root, build/install, Node and
ignored-build settings above are verified only as of the stated date. A working deployment token does not
prove Turbo cache access, and a public project link does not verify the configured secret value.

## Diagnosing deployments

1. Identify app, SHA, event and deployment path; distinguish native Git status from the Actions job.
2. For a skipped app job, inspect affected mapping. For an ignored provider deployment, inspect the
   provider's Ignored Build Step.
3. For deploy failure, inspect the first provider/build error and the selected secret names and project.
   The `Deploy to Vercel` log shows the requested `npx vercel@<version>` command and the installed
   `Vercel CLI <version>`; the later remote `Running \"vercel build\"` line is provider-managed build
   tooling and can report a different version.
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
