---
description: Pinned runtimes, workspace catalogs, frozen installs and dependency maintenance.
status: implemented
intent: reference
---

# Node.js and pnpm

## Runtime and package manager

Node 24 is the repository's supported runtime major. The root `package.json` expresses that support as
`engines.node: ">=24 <25"`: every stable Node 24 release satisfies the range, while Node 23 and Node
25 do not. `.nvmrc` pins Node 24.13.1 as the exact release tested locally and in CI. Root
`package.json` separately pins pnpm 10.30.2 with integrity metadata. Use pnpm only, select the `.nvmrc`
release with your local version manager and check `node --version` and `pnpm --version` rather than
assuming the shell inherited the expected tools.

The engine value is a standard semver compatibility range, not an exact version-manager pin. npm treats
`engines` as advisory unless strict engine checking is enabled; pnpm also reads this field and supports
strict checking. Kartuli does not enable `engineStrict`, so `.nvmrc` remains the operational local/CI pin.
See the [npm package manifest reference](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#engines)
and [pnpm 10 manifest reference](https://pnpm.io/10.x/package_json#engines).

CI's `.github/actions/ci-setup-node/action.yml` configures pnpm, asks `actions/setup-node` to read
`.nvmrc`, restores caches and runs `pnpm install --frozen-lockfile`. No workflow declares an independent
Node version. Root `prepare` installs Lefthook when inside Git. The allowed built dependencies are
configured in root `package.json`; upgrades to pnpm that change configuration interpretation require
deliberate migration.

Vercel is a distinct managed runtime boundary. Both app projects select Node `24.x`; Vercel may advance
the minor or patch release within that major independently of `.nvmrc`. That is compatible with the
root supported-major range even when the provider's current Node 24 patch differs from 24.13.1. The
verified project settings and engine precedence are documented under [Vercel](../../10-services/02-vercel.md).

## Workspaces and catalogs

`pnpm-workspace.yaml` includes apps, packages, tools and the docs content workspace. Cross-workspace dependencies use `workspace:*`. Shared external ranges use `catalog:`; Storybook's TypeScript uses `catalog:storybook`. Root-only development tools may have explicit ranges. `pnpm-lock.yaml` is the resolved dependency graph, not interchangeable with the catalog.

To add a shared library, choose the direct consumer first, add the common range to the catalog and declare it in that consumer. Do not rely on a transitive dependency happening to be hoisted. Update the lockfile with pnpm and inspect the diff for unrelated resolution changes.

## Everyday commands

```bash
pnpm install --frozen-lockfile
pnpm --filter @kartuli/game-client run dev
pnpm --filter @kartuli/e2e exec playwright install chromium
pnpm run validate:all
```

`run` invokes a package script; `exec` invokes an installed binary in that workspace's context. This matters for Playwright: the E2E workspace declares `@playwright/test` and exposes its CLI, while Storybook's browser provider does not guarantee a `playwright` command there.

## Troubleshooting and upgrades

A frozen-lockfile failure means manifests/catalogs and the lockfile disagree; regenerate intentionally, not by disabling the CI check. A missing CLI may mean the wrong filter rather than a missing dependency. A clean install does not install every browser/system runtime needed by tests.

When updating Node or pnpm, update its pin and relevant cache/tool assumptions, reinstall and run the full checks. Renovate currently ignores `.nvmrc` and disables pnpm/engine updates, so these need explicit maintenance. See [Dependency Management](../../07-platform/04-dependency-management.md) and the [command reference](../04-commands.md).
