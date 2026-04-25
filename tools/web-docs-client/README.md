# @kartuli/web-docs-client

VitePress-based docs site for Kartuli: builds from `docs/`, generates an LLM bundle, and deploys to GitHub Pages.

## Scripts

```bash
# run from tools/web-docs-client
pnpm dev # Start VitePress dev server (port 5173)
pnpm build # generate the LLM bundle, build the docs site, and copy the LLM bundle into assets
pnpm preview # build the docs site and preview it locally (port 4173)
pnpm lint # lint the code
pnpm generate-llm-bundle # Generate the LLM bundle
pnpm copy-llm-bundle # Copy the LLM bundle into assets
```

## Local development

The navbar is generated in the config.mts file using the docs processor scripts, so after adding or renaming docs or folders, **restart the dev server** so the navbar and sidebar update

## Broken links

The VitePress build **fails on dead links**. 

The pr and main workflows run the docs build, so broken internal links are caught in CI. 

Use correct relative paths between docs (e.g. from `docs/apps/game-client/` to `docs/product/` use `../../product/`, not `../product/`).
