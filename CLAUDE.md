# CLAUDE.md

Read [AGENTS.md](AGENTS.md) first for repository rules, commands and code conventions.

## Essential rules

- Use `pnpm` only — never `npm`.
- Node version is pinned in `.nvmrc` (`24.13.1`). Respect it.
- Before considering any work complete, run: `pnpm run validate:all`
- Never commit unless the user explicitly asks.
- Use conventional commit format when asked to commit: `<type>[optional scope]: <description>`
- Always read the relevant Next.js docs before writing Next.js code: `./apps/game-client/node_modules/next/dist/docs`. Training data is stale — the local docs are the source of truth.

## Canonical context

Start with the [agent documentation index](https://kartuli-app.github.io/kartuli/assets/kartuli-llm.txt), then fetch the relevant pages. If live docs are unavailable, read the checkout's `docs/` sources.

- [AI Development](docs/11-ai-development/index.md): context hierarchy and documentation workflow.
- [Engineering](docs/05-engineering/index.md): workspaces, catalog, shared-code boundaries and development commands.
- [Game Client](docs/01-apps/01-game-client/index.md): actual routes, i18n, content architecture and offline limitations.
- [Data & Privacy](docs/09-data-and-privacy/index.md): local persistence and identifiers.
- [Design System](docs/04-design-system/index.md) and [Packages](docs/02-packages/index.md): tokens, shared UI and exports.
- [Testing](docs/06-quality/01-testing.md): Turbo tests include Storybook; root coverage excludes its browser suite.
- [Project workflow](docs/12-project/02-workflow.md): Git hooks, PRs and documentation impact.

Update the canonical page in the same PR as behavior changes. Keep this bootstrap concise; do not duplicate long-form architecture here. Planned product specs and external provider settings are not evidence of implemented behavior.

For substantial documentation pages, use the authoring prompts in `documentation-templates/README.md`; keep templates outside the published `docs/` tree. Catalogs should link to practical configuration/operating guides.
