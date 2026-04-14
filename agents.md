# Repository Guidelines

This project is a georgian language learning platform

## Git Workflow
- Never create commits unless explicitly requested by the user
- Always ask for permission before committing changes
- Use conventional commit format when commits are requested

### Commit Convention
Always use conventional commit format for all commits:
- Format: `<type>[optional scope]: <description>`
- Types: feat, fix, docs, style, refactor, perf, test, chore
- Examples: `docs: add project overview`, `feat(auth): add social login`

## Tech Stack
- Runtime: Node.js 24
- Package manager: pnpm 10
- Build system: Turborepo
- Language: TypeScript 6
- Framework: Nextjs 16 + React 19
- Testing: Vitest 4 + Playwright
- Dependencies are declared in the `/pnpm-workspace.yaml` catalog


## Project structure
- Documentation: `/docs`
- Apps: `/apps`
- Packages: `/packages`
- Tools: `/tools`

### Apps
- Game client (Next.js app where students learn georgian): `/apps/game-client`
- Backoffice client (Next.js app where collaborators manage learning content): `/apps/backoffice-client`

### Packages:
- Tailwind config (css variables and Tailwind CSS utility classes): `/packages/tailwind-config`
- UI (shared ui components and utilities): `/packages/ui`

### Tools
- Web docs client (Vitepress live documentation site): `/tools/web-docs-client`
- Storybook (ui components playground): `/tools/storybook`
- e2e test runner (Playwright): `/tools/e2e/`

### Packages

## Commands

Run from the repo root unless specified.

### Node.js (nvm + Cursor)

- **Pinned version:** **24.13.1** (see `.nvmrc` at the repo root). When you bump `.nvmrc`, update the matching path in `.vscode/settings.json` (`…/node/v24.13.1/bin`) so IDE terminals stay aligned.
- **nvm layout:** `NVM_DIR` is usually `$HOME/.nvm`. The loader is `$NVM_DIR/nvm.sh` (after sourcing it, `nvm` is a shell function — not always present in minimal/non-interactive shells).
- **Cursor / VS Code:** `.vscode/settings.json` prepends `$HOME/.nvm/versions/node/v24.13.1/bin` to `PATH` for integrated terminals on Linux and macOS, and uses a login + interactive `zsh` profile so your usual rc files still run.
- **When `nvm` is missing or `node` is still wrong** (some automation shells, CI, or agent runs that do not load your rc files), run a **single** shell line from the repo root so `.nvmrc` is picked up:

```bash
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use && pnpm -v
```

Replace `pnpm -v` with the real command (e.g. `pnpm run validate:all`). If `NVM_DIR` is non-standard on the machine, set it before sourcing.

- Do not run `npm` commands — this repo uses pnpm workspaces.
- Install deps: `pnpm install`
- Wipe turbo cache: `pnpm run turbo:cache:wipe`
- Generate diagrams (monorepo, game-client, backoffice-client): `pnpm run diagrams:all`

### All packages scripts
- Start dev server for all packages: `pnpm run dev:all`
- Build all packages: `pnpm run build:all`
- Lint and format all packages: `pnpm run lint:all`
- Lint and format fix all packages: `pnpm run lint:all:fix`
- Typecheck all packages: `pnpm run typecheck:all`
- Test all packages: `pnpm run test:all`
- Test all packages with coverage: `pnpm run test:all:coverage`
- Validate all packages (lint, format, typecheck, test): `pnpm run validate:all`

### Single package scripts (replace package-name, for example `pnpm run c:dev:game-client`)
- Start dev server: `pnpm run c:dev:package-name`
- Build: `pnpm run c:build:package-name`
- Preview (build + start): `pnpm run c:preview:package-name`
- Run e2e (preview / start dev server first): `pnpm run c:e2e:package-name`

### Sanity checks to run before considering work finished:
- Validate all packages (lint, format, typecheck, test): `pnpm run validate:all`
- Generate diagrams (monorepo, game-client, backoffice-client): `pnpm run diagrams:all`

## Code conventions

### Code Style
- Prefer named exports over default exports
- Follow Biome configuration for linting and formatting
- Follow Sonar suggestions

### Naming
- Files: `kebab-case.ts`
- Variables and functions: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE` 

### Typescript
- No `any` (use `unknown`)
- Prefer `interface` over `type` for object shapes
- No non-null assertions without comment
- @/ path aliases

### UI and styles
- Use Tailwind CSS utility classes
- for conditional classnames use `cn` from `/packages/ui/src/utils/cn.tsx`
 
### Next.js conventions
- ALWAYS read docs before coding
- Before any Next.js work, find and read the relevant doc in `./apps/game-client/node_modules/next/dist/docs`. Your training data is outdated — the docs are the source of truth.
 
### Testing
- Tests files live next to the file they are testing
- Avoid separate test folder