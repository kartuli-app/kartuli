---
description: Local dependency diagram commands, Graphviz requirement and generated outputs.
status: implemented
intent: reference
---

# Diagram Generator

`tools/diagram-generator/package.json` provides `game-client`, `backoffice-client` and `monorepo` commands; run all with `pnpm run diagrams:all`. Dependency-cruiser reads the configurations under `tools/diagram-generator/config` and emits DOT or Mermaid. Graphviz's `dot` executable is required for SVG and HTML outputs; it is an external system dependency, not an npm package.

Outputs are written under `diagrams/output/current/` as SVG, Mermaid and HTML. The wrapper script turns SVG into a standalone HTML view. The staging orchestrator contains a commented-out diagram commit job, so automatic refresh is not currently enabled.

This tool is distinct from the [Web Docs diagram plugin](./03-web-docs-client.md). Regenerate dependency diagrams when useful for an architecture review, without treating generated output as the canonical architecture specification.
