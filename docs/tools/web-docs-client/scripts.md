---
section: Tools/Web Docs Client
title: Scripts
description: Docs processor, LLM bundle generation, and copy script; when each runs and what it does.
type: standard
---

# Scripts

All scripts live under `tools/web-docs-client/scripts/`. Node.js, run in repo context (docs path relative to repo).

## docs-processor.js

**Role**

- Single source of truth for scanning `docs/` and building sectioned navigation.
- Used by VitePress config and LLM bundle generator so nav and bundle stay in sync.

**What it does**

- Recursively scans `docs/`, reads each `.md`, parses frontmatter (`section`, `title`, `type`, `date`, `description`).
- Builds a map of sections to items; if `section` has a slash (e.g. `Tech/Development/Documentation`), first segment = top-level, rest = nested group.
- Exports `mergedSections` (for nav/sidebar) and `orderedDocuments` (for LLM bundle).
- Provides link-fix and markdown-processing helpers (e.g. fix broken links, strip frontmatter).

**When it runs**

- Whenever the VitePress config is loaded (dev or build).
- When `generate-llm-bundle.js` runs.
- Not run as a standalone script by the user.

## generate-llm-bundle.js

**Role**

- Produces the links-only LLM index file.

**What it does**

- Calls `processDocs()`, builds a markdown bundle: one block per section, links (and optional descriptions) per doc.
- Writes to `docs/kartuli-llm.txt`.
- Respects `llm: skip` and optional path exclusions; uses same section ordering as the site.

**When it runs**

- Manually: `node tools/web-docs-client/scripts/generate-llm-bundle.js`.
- In CI: both staging and production workflows run it before build.
- Local dev does not run it automatically; bundle may be stale until you run it or run a build.

## copy-llm-bundle.js

**Role**

- Puts the generated bundle into the built site so it can be served at `/kartuli/assets/kartuli-llm.txt`.

**What it does**

- Reads `docs/kartuli-llm.txt`, writes to `tools/web-docs-client/.vitepress/dist/assets/kartuli-llm.txt`.
- Creates the assets directory if needed.

**When it runs**

- As **postbuild** in `tools/web-docs-client/package.json`, automatically after `vitepress build`.
- In CI: build job runs after bundle is generated (and in production, after artifact download), so deployed dist includes the bundle.

## Summary

| Script                 | Run by                    | Purpose                                      |
|------------------------|---------------------------|----------------------------------------------|
| docs-processor.js      | config + generate script  | Scan docs, build sections and ordered list   |
| generate-llm-bundle.js| Manual or CI             | Write `docs/kartuli-llm.txt`                 |
| copy-llm-bundle.js     | postbuild after build     | Copy bundle into dist/assets for the site    |

## References

### Related Docs

- [Web Docs Client Hub](./index.md)
- [VitePress Implementation](./vitepress-implementation.md)
- [LLM Bundle](./llm-bundle.md)
