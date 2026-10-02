---
description: Configuration inheritance, aliases, test/build boundaries and the Storybook compiler exception.
status: implemented
intent: reference
---

# TypeScript

## Role and consumers

TypeScript checks app, UI and E2E code. Most workspaces consume `typescript: catalog:` (major 7); Storybook consumes `catalog:storybook` (major 6). The exception exists because its docgen integration requires the JavaScript compiler API. Keep the two catalog entries distinct when upgrading.

## Configuration map

| Configuration | Extends / responsibility |
| --- | --- |
| Root `tsconfig.json` | Shared strictness, ES2022 target, bundler resolution, JSON imports, isolated modules and `noEmit` |
| App `tsconfig.json` | Root; DOM libraries, Next plugin, incremental checking and generated `.next/types` |
| App `tsconfig.test.json` | App config; includes colocated test files and setup for Vitest typecheck configuration |
| UI `tsconfig.json` | Root; automatic React JSX and Node types; excludes test files from its normal typecheck |
| UI `tsconfig.build.json` | UI config; narrows includes/excludes for the `build:components` script |
| Storybook `tsconfig.json` | Root; Storybook config and Vitest config, Vite client types |
| Storybook `tsconfig.docgen.json` | Root; includes app/UI source for prop documentation |
| E2E `tsconfig.json` | Root; browser test/tool checking |

Root `noEmit: true` is inherited by UI's build configuration; do not assume `build:components` currently emits a distributable package. Its public exports point to source files. Next.js and Storybook perform their own transformations/bundling.

## Aliases and resolution

The root maps `@game-client/*`, `@backoffice-client/*` and `@kartuli/ui/*` to source directories. These mappings let the compiler resolve imports; they do not configure every runtime bundler. App Vitest aliases and Storybook `viteFinal`/Vitest aliases must resolve the same source. Use the real aliases rather than introducing a generic `@/` alias that is not configured here.

A child `paths` object can replace inherited mappings. Before adding aliases, inspect the effective config and every consumer of that source, including stories. Storybook merges existing Vite aliases rather than discarding plugin-provided ones.

## Common changes

To adjust an app-only setting, edit its config rather than widening the root contract. To change shared strictness or aliases, review all app, UI, E2E and Storybook consumers. Keep generated Next declarations in the app include list and ensure source/tests are checked by their intended commands.

```bash
pnpm --filter @kartuli/game-client exec tsc --showConfig
pnpm --filter @kartuli/game-client run typecheck
pnpm run typecheck:all
```

A successful Vitest run proves runtime assertions, not that Vitest's optional typecheck mode ran. Workspace `typecheck` scripts are the normal static gate; inspect includes when adding test-only types.

## Upgrade and troubleshooting

Change the shared catalog range, update the lockfile using pnpm, and run full validation plus builds of the affected consumers. Verify Storybook's compiler API compatibility before removing its named catalog. An alias that works in Next but fails in a story usually points to differing Vite aliases or the JSX transform, not missing application code.

The native TypeScript 7 executable needs normal OS facilities. A panic resolving `/proc/self/exe` in a restricted Linux sandbox is an environment failure; do not loosen types or downgrade the repository to hide it. Sources: root/workspace `tsconfig*.json`, package scripts, `pnpm-workspace.yaml`, Storybook `.storybook/main.ts`.
