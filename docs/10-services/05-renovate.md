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
current update branches and blocked updates. Discovery was last verified on **2026-10-06**.

Confirm npm-manager discovery of workspace manifests and both catalogs in `pnpm-workspace.yaml`,
plus JSONata discovery of both Biome schemas. Dashboard versions describe its branch snapshot;
compare them with the checkout and lockfile.

## Committed policy

| Configuration | Intended behavior in this repository |
| --- | --- |
| Presets | `config:recommended` and `:dependencyDashboard` |
| Managers | `npm` and `custom.jsonata`; GitHub Actions updates are not enabled here |
| Normal schedule | Before 3am on Monday; no timezone is declared locally |
| Normal grouping | Major/minor/patch updates share `all dependencies`; separation flags are disabled |
| Merge | `automerge: false`; GitHub repository auto-merge is also disabled in the observed metadata |
| Labels | `type:chore`, `scope:global`; vulnerability alerts also request `security` |
| Commit policy | Semantic chore commits with `update dependencies` action and dependency topic |
| Vulnerability alerts | Immediate PR creation, `security updates` group and lowest fixing version strategy |
| Runtime/package manager | `.nvmrc` ignored; engine and pnpm updates disabled |
| TypeScript | A declaration currently below 7 is constrained below 7 for Storybook docgen |
| Vitest family | `vitest` and `@vitest/**` constrained below 5 with `rangeStrategy: pin`; keep runner/browser/Playwright/coverage on one exact release |
| Node declarations | `@types/node` constrained below 25 |

The file also contains a package rule matching `security` with an anytime schedule. Treat that as
declared policy, not evidence that every inherited/security rule is effective; use the dashboard and
provider configuration logs when behavior differs.

## Catalog and schema discovery

Most consumers use `catalog:`; version ranges live in `pnpm-workspace.yaml`. Storybook alone uses
`catalog:storybook` for TypeScript 6. The dashboard lists the ranges at the catalog owner rather than
repeating versions in every consumer manifest.

The JSONata manager matches `biome.json` and `biome.root.json`, splits each `$schema` URL and
extracts its version for the `@biomejs/biome` npm datasource. The root executable declaration and both
schema changes should be reviewed together. A schema bump does not by itself upgrade the binary.

The catalog also contains `@tailwindcss/cli` without a current manifest consumer. Renovate can detect
that catalog entry even though no workspace script uses it. See the
[dependency audit](../05-engineering/06-dependency-inventory.md#catalog-and-usage-audit).

## Reviewing and recovering updates

1. Start at dashboard #28 and locate the exact branch/PR and any blocked section.
2. Compare the catalog, affected manifests, lockfile and generated/schema changes.
3. Trace the consumer families: Vitest runner/browser/coverage, TanStack DB/React DB/Query DB Collection,
   Storybook addons/framework and React/type declarations often need compatible versions together.
4. Preserve the TypeScript 6 Storybook exception until its docgen dependency supports the replacement.
5. Run `pnpm install --frozen-lockfile` on a clean checkout, then `pnpm run validate:all` and builds
   for affected applications/tools.
6. Review GitHub checks and provider findings before the normal human merge workflow.

Dashboard retry/rebase and recreate checkboxes are write operations: they request work from Renovate.
Closing a PR can leave an update blocked; inspect the dashboard's recreate controls. Do not assume
the next scheduled run will recreate it automatically.

## Failure diagnosis

| Symptom | Inspect |
| --- | --- |
| Package absent from dashboard | Enabled manager, file pattern, catalog declaration and provider logs |
| Update detected but no PR | Schedule, blocked/closed PR section, version constraints and inherited limits |
| Unexpected TypeScript major | Which catalog/declaration matched `matchCurrentVersion: <7` |
| Partial test-runner upgrade | All Vitest family declarations, lockfile resolutions and compatibility |
| Incompatible TanStack `Collection` or `RefBranch` types | Check direct and adapter dependencies for multiple incompatible `@tanstack/db` versions; see [TanStack](../05-engineering/05-libraries/01-tanstack-and-indexeddb.md) |
| Biome schema/binary disagreement | JSONata result for both files and the root executable version |
| CI fails before tests | Dependency installation, frozen-lockfile consistency and pinned runtime first |

Inherited/global configuration, effective timezone, app permission scope and vulnerability feed access
remain provider settings to verify. Use the dashboard's detection list as evidence, not as proof that
every update is safe or every policy requested in JSON was applied.
