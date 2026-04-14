---
section: Tech/Development
title: Root Scripts
description: Full list of root-level package.json scripts and convenience commands.
---

# Root Scripts

All commands below are run from the **repository root** with `pnpm`. See per-app/per-tool docs for which commands apply to each app or tool.

**Prerequisites:** Node (version in [.nvmrc](https://github.com/kartuli-app/kartuli/blob/main/.nvmrc); run `nvm use`) and pnpm (from root `package.json` → `packageManager`; use [Corepack](https://nodejs.org/api/corepack.html) with `corepack enable` so the correct version is used).

## Development

| Script | Description |
|--------|-------------|
| `pnpm dev:all` | Run `dev` in all workspaces (Turbo) |
| `pnpm c:dev:game-client` | Start game client dev server (port 3000) |
| `pnpm c:dev:backoffice-client` | Start backoffice dev server (port 3001) |
| `pnpm c:dev:storybook` | Start Storybook dev server (port 6006) |
| `pnpm c:dev:web-docs-client` | Start VitePress docs dev server |

## Build

| Script | Description |
|--------|-------------|
| `pnpm build:all` | Run `build` in all workspaces (Turbo) |
| `pnpm build:all:no-cache` | Same as `build:all` but skip Turbo cache (`--force`) |
| `pnpm c:build:game-client` | Build game client only |
| `pnpm c:build:backoffice-client` | Build backoffice client only |
| `pnpm c:build:storybook` | Build Storybook static site |
| `pnpm c:build:web-docs-client` | Build docs site (VitePress) |

## Preview (production build locally)

| Script | Description |
|--------|-------------|
| `pnpm c:preview:game-client` | Serve production build of game client |
| `pnpm c:preview:backoffice-client` | Serve production build of backoffice |
| `pnpm c:preview:storybook` | Serve built Storybook |
| `pnpm c:preview:web-docs-client` | Serve built docs site |

## Test

| Script | Description |
|--------|-------------|
| `pnpm test:all` | Run unit tests in all workspaces (Turbo; E2E package has no `test` script so is not run) |
| `pnpm test:all:no-cache` | Same as `test:all` but skip Turbo cache (`--force`) |
| `pnpm test:all:coverage` | Run Vitest with coverage from root |
| `pnpm e2e` | Run all E2E tests (set BASE_URL or use per-target scripts below) |
| `pnpm e2e:ui` | Run Playwright UI mode |
| `pnpm c:e2e:game-client` | E2E vs game client (localhost:3000) |
| `pnpm c:e2e:backoffice-client` | E2E vs backoffice (localhost:3001) |
| `pnpm c:e2e:storybook` | E2E vs Storybook (localhost:6006) |
| `pnpm c:e2e:web-docs-client` | E2E vs web-docs (localhost:4173) |

## Lint and typecheck

| Script | Description |
|--------|-------------|
| `pnpm lint:all` | Run lint in all workspaces (Turbo) |
| `pnpm lint:all:fix` | Lint with auto-fix (Turbo) |
| `pnpm lint:all:no-cache` | Same as `lint:all` but skip Turbo cache (`--force`) |
| `pnpm typecheck:all` | Run typecheck in all workspaces (Turbo) |
| `pnpm typecheck:all:no-cache` | Same as `typecheck:all` but skip Turbo cache (`--force`) |

## Orchestrator (CI / local)

| Script | Description |
|--------|-------------|
| `pnpm orchestrator:detect-affected:pr` | Print JSON array of packages affected vs `origin/main` (Turbo `build` dry affected); script runs `git fetch origin main` |
| `pnpm orchestrator:detect-affected:prod` | Same, base revision `HEAD^` (no main fetch) |

Mapping to workflow targets is done by `node ./scripts/orchestrator/map-affected-to-workflows.mjs` (stdin: JSON array from detect; reads [`workflow-targets.json`](../../../scripts/orchestrator/workflow-targets.json); stdout: map JSON; with `GITHUB_OUTPUT` / `GITHUB_STEP_SUMMARY` set, also writes Actions outputs and job summary). The staging orchestrator pipes detect into this script; there is no separate `pnpm` script for it.

## Other

| Script | Description |
|--------|-------------|
| `pnpm turbo:cache:wipe` | Remove local Turbo cache (`.turbo`); remote cache unchanged |
| `pnpm lighthouse` | Run Lighthouse CI (e.g. `lhci autorun`) |
| `pnpm prepare` | Install lefthook git hooks (runs post-install) |

## See also

- [Game Client Hub](../../apps/game-client/index.md) — scripts for game client
- [Backoffice Client Hub](../../apps/backoffice-client/index.md) — scripts for backoffice
- [Storybook Hub](../../tools/storybook/index.md) — scripts for Storybook
- [Web Docs Client Hub](../../tools/web-docs-client/index.md) — scripts for docs
- [E2E Hub](../../tools/e2e/index.md) — E2E scripts and CI usage
