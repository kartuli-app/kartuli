---
description: Kroki request and cache behavior, actual diagram error assets and a repeatable rendering audit.
status: implemented
intent: reference
---

# Kroki

The Web Docs Client sends supported diagram fences to the public Kroki renderer through
`vitepress-plugin-diagrams`. This runs while preparing documentation, not in the learner application.
The dependency-cruiser/Graphviz [Diagram Generator](../03-tools/04-diagram-generator.md) is a separate
local pipeline.

## Actual configuration and request flow

`tools/web-docs-client/.vitepress/config.mts` calls `configureDiagramsPlugin` inside the Markdown
configuration. It sets an absolute `diagramsDir` to `tools/web-docs-client/public/diagrams` and
`publicPath` to `/kartuli/diagrams`. It does not set `krokiServerUrl`.

The installed plugin **1.3.1**, inspected on **2026-10-06**, defaults that endpoint to
`https://kroki.io`. Its configured path:

1. Recognizes a supported fence and derives an SVG filename from type, content hash, and explicit ID
   or document name/position.
2. Reuses an existing file unless it contains the plugin's `vpd-placeholder` marker.
3. For a missing/placeholder file, writes a placeholder and starts an asynchronous POST to
   `https://kroki.io/<diagram-type>`.
4. Sends the fence source as `text/plain`, requesting `image/svg+xml`.
5. Reads response text and writes it to the SVG path without checking HTTP status or validating SVG
   content in this configured renderer.
6. Emits an image URL for the page; VitePress copies public assets into the site.

The package also exports a separate build-time integration that checks HTTP success and waits for
queued requests. Kartuli does not configure that integration. Do not infer those safeguards from the
presence of the dependency. Source evidence is the installed package's `dist/index.js`, especially
the configured renderer near its placeholder/fetch path.

## Cached assets and build success

The committed cache includes historical HTML error responses and SVG error banners. A successful
build proves neither a fresh request nor a correct diagram. Even an SVG-format check can accept an
error banner. Match the rendered page's image URL to the cached asset and inspect its actual content;
an unused historical file is different from a currently displayed error.

## Audit and recovery workflow

```bash
git ls-files tools/web-docs-client/public/diagrams
rg -n 'Error 500|504|vpd-placeholder|<!DOCTYPE html' tools/web-docs-client/public/diagrams
rg -n 'diagrams/.*svg' tools/web-docs-client/.vitepress/dist/01-apps
pnpm run c:build:web-docs-client
```

Run the rendered-reference search after a build. Match a page's image URL to the exact source/public
asset and open the actual figure. Separate an unused historical cache entry from a currently displayed
error. The search is a useful detector for known failures, not a general SVG validator.

For a repair, identify the fence and exact failed asset first. Preserve a recoverable copy, regenerate
only that target under the approved renderer policy, then verify both source and built assets and the
browser-rendered figure. Moving surrounding Markdown can change the filename and provoke a new
request even when the diagram itself is unchanged. Do not mass-delete the cache to diagnose one error:
that changes which content is sent externally and can introduce unrelated failures.

| Failure | Evidence to inspect |
| --- | --- |
| DNS/connection error | Build log and endpoint connectivity |
| HTML in an SVG file | HTTP error cached without response validation |
| SVG error banner | Renderer returned an error document; XML validity is insufficient |
| Placeholder persists | Request completion, rejected network operation and copied asset timing |
| Build succeeds but figure is stale | Cached path, hash/position and actual dist image reference |

## Service boundary and unresolved decisions

The diagram source crosses to the public renderer; no authentication secret or self-hosted endpoint is
configured. Public-service retention, availability and accepted source-data policy are not established
by local configuration or GitHub checks.

A decision is still needed on public Kroki versus a local/self-hosted renderer, response validation,
request completion and cache repair. Those changes require implementation and tests. This guide
documents the existing behavior and errors without replacing the pipeline.
[Web Docs Client](../03-tools/03-web-docs-client.md) owns build/index/preview operations.
