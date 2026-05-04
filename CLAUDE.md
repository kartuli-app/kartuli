# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Kartuli is a Georgian language learning platform. Students learn via a Next.js game client; collaborators manage content via a backoffice client. The platform is offline-capable and requires no account.

## Essential rules

- Use `pnpm` only — never `npm`.
- Node version is pinned in `.nvmrc` (`24.13.1`). Respect it.
- Before considering any work complete, run: `pnpm run validate:all`
- Never commit unless the user explicitly asks.
- Use conventional commit format when asked to commit: `<type>[optional scope]: <description>`
- Always read the relevant Next.js docs before writing Next.js code: `./apps/game-client/node_modules/next/dist/docs`. Training data is stale — the local docs are the source of truth.

## Monorepo structure

Managed with pnpm workspaces + Turborepo. All `pnpm run c:*` scripts target a single package.

| Path | Package name | Purpose |
|------|-------------|---------|
| `apps/game-client` | `@kartuli/game-client` | Student-facing Next.js app (port 3000) |
| `apps/backoffice-client` | `@kartuli/backoffice-client` | Content management Next.js app (port 3001) |
| `packages/ui` | `@kartuli/ui` | Shared React components and utilities |
| `packages/tailwind-config` | `@kartuli/tailwind-config` | CSS variables + Tailwind base styles |
| `tools/storybook` | `@kartuli/storybook` | UI component playground (port 6006) |
| `tools/e2e` | `@kartuli/e2e` | Playwright end-to-end tests |
| `tools/web-docs-client` | `@kartuli/web-docs-client` | VitePress live documentation site |
| `docs` | — | Documentation source files |

Dependencies are pinned in the `pnpm-workspace.yaml` `catalog:` section — reference catalog versions when adding packages.

## Key commands

```bash
pnpm install                        # install deps
pnpm run validate:all               # lint + typecheck + test (run before considering work done)
pnpm run lint:all:fix               # auto-fix lint/format issues

# Single-package workflows (replace suffix with: game-client, backoffice-client, storybook, web-docs-client)
pnpm run c:dev:game-client          # dev server
pnpm run c:build:game-client        # build
pnpm run c:preview:game-client      # build + serve

# E2E (start the target app first, then run):
pnpm run c:e2e:game-client          # BASE_URL=http://localhost:3000

# Design system pipeline
pnpm run design:build               # DESIGN.md → design tokens JSON → CSS vars + Tailwind theme
```

**Run a single test file:**
```bash
pnpm --filter @kartuli/game-client exec vitest run src/path/to/file.test.ts
```

**Storybook tests** run in browser mode (Chromium + Playwright) and require a dev server — they are excluded from `test:all`. Run explicitly with `pnpm --filter @kartuli/storybook test`.

## Architecture

### Game client — routing and i18n

All routes are nested under `app/[locale]/`. The Next.js middleware (`src/proxy.ts`) intercepts bare paths and redirects to the user's preferred locale (`en` or `ru`) using cookie → `Accept-Language` → default (`en`) priority order. Update the middleware `matcher` regex if supported locales change.

i18n uses `i18next` + `react-i18next`. Translation namespaces live in `src/i18n/resources/`.

### Game client — learning content

Content flows: JSON data sources → ingestion layer → `Library` object → RSC server components.

- **Common data** (`ingestion/data-sources/default-common-data.json`, `extended-common-data.json`): locale-independent letter/word definitions.
- **Localized data** (`ingestion/data-sources/*.{en,ru}.json`): per-locale titles and translations.
- `build-library.tsx` merges both into a typed `Library` (letters, words, lessons, modules with Map indexes).
- `get-library-server.tsx` provides the server-side singleton. Content is never fetched from an API at runtime — it is bundled.

### Game client — student state

Student progress is persisted entirely client-side in **IndexedDB** via the `idb` library (`src/student/item-activity-device-states-collection/`). `@tanstack/react-db` provides a reactive collection layer on top. Student identity uses `deviceId` + `ownerId` (both generated and stored in localStorage). There is no backend or account system.

### Design system

The design system is defined in `DESIGN.md` (a `design.md` format file with DTCG token frontmatter). The pipeline:

1. `pnpm run design:export:dtcg` → `generated/design.tokens.json`
2. `pnpm run design:build-css` (runs `build-design-css.mjs`) → `src/styles/generated/tokens.css` + `tailwind-theme.css`

These generated files are consumed by `@kartuli/tailwind-config` and imported in app global styles.

### Shared UI

`@kartuli/ui` exports components and the `cn` utility (wraps `clsx` + `tailwind-merge`) for conditional class merging. Always import `cn` from `@kartuli/ui` rather than using either library directly.

## Code conventions

- **Files:** `kebab-case.ts`
- **Variables/functions:** `camelCase`
- **Constants:** `SCREAMING_SNAKE_CASE`
- **Exports:** named exports preferred over default exports
- **TypeScript:** no `any` (use `unknown`); prefer `interface` over `type` for object shapes; no non-null assertions without a comment; use `@/` path aliases
- **Styles:** Tailwind CSS utility classes; use `cn` from `@kartuli/ui` for conditionals
- **Tests:** test files live next to the file they test, not in a separate folder

## Git hooks (lefthook)

Pre-commit runs lint (Biome) and checks for conflict markers and debug patterns (`console.log`, `debugger`, `alert`). Pre-push runs typecheck and tests on affected packages. Conventional commit format is enforced on commit messages.
