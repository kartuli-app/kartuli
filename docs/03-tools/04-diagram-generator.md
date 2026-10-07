---
description: Local dependency diagram commands, Graphviz requirement and generated outputs.
status: implemented
intent: reference
---

# Diagram Generator

`tools/diagram-generator/package.json` provides `game-client`, `backoffice-client` and `monorepo` commands. Dependency-cruiser reads the configurations under `tools/diagram-generator/config` and emits DOT or Mermaid. The Next-app config excludes tests, generated output, external modules and the shared UI package from an app diagram; the monorepo config owns its separate dependency view. Read those rules before treating absence from a diagram as absence from source.

Graphviz's `dot` executable is required for SVG and HTML outputs; it is an external system dependency,
not an npm package. Verify it before running:

```bash
dot -V
pnpm --filter @kartuli/diagram-generator run game-client
pnpm run diagrams:all
```

Outputs are written under `diagrams/output/current/` as SVG, Mermaid and HTML. The wrapper script turns SVG into a standalone HTML view. The staging orchestrator contains a commented-out diagram commit job, so automatic refresh is not currently enabled.

Inspect the generated files rather than trusting a zero exit code alone: open SVG/HTML, confirm labels
are legible and review dependency-cruiser warnings. Generated diagrams are review aids and can omit
configured categories; source/config remains authoritative. Do not commit refreshed output unless the
task explicitly includes it and the diff is understood.

This tool is distinct from the [Web Docs diagram plugin](./03-web-docs-client.md). Regenerate dependency diagrams when useful for an architecture review, without treating generated output as the canonical architecture specification.
