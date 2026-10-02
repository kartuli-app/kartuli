---
description: Pinned runtimes, workspace catalogs, frozen installs and dependency maintenance.
status: implemented
intent: reference
---

# Node.js and pnpm

## Runtime and package manager

`.nvmrc` pins Node 24.13.1; root `package.json` pins pnpm 10.30.2 with integrity metadata. Use pnpm only. Select the pinned Node with your local version manager and make the pinned pnpm available before installing. Check `node --version` and `pnpm --version` rather than assuming the shell inherited the expected tools.

CI's `.github/actions/ci-setup-node/action.yml` reads these files, configures pnpm/Node, restores caches and runs `pnpm install --frozen-lockfile`. Root `prepare` installs Lefthook when inside Git. The allowed built dependencies are configured in root `package.json`; upgrades to pnpm that change configuration interpretation require deliberate migration.

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
