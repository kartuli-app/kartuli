---
section: Tech/Development
title: Quality Tooling
description: Lint, typecheck, tests, E2E, Lighthouse, git hooks, and dependency updates.
---

# Quality Tooling

## Lint and typecheck

- **Lint:** `pnpm lint` (Turbo, all workspaces). Auto-fix: `pnpm lint:fix`. Uses Biome (see [Biome](https://biomejs.dev/)).
- **Typecheck:** `pnpm typecheck` (Turbo, all workspaces). TypeScript strict mode across the monorepo.

## Tests

- **Unit tests:** `pnpm test` runs tests in all workspaces except the E2E package. Run from root or per-package.
- **E2E:** Playwright in `@kartuli/e2e`. Use root scripts `pnpm c:e2e:game-client`, etc., or `pnpm test:e2e` with `BASE_URL` set. See [E2E Hub](../../tools/e2e/index.md) and [tools/e2e/README.md](https://github.com/kartuli-app/kartuli/blob/main/tools/e2e/README.md).

## Lighthouse

- **Local:** `pnpm lighthouse` (runs `lhci autorun`). Used in CI for Next.js apps (staging and production) with assertions; reports and artifacts on failure.
- **CI:** Staging (Next.js workflow) and production (game-client, backoffice-client) run Lighthouse after build/deploy.

## Git hooks (Lefthook)

- **Pre-commit:** Lint (Turbo), conflict-marker check, large-file check in `src/`. Configured in [lefthook.yml](https://github.com/kartuli-app/kartuli/blob/main/lefthook.yml). Installed via `pnpm prepare` (lefthook install).

## Dependency updates

- **Renovate:** Config in [renovate.json](https://github.com/kartuli-app/kartuli/blob/main/renovate.json). Opens PRs for dependency updates; review and merge as usual.

## Review and branch protection

- **Branch protection:** Pull requests and (optionally) required reviews before merging to `main`. See [GitHub Repo Management](../../providers/github-repo-management.md) for CODEOWNERS and branch protection rules.
- **PR template:** [.github/pull_request_template.md](https://github.com/kartuli-app/kartuli/blob/main/.github/pull_request_template.md) guides reviewers.

## References

- [Root scripts](./root-scripts.md) — All root-level commands
- [Staging pipelines](./staging-pipelines.md) — Where lint, typecheck, E2E, and Lighthouse run in CI
- [Production pipelines](./production-pipelines.md) — Where E2E and Lighthouse run in production
