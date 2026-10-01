---
description: VitePress generation, directory-driven navigation, LLM index and diagram limitations.
status: implemented
intent: runbook
---

# Web Docs Client

The `@kartuli/web-docs-client` workspace consumes the `@kartuli/docs` workspace. Markdown in `docs/` is served by VitePress with base `/kartuli/`; `.vitepress/config.mts` is the site configuration.

## Build and agent index

From the repository root, run `pnpm run c:build:web-docs-client`. The build generates `docs/kartuli-llm.txt`, builds VitePress, then copies that file to `.vitepress/dist/assets/kartuli-llm.txt`. The generated source index is gitignored; do not edit or commit it.

`scripts/docs-processor.js` scans Markdown, derives navigation labels/order from numbered directories and filenames, and places `index.md` hubs first. The top navigation groups section links in a Documentation menu so the twelve sections do not overflow the header; the sidebar retains all section groups. It requires nonempty `description` frontmatter. The root landing page is deliberately excluded from the agent index. `generate-llm-bundle.js` emits a **links-only index**, not full page text; agents must follow the links. An `llm: skip` marker excludes a page and should be exceptional.

For docs changes, check descriptions, links, all twelve sections in the generated index, and that the copied asset matches the source. Preview with `pnpm run c:preview:web-docs-client` and inspect navigation at narrow and wide widths. VitePress checks dead internal links during build; this is not a check of external provider state.

## Diagrams: known limitation

The configured `vitepress-plugin-diagrams` writes to `tools/web-docs-client/public/diagrams`. Committed assets include HTML reporting `kroki.io | 504: Gateway time-out` under an `.svg` filename. A successful site build alone does not establish diagram validity. See [Kroki](../10-services/07-kroki.md) for external dependency verification. Repair/replacement of that pipeline is follow-up work; the separate [Diagram Generator](./04-diagram-generator.md) uses local Graphviz.

Writing and ownership rules are canonical in [Project → Documentation](../12-project/01-documentation/index.md).
