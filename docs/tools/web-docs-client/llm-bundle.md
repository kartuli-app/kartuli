---
section: Tools/Web Docs Client
title: LLM Bundle
description: Purpose, generation, copy step, and URL for the links-only docs index for AI consumption.
type: standard
---

# LLM Bundle

## Purpose

The LLM bundle (`kartuli-llm.txt`) is a **links-only index** of the documentation.

It is for AI tools and agents: they fetch this file to discover doc pages, then load only what they need. 

It is not a full-content dump, it lists sections and links with optional short descriptions from frontmatter.

## Generation

**Script**: `scripts/generate-llm-bundle.js`. Uses the same `processDocs()` as the VitePress config so sections and ordering stay in sync.

- **Output path**: `docs/kartuli-llm.txt` (repo root `docs/`).
- **Content**: Markdown header, generation timestamp, one block per section with links. Links use the production site base URL.
- **Section order**: Section-order map aligned with nav so bundle order matches the site.
- **Excluding a doc**: Add `llm: skip` in frontmatter or body. The script also supports `excludedPathPatterns` for path-based exclusions.

## Copy step

VitePress does not emit `docs/kartuli-llm.txt` into the build. To serve the bundle at a stable URL we **copy** it into the build.

- **Script**: `scripts/copy-llm-bundle.js`. Reads `docs/kartuli-llm.txt`, writes to `tools/web-docs-client/.vitepress/dist/assets/kartuli-llm.txt`.
- **When it runs**: **postbuild** after `vitepress build` (see `tools/web-docs-client/package.json`). Every production or local build places the bundle in built assets.
- **CI**: Generate job creates the bundle and uploads it as an artifact. Build job downloads it into `docs/`, runs docs build (postbuild runs the copy), then deploys dist that contains the bundle.

## URL and linking

- **Served path**: `/kartuli/assets/kartuli-llm.txt` (base path + assets).
- **In the site**: VitePress config adds an **llms.txt** entry in navbar and sidebar pointing to this URL so users and tools can open the bundle from the live site.

## References

### Related Docs

- [Web Docs Client Hub](./index.md)
- [VitePress Implementation](./vitepress-implementation.md)
- [Scripts](./scripts.md)
- [CI/CD Production](./ci-cd-production.md)
