---
description: Monorepo layout, dependency catalog, build graph and shared code boundaries.
status: implemented
intent: architecture
---

# Engineering

Kartuli uses pnpm workspaces and Turborepo. Workspace globs in `pnpm-workspace.yaml` include `apps/*`, `packages/*`, `tools/*` and `docs`. The docs workspace is source consumed by Web Docs, not a separate app.

| Boundary | Responsibility |
| --- | --- |
| [Apps](../01-apps/index.md) | App-specific routes, content and product behavior |
| [Packages](../02-packages/index.md) | Reusable code/style contracts consumed by workspace code |
| [Tools](../03-tools/index.md) | Development, validation, docs and inspection executables |

Shared packages should stay independent of app-specific domains. Apps may consume packages; Storybook intentionally consumes Game Client stories through workspace dependencies and aliases. That inspection dependency does not make product code a shared package.

## Dependencies and build graph

Use `pnpm` only. `.nvmrc` pins Node 24.13.1; root `package.json` pins pnpm 10.30.2. Shared dependencies normally use `catalog:`; the named `storybook` catalog retains TypeScript 6 for docgen while application TypeScript is 7. The lockfile records resolved versions; catalog ranges are not exact installed versions.

`turbo.json` defines build tasks depending on upstream builds, uncached persistent dev/preview tasks, cached lint/test/typecheck and output paths. The Web Docs build includes `docs/**` as inputs. See [Platform](../07-platform/index.md) for CI and remote-cache credentials rather than duplicating them here.

## Development

Install with `pnpm install --frozen-lockfile`. Root `c:dev:*`, `c:build:*`, `c:preview:*` and `c:e2e:*` scripts target individual workspaces; `validate:all` is required for every change. [Quality](../06-quality/index.md) explains what that runs. Tests generally live beside source; E2E has a dedicated tool workspace.

See the [Technology catalog](./01-technologies.md) and [Library catalog](./02-libraries.md). The [Game Client architecture](../01-apps/01-game-client/index.md) owns its routing, i18n and bundled learning content; [Data & Privacy](../09-data-and-privacy/index.md) owns storage and identifier policy.

## Maintenance references

[Command Reference](./04-commands.md) accounts for every root/workspace script, including differences between preview implementations. [Dependency Inventory](./06-dependency-inventory.md) accounts for every direct manifest dependency so the architectural catalogs do not conceal smaller tools or helpers.
