---
description: Finding dependency declarations, auditing documentation coverage and separating declaration from usage.
status: implemented
intent: runbook
---

# Dependency Inventory

The current inventory lives in root/workspace `package.json` files, the catalogs in
`pnpm-workspace.yaml` and resolved versions in `pnpm-lock.yaml`. These are the canonical sources
for consumers, dependency kinds and versions. This guide explains how to inspect them without
maintaining a second, handwritten list.

Use the [Technology catalog](./01-technologies.md), [Library catalog](./02-libraries.md) and
[coverage map](../12-project/01-documentation/02-coverage-map.md) to find the practical guides.
Those pages explain architectural roles and compatibility boundaries rather than mirroring versions.

## Inspecting the current inventory

Run from the repository root after installing the lockfile:

```bash
rg --files --hidden -g package.json -g '!node_modules' -g '!.git'
pnpm list -r --depth 0
pnpm why -r @tanstack/db
```

Compare manifests with the workspace globs. Include dependencies, devDependencies, peerDependencies
and optionalDependencies. Resolve `catalog:` and named-catalog declarations against
`pnpm-workspace.yaml`; `workspace:*` refers to local workspace packages.
`pnpm list` reports installed versions, which can differ from manifest ranges if installation is stale.

## Catalog and usage audit

A declaration does not prove runtime use. Trace imports, configuration and scripts before describing
a dependency as active or safe to remove. Catalog entries can have no manifest consumer, and scripts
can invoke an undeclared executable.

Current exceptions and their operating constraints are documented in
[Toolchain Support Packages](./05-libraries/07-toolchain-support.md): type declarations, build/test
adapters, lifecycle-script permissions and Storybook's script-only preview executable.
Renovate's [dashboard](../10-services/05-renovate.md) reports its own branch snapshot and discovery,
not the installation in your checkout.

## Keeping documentation coverage complete

1. Enumerate workspace manifests and catalogs using the sources above.
2. For each new dependency, find a role in the technology/library catalog or the owning tool/quality
   guide. Small helpers can share a guide; a new page is useful when there are recurring conventions.
3. Review scripts and pnpm policy fields for executables outside direct declarations.
4. Trace actual source/config consumers and record usage limitations where relevant.
5. Update the canonical guide when behavior, setup or compatibility changes. Routine version changes
   belong in the catalog and lockfile unless they alter those documented contracts.
6. Run the [dependency change workflow](../07-platform/04-dependency-management.md) and docs checks.

Transitive packages do not each need a guide. Document one when it imposes a project constraint,
such as the Vitest family pin. The coverage audit remains a review responsibility;
the docs validator checks links and metadata, not semantic coverage of every dependency.
