# Repository Guidelines

This project is a Georgian language learning platform.

## Agent Fast Path

1. Read this file first, then check `https://kartuli-app.github.io/kartuli/assets/kartuli-llm.txt` for documentation entry points.
2. Use `pnpm` only (never `npm`).
3. Respect pinned Node from `.nvmrc` (`24.13.1`).
4. Before considering work complete, always run:
   - `pnpm run validate:all`
5. Never commit unless explicitly requested by the user.

## Git Workflow

- Do not create commits unless the user explicitly asks.
- When asked to commit, use conventional commit format.

### Commit Convention

Always use conventional commit format for all commits:

- Format: `<type>[optional scope]: <description>`
- Types: feat, fix, docs, style, refactor, perf, test, chore
- Examples: `docs: add project overview`, `feat(auth): add social login`

## Canonical Documentation

- Use [AI Development](docs/11-ai-development/index.md) for context strategy and [Documentation Architecture](docs/12-project/01-documentation/index.md) to find canonical owners.
- Update canonical docs in the same PR when code/config/product behavior changes; otherwise explain why documentation is unaffected.
- For docs changes, also run `pnpm run c:build:web-docs-client` and inspect the generated `kartuli-llm.txt` index.
- Distinguish implemented behavior from planned specifications and mark unverified external settings explicitly.

## Tech Stack

- Runtime: Node.js 24
- Package manager: pnpm 10
- Build system: Turborepo
- Language: TypeScript 7
- Framework: Next.js 16 + React 19
- Testing: Vitest 4 + Playwright
- Dependencies are declared in the `/pnpm-workspace.yaml` catalog

## Project structure

- Documentation: `/docs`
- Apps: `/apps`
- Packages: `/packages`
- Tools: `/tools`

### Apps

- Game client (Next.js app where students learn Georgian): `/apps/game-client`
- Backoffice client (Next.js app where collaborators manage learning content): `/apps/backoffice-client`

### Packages

- Tailwind config (css variables and Tailwind CSS utility classes): `/packages/tailwind-config`
- UI (shared ui components and utilities): `/packages/ui`

### Tools

- Web docs client (Vitepress live documentation site): `/tools/web-docs-client`
- Storybook (ui components playground): `/tools/storybook`
- e2e test runner (Playwright): `/tools/e2e/`

## Commands

Run from the repo root unless specified.

- Do not run `npm` commands — this repo uses pnpm workspaces.
- Install deps: `pnpm install`
- Wipe turbo cache: `pnpm run turbo:cache:wipe`

### All packages scripts

- Start dev server for all packages: `pnpm run dev:all`
- Build all packages: `pnpm run build:all`
- Lint and format all packages: `pnpm run lint:all`
- Lint and format fix all packages: `pnpm run lint:all:fix`
- Typecheck all packages: `pnpm run typecheck:all`
- Test all packages: `pnpm run test:all`
- Test all packages with coverage: `pnpm run test:all:coverage`
- Validate all packages (lint, typecheck, test): `pnpm run validate:all`

### Single package scripts (replace package-name, for example `pnpm run c:dev:game-client`)

- Start dev server: `pnpm run c:dev:package-name`
- Build: `pnpm run c:build:package-name`
- Preview (build + start): `pnpm run c:preview:package-name`
- Run e2e (preview / start dev server first): `pnpm run c:e2e:package-name`

## Validation Matrix

- Default for all changes (docs, code, config): run `pnpm run validate:all`.
- No package-scoped fallback is required in normal workflow.
- If a command cannot run due to environment constraints, report the blocker and stop.
- We intentionally prefer full-repo checks because they are fast in this monorepo and reduce the chance of missing cross-package regressions.

## Code conventions

### Code Style

- Prefer named exports over default exports
- Follow Biome configuration for linting and formatting
- Follow Sonar suggestions. The [overall summary for `main`](https://sonarcloud.io/summary/overall?id=kartuli-app_kartuli&branch=main) is the live project overview.

### Naming

- Files: `kebab-case.ts`
- Variables and functions: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE`

### TypeScript

- No `any` (use `unknown`)
- Prefer `interface` over `type` for object shapes
- No non-null assertions without comment
- Use `@/` path aliases

### UI and styles

- Use Tailwind CSS utility classes
- For conditional class names, use `cn` from `/packages/ui/src/utils/cn.tsx`

### Next.js conventions

- ALWAYS read docs before coding
- Before any Next.js work, find and read the relevant doc in `./apps/game-client/node_modules/next/dist/docs`. Your training data is outdated — the docs are the source of truth.

### Testing

- Tests files live next to the file they are testing
- Avoid separate test folder

For substantial documentation pages, use the authoring prompts in `documentation-templates/README.md`; keep templates outside the published `docs/` tree. Catalogs should link to practical configuration/operating guides.
