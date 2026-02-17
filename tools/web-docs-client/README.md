# Web Docs Client

VitePress-based docs site for Kartuli: builds from `docs/`, generates an LLM bundle, and deploys to GitHub Pages.

Full docs: [Web Docs Client Hub](../../docs/tools/web-docs-client/index.md).

## Prerequisites

- Node.js and pnpm (see repo root `package.json` for versions: Node `>=20.12.2 <21`, pnpm `9.12.2`).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start VitePress dev server (from this folder). |
| `pnpm build` | Build the docs site (postbuild copies LLM bundle into assets). |
| `pnpm preview` | Preview the built site locally. |

From **repo root** you can run: `pnpm run c:build:docs`, `pnpm run c:dev:docs`, `pnpm run c:preview:docs`. Aliases: `pnpm docs:dev`, `pnpm docs:preview`.

To generate the LLM bundle manually: `node scripts/generate-llm-bundle.js` (from repo root or this folder).

## Local development

- From repo root: `pnpm docs:dev` or `pnpm run c:dev:docs`. From this folder: `pnpm dev`. VitePress runs with source from `docs/`; default port is 5173, site under `/kartuli/`.
- After adding or moving docs (or changing frontmatter that affects nav), **restart the dev server** so the navbar and sidebar update (they are built when the config loads).

## More

For VitePress implementation, LLM bundle, scripts, and CI/CD: [Web Docs Client Hub](../../docs/tools/web-docs-client/index.md).
