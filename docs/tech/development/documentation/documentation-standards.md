---
section: Tech/Development/Documentation
title: Documentation Standards
description: Frontmatter, document types, and references to Backlog Conventions for Kartuli docs.
type: standard
---

# Documentation Standards

## Definitions

- **Root document**: The global landing page at `docs/index.md`.
- **Hub document**: A section landing page (`index.md`) with a required Overview and optional domain sections; it may list documents in the hub. 
  - It does not contain a backlog listing (listings live only in backlog documents).
- **Standard document**: A non-hub, non-CI/CD document that captures operational guidance or specifications.
- **CI/CD document**: A pipeline-focused document with fixed operational sections.
- **Provider document**: A service-focused document for providers and integrations, including operational and cost context.
- **Backlog document**: A document whose primary content is a backlog listing (with optional short context). 
  - Canonical listings live in backlog documents
  - Task definitions live in owner docs under `### Backlog Tasks`. 
  - See [Backlog Conventions](./backlog-conventions.md).

## Frontmatter

Frontmatter is the YAML block at the top of each doc. It drives navigation, section grouping, and the LLM bundle index. 

The [Web Docs Client](../../../tools/web-docs-client/) hub describes how the docs site and bundle generator use these fields.

All `docs` files must define:

```yaml
---
section: Tech/Development/Documentation
title: Documentation Standards
description: Frontmatter, document types, and references to Backlog Conventions for Kartuli docs.
type: standard
---
```

Required frontmatter fields (use this order: `section`, `title`, `description`, `type`):
- `section`: Navigation grouping path for VitePress.
- `title`: Display name in navigation and page header.
- `description`: Brief summary (1–2 sentences) of what the document covers.
- `type`: Document type. Allowed values:
  - `root`
  - `hub`
  - `standard`
  - `ci-cd`
  - `provider`
  - `backlog`

## Optional sections

Any document may include up to two optional *elements*: a **References** section and/or **backlog task definitions**.

### References

When present, the references section (`## References`) contains only:

- **Related Docs** (`### Related Docs`): Cross-links to other docs. Keep the set **minimal**: only link where a reader on this page would meaningfully need to open that doc.
  - Do **not** link Documentation Standards on every page; only link it from docs that are directly about documentation or conventions (e.g. Documentation Hub, Maintenance Workflow).
- **Providers** (`### Providers`): Links to provider docs (e.g. GitHub Actions, GitHub Pages).
  - Include **only when the page meaningfully references that provider**.

This keeps link maintenance low.

### Backlog tasks

Any document except a backlog document can define tasks under **`### Backlog Tasks`**. 

Those tasks are linked from the relevant central backlog (product, technical, or other). 

Which backlog a task belongs to is determined by which backlog doc links to it (and optionally by a **Type** or **Area** field on the task). 

Full structure, format, and ownership: [Backlog Conventions](./backlog-conventions.md).

## Document Types

### Root document (`docs/index.md`)

The root document has **no fixed format**. Unlike hub, standard, or CI/CD types, it is not bound to required sections or a prescribed structure. 

Use it as the site landing: welcome, project intro, and whatever helps people (and AIs) orient and navigate.

**Current use**: Brief “what is this project” (e.g. What is kartuli.app), how to use the documentation (sidebar/menu, search, section overview), a short “For AIs” note with a link to the llms.txt index, and optional Quick links to key docs (e.g. product overview, technical documentation). 

The exact headings and blocks can evolve; the goal is a flexible landing page.

### Hub document (`index.md`)

- `## Overview` (required) — Brief context for what the hub covers.
- Optional: additional `##` domain sections (e.g. how to use this area, where to find things).
- Optional: a short list of "Documents in this hub" (or similar) for local navigation to child docs.

### Standard document

- Domain content sections using `##` as needed — Main operational guidance for the topic.

### CI/CD document

- `## Triggers` — Events that start the pipeline.
- `## Pipeline Steps` — Ordered actions performed by the pipeline.
- `## Validation Gates` — Required checks that must pass.
- `## Failure Handling` — Expected response for failures (triage, retry, rollback path).

### Provider document

- `## Service Role` — What capability this provider delivers in Kartuli.
- `## Current Usage` — Where and how this provider is currently used.
- `## Limits and Cost Model` — Free-tier limits, thresholds, and cost implications.
- `## Operational Notes` — Maintenance concerns, incidents, and escalation hints.

### Backlog document

**Purpose**: A dedicated page that lists backlog items (prioritized list, roadmap items, or task listings). 

It has an optional `## Overview` and a listing section (e.g. `## Backlog` or `## Product Backlog`, `## Technical Backlog`, `## Marketing Backlog`). 

Each entry includes a title and links to the task definition in the owner doc. 

Full rules: [Backlog Conventions](./backlog-conventions.md).

## Heading levels

- Use `##` for primary content blocks.
- Use `###` for subsections (e.g. inside optional **References**; or Related Docs, Providers).
- Use `####` for individual backlog task definitions (under `### Backlog Tasks`).

## References

### Related Docs

- [Backlog Conventions](./backlog-conventions.md)
- [Web Docs Client Hub](../../../tools/web-docs-client/index.md)
