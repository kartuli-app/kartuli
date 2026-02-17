---
section: Tools/Web Docs Client
title: VitePress Implementation
description: How the docs site builds navigation from frontmatter, section ordering, and dev caveats.
type: standard
---

# VitePress Implementation

## How navigation is built

The site uses a shared script to scan `docs/` and build navigation from frontmatter.

At **config load time** VitePress runs `processDocs()` from `scripts/docs-processor.js`. That produces merged sections (standalone items and nested groups). The config then builds the **navbar** and **sidebar** from that data.

There is no hand-written sidebar. Everything is driven by `section`, `title`, and optional `date` / `type` in each doc’s frontmatter.

## Sections and grouping

- **Section**: Each doc’s `section` (e.g. `Tech/Development/Documentation`) places it in a top-level section and optionally in a nested group.
- **Top-level**: First path segment = top-level section (e.g. `Tech`). Section without a slash (e.g. `Backlog`) has only standalone items.
- **Nested**: If `section` contains a slash, the part after the first segment is a nested group (e.g. `Development/Documentation`). Sidebar shows these as collapsed groups under the top-level section.
- **Standalone**: Items whose `section` has no slash (e.g. `Product`, `Backlog`) appear as a flat list under that section.

## Ordering

- **Top-level sections**: Fixed `sectionOrder` map in config (e.g. Product, Tech, Providers, Apps, Tools, Packages, Backlog). Unknown sections sort after, then alphabetically.
- **Items within a section**: Hub/index first, then by `date` (if present), then by `title` alphabetically.
- **Nested groups**: Sorted alphabetically by sub-section name.

## Navbar and sidebar

- **Navbar**: One entry per top-level section (except Home, Start Here, Gamarjoba), each linking to the first item in that section. Plus an **llms.txt** entry to the LLM bundle URL.
- **Sidebar**: One block per top-level section; each has standalone items plus nested groups (with sub-items). Sections collapsed by default. **llms.txt** appended as a direct link at the end.
- **Base path**: Site served under `/kartuli/` (e.g. GitHub Pages repo deployment).

## Build invocation (Turbo)

The package `build` script in `tools/web-docs-client/package.json` runs **from repo root**: `cd ../.. && pnpm exec vitepress build tools/web-docs-client`. That matches the root script `docs:build` (`vitepress build tools/web-docs-client`).

**Why:** When Turbo runs the task, it executes the package script from the package directory. Running `vitepress build` from inside the package makes Vite resolve modules from each `.md` path (under `../../docs/`). Those paths are outside the package, so resolution can fail (e.g. `vue` / `vue/server-renderer`). Running VitePress from root uses root’s `node_modules` and resolution succeeds. So the script explicitly changes to root and runs the same command as `docs:build`.

**Summary:** Use `pnpm run c:build:docs` (Turbo) or `pnpm run docs:build` (no Turbo); both end up running VitePress from root. Do not change the package build script to a plain `vitepress build` unless the tooling no longer has this resolution issue.

## Development caveat

Navigation is computed **once** when the VitePress config is loaded.

When you add a new doc or change frontmatter that affects sections, hot reload may update page content but **does not** reload the config, so navbar and sidebar do not update. 

Restart the dev server (`pnpm docs:dev` or `pnpm run c:dev:docs`) to refresh navigation after adding or moving docs.

## References

### Related Docs

- [Web Docs Client Hub](./index.md)
- [LLM Bundle](./llm-bundle.md)
- [Scripts](./scripts.md)
- [Documentation Standards](../../tech/development/documentation/documentation-standards.md)
