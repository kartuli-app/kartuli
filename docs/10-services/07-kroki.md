---
description: Observed diagram service dependency, committed timeout asset and unresolved adoption decision.
status: implemented
intent: reference
---

# Kroki

The Web Docs VitePress configuration enables `vitepress-plugin-diagrams` and specifies its output/public paths without an explicit service endpoint. The committed file `tools/web-docs-client/public/diagrams/mermaid-01-product-overview-33-13e5535a422892af7eebf559fc7a42fc.svg` contains HTML with a `kroki.io | 504: Gateway time-out` title. This is evidence of an external rendering request/failure, not a valid diagram.

The documentation-foundation build also attempted to resolve `kroki.io` and failed with `EAI_AGAIN` in the restricted execution environment. This confirms a build-time external dependency; it does not establish general service availability.

## Manual verification required

The installed plugin uses `https://kroki.io` when no endpoint override is supplied and POSTs diagram source for rendering. Confirm whether use of that public service is intentional, which diagram source is transmitted, and whether a local renderer should replace it. Do not assume service availability, privacy guarantees or an account mapping. Pipeline cleanup remains follow-up work; this foundation does not silently replace the renderer.

[Web Docs Client](../03-tools/03-web-docs-client.md) owns this pipeline. The [Diagram Generator](../03-tools/04-diagram-generator.md) is a separate dependency-cruiser/Graphviz tool.
