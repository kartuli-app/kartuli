---
section: Tech/Development/Documentation
title: README Standards
description: Standard structure for READMEs in apps, packages, and tools.
type: standard
---

# README Standards

READMEs live next to code (in apps, packages, and tools). They give a quick start and point to the docs site for full detail.

This standard defines a common structure so every app, package, and tool README is easy to scan and consistent.

## Standard sections

Every app, package, and tool README should include these sections, in this order.

### Overview

- One or two sentences: what this app/package/tool is and what it’s for.

### Prerequisites

- What’s required to run or develop (Node/pnpm versions, env, accounts).
- Short list or one line; link to detailed setup in docs if needed.

### Scripts

- Main commands (e.g. `pnpm dev`, `pnpm build`, `pnpm test`) with a one-line description each.
- Table or bullets. Optional: “More scripts: see `package.json`” or a link to docs.

### Local development

- How to run it locally (e.g. `pnpm dev`, port, env vars).
- One or two short paragraphs or bullets.
- Link to full “Development” or “Contributing” in docs if you have it.

### More

- “For architecture, deployment, and contributing: [link to docs site section for this app/package/tool].”
- Keeps the README short and points to the single source of truth.

## Optional sections

Add other sections when they’re relevant for that app, package, or tool. Examples:

- **Configuration** — Non-trivial config (env vars, config files); otherwise “see docs.”
- **Testing** — More than “run `pnpm test`” (e.g. E2E, coverage); otherwise fold into Scripts.
- **Related** — Links to sibling apps/packages/tools or to the repo root README.

The five standard sections are the shared skeleton; extra sections are allowed and encouraged when they add value.

## References

### Related Docs

- [Documentation Standards](./documentation-standards.md)
- [Documentation Hub](./index.md)
- [Web Docs Client Hub](../../../tools/web-docs-client/index.md)
