---
description: Renovate catalog discovery, update rules, live dashboard evidence and dependency-update troubleshooting.
status: implemented
intent: reference
---

# Renovate

Renovate detects dependency updates and opens reviewable branches/PRs.
`renovate.json` owns repository policy; [Dependency Management](../07-platform/04-dependency-management.md)
owns how contributors change and validate dependencies.

## Checking the integration

Use [Dependency Dashboard #28](https://github.com/kartuli-app/kartuli/issues/28) and the
[Mend portal](https://developer.mend.io/github/kartuli-app/kartuli) to inspect detected dependencies,
current update branches and blocked updates. Existing npm and Biome discovery was last verified on
**2026-10-09**. GitHub Actions extraction is validated locally before merge; the hosted provider must
be verified after this configuration reaches `main`.

Confirm npm-manager discovery of workspace manifests and the catalog in `pnpm-workspace.yaml`,
JSONata discovery of both Biome schemas, and `github-actions` discovery of external Actions plus the
explicit `ubuntu-26.04` runner references. Dashboard versions describe its branch snapshot; compare
them with the checkout and lockfile.

## Committed policy

| Configuration | Intended behavior in this repository |
| --- | --- |
| Presets | `config:recommended`, `:dependencyDashboard`, `helpers:pinGitHubActionDigests`, `security:minimumReleaseAgeNpm` and `:configMigration` |
| Managers | `npm`, `custom.jsonata` and `github-actions` |
| Normal schedule | Saturday 22:00–23:59 and Sunday 00:00–05:59 in `Asia/Tbilisi`, expressed as two Renovate cron windows |
| Normal grouping | npm/catalog and Biome major/minor/patch updates plus external Action/workflow major/minor/patch/pin/digest updates share `all dependencies`; separation flags are disabled |
| GitHub runners | Explicit GitHub-hosted runner labels are discovered as `github-runner` and use a separate `GitHub runner updates` PR without Dashboard approval |
| Action inputs and containers | `uses-with`, `docker`, `container` and `service` are disabled; runtime/tool inputs and container policy remain deliberate decisions |
| Merge | `automerge: false`; GitHub repository auto-merge is also disabled in the observed metadata |
| Labels | `type:chore`, `scope:global`; vulnerability alerts also request `security` |
| Commit policy | Semantic chore commits with `update dependencies` action and dependency topic |
| Vulnerability alerts | Immediate dedicated PR creation, `security updates` group, lowest fixing version strategy, routine-schedule bypass and no minimum release age |
| npm release age | Routine npm releases must be at least three days old; package-manager-controlled and unsupported update types retain the preset's documented exemptions |
| Runtime/package manager | `.nvmrc` ignored; engine and pnpm updates disabled |
| Vitest family | `vitest` and `@vitest/**` constrained below 5 with `rangeStrategy: pin`; keep runner/browser/Playwright/coverage on one exact release |
| Node declarations | `@types/node` constrained below 25 |

`helpers:pinGitHubActionDigests` enables digest pinning for Action and reusable-workflow dependency
types. A version-tagged Action can therefore be converted to an immutable SHA. For an existing SHA,
Renovate follows the trailing version comment and updates the SHA/comment pair; a bare SHA without a
version comment is disabled because Renovate cannot determine its release line. The repository does
not use `actions.lock`.

`security:minimumReleaseAgeNpm` gives routine npm releases a three-day cooling-off period. Renovate's
vulnerability-alert configuration explicitly sets `minimumReleaseAge: null`, and hosted vulnerability
alerts skip the ordinary schedule, so remediation stays immediate. `:configMigration` allows a rare,
separate PR when Renovate deprecates or renames configuration options. Kartuli intentionally does not
adopt the broader `config:best-practices` preset because its additional dependency-pinning and lockfile
policies have not been selected.

## Catalog and schema discovery

Most consumers use `catalog:`; version ranges live in `pnpm-workspace.yaml`. The dashboard lists the ranges at the catalog owner rather than
repeating versions in every consumer manifest.

The JSONata manager matches `biome.json` and `biome.root.json`, splits each `$schema` URL and
extracts its version for the `@biomejs/biome` npm datasource. The root executable declaration and both
schema changes should be reviewed together. A schema bump does not by itself upgrade the binary.

The catalog also contains `@tailwindcss/cli` without a current manifest consumer. Renovate can detect
that catalog entry even though no workspace script uses it. See the
[dependency audit](../05-engineering/06-dependency-inventory.md#catalog-and-usage-audit).

## GitHub Actions and runner discovery

The `github-actions` manager scans workflow and composite-action YAML. Kartuli groups only dependency
types `action` and `workflow` with routine maintenance. Their executable refs stay at full 40-character
SHAs with release comments so the result remains compatible with Sonar `githubactions:S7637`.

The manager classifies explicit labels such as `ubuntu-26.04` as `github-runner`. Those updates retain
the weekend schedule but use their own PR, providing a signal for runner-image compatibility review.
Do not replace the versioned label with `ubuntu-latest`.

The manager can also extract selected Action input versions as `uses-with`. Kartuli disables that type
because Node comes from `.nvmrc`, pnpm comes from the root `packageManager`, and other tool inputs need
an explicit owner. In particular, `vercel-version: latest` remains owned by
[#197](https://github.com/kartuli-app/kartuli/issues/197). No current workflow uses the manager's
`docker`, `container` or `service` dependency types, and those types are disabled rather than silently
expanding this policy.

## Verifying extraction

Before merge, validate `renovate.json` with the current Renovate config validator and run a local
`platform=local`, `dry-run=extract` pass. Record the manager/file/dependency counts, Action names,
runner label and any `uses-with` result in the PR. A local extraction proves how the checked-out config
is parsed; it does not prove the Mend-hosted app has loaded a branch-only configuration.

After merge, inspect Dependency Dashboard #28 and Mend provider output. Confirm that `github-actions`
appears, all expected external Action/reusable-workflow references and `ubuntu-26.04` runners are
listed, npm/catalog and both Biome schemas remain present, normal updates share `all dependencies`, and
no full SHA is normalized to a moving tag. Treat a provider mismatch as an extraction problem to fix,
not as a successful local-only verification.

## Reviewing and recovering updates

1. Start at dashboard #28 and locate the exact branch/PR and any blocked section.
2. Compare the catalog, affected manifests, lockfile and generated/schema changes.
3. Trace the consumer families: Vitest runner/browser/coverage, TanStack DB/React DB/Query DB Collection,
   Storybook addons/framework and React/type declarations often need compatible versions together.
4. Run `pnpm install --frozen-lockfile` on a clean checkout, then `pnpm run validate:all` and builds
   for affected applications/tools.
5. Review GitHub checks and provider findings before the normal human merge workflow.

Dashboard retry/rebase and recreate checkboxes are write operations: they request work from Renovate.
Closing a PR can leave an update blocked; inspect the dashboard's recreate controls. Do not assume
the next scheduled run will recreate it automatically.

## Failure diagnosis

| Symptom | Inspect |
| --- | --- |
| Package absent from dashboard | Enabled manager, dependency type, file pattern, catalog declaration and provider logs |
| Action SHA not updated | Check for a readable release comment and verify the upstream tag-to-SHA mapping |
| Runner grouped with packages | Verify the dependency is `github-runner` and matches only the runner-specific rule |
| Update detected but no PR | Schedule, blocked/closed PR section, version constraints and inherited limits |
| Partial test-runner upgrade | All Vitest family declarations, lockfile resolutions and compatibility |
| Incompatible TanStack `Collection` or `RefBranch` types | Check direct and adapter dependencies for multiple incompatible `@tanstack/db` versions; see [TanStack](../05-engineering/05-libraries/01-tanstack-and-indexeddb.md) |
| Biome schema/binary disagreement | JSONata result for both files and the root executable version |
| CI fails before tests | Dependency installation, frozen-lockfile consistency and pinned runtime first |

Inherited/global configuration, effective timezone, app permission scope and vulnerability feed access
remain provider settings to verify. Use the dashboard's detection list as evidence, not as proof that
every update is safe or every policy requested in JSON was applied.
