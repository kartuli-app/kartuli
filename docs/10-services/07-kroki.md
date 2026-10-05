---
description: Diagram rendering dependency, cached-asset checks and unresolved public-service adoption decision.
status: implemented
intent: reference
---

# Kroki

The Web Docs VitePress configuration enables `vitepress-plugin-diagrams` and specifies its output/public paths without an explicit service endpoint. The repository currently contains both valid rendered SVGs and older `.svg` files whose content is a Kroki 504 HTML response. The October 2026 documentation build completed and generated valid assets, so the older response files are cache history rather than a current build blocker.

The mixed cache still proves that rendering can cross an external service boundary and that an `.svg` extension alone is not a validity check. It does not establish Kroki's general availability or define an accepted provider policy.

## Manual verification required

The installed plugin uses `https://kroki.io` when no endpoint override is supplied and POSTs diagram source for rendering. Confirm whether use of that public service is intentional, which diagram source is transmitted, and whether a local renderer should replace it. Do not assume service availability, privacy guarantees or an account mapping. Pipeline cleanup remains follow-up work; this foundation does not silently replace the renderer.

[Web Docs Client](../03-tools/03-web-docs-client.md) owns this pipeline. The [Diagram Generator](../03-tools/04-diagram-generator.md) is a separate dependency-cruiser/Graphviz tool.

## Build behavior and operational diagnosis

The installed diagram plugin derives filenames from diagram type/content and document position. Moving surrounding Markdown can produce a new asset path and a fresh request even when the diagram text is unchanged. Existing files may be reused, including the two currently committed invalid HTML error responses saved as SVG. Treat those files as historical evidence, not successful render output.

When inspecting a failure, check whether it is DNS/network access, an HTTP error, a placeholder or an invalid cached file. Verify the asset begins with actual SVG content and renders; file extension and a successful build are insufficient. Do not treat a copied historical error asset as a repaired diagram.

The diagram source is sent to the rendering endpoint. Until public-service use is explicitly accepted or replaced, do not put secrets/private operational details in diagram text. A renderer replacement or cache/error-handling fix should include its own implementation and tests; this reference records current behavior without inventing an availability guarantee.
