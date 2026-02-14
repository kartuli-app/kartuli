---
section: Tech/Development/Documentation
title: Documentation Standards
type: standard
---

# Documentation Standards

## Definitions

- **Root document**: The global landing page at `docs/index.md`.
- **Hub document**: A section landing page (`index.md`) that groups documents and references.
- **Standard document**: A non-hub, non-CI/CD document that captures operational guidance or specifications.
- **CI/CD document**: A pipeline-focused document with fixed operational sections.
- **Provider document**: A service-focused document for providers and integrations, including operational and cost context.
- **Technical Backlog**: A listing section used in hubs and the root backlog index.
- **Technical Backlog Tasks**: TODO definitions owned by specific documents.

## Frontmatter

All `docs` files must define:

```yaml
---
section: Tech/Development/Documentation
title: Documentation Standards
type: standard
---
```

Required frontmatter fields:
- `section`: Navigation grouping path for VitePress.
- `title`: Display name in navigation and page header.
- `type`: Document type. Allowed values:
  - `root`
  - `hub`
  - `standard`
  - `ci-cd`
  - `provider`

## Document Types

### Root document (`docs/index.md`)

- `## Overview` - Lightweight landing context for documentation consumers.
- `## References` - Curated entry links and related material for fast navigation.
  - `### Start Here` (or `### Quick Links`) - Primary entry links for docs consumers.
  - `### Related Docs` (optional) - Additional cross-links that support the landing context.

### Hub document (`index.md`)

- `## Overview` - Brief context for what the hub covers.
- `## References` - Navigation and cross-links for the hub.
  - `### Documents in This Hub` - Local navigation to child docs in the same folder.
  - `### Related Docs` - Cross-folder links to connected domains.
  - `### Technical Backlog` - Listing of relevant task titles with links to task definitions.

### Standard document

- Domain content sections using `##` as needed - Main operational guidance for the topic.
- `## References` - Supporting links and optional owned backlog tasks.
  - `### Related Docs` - Cross-references for dependent or adjacent topics.
- `### Technical Backlog Tasks` under `## References` (optional) - Canonical task definitions owned by this document.

### CI/CD document

- `## Triggers` - Events that start the pipeline.
- `## Pipeline Steps` - Ordered actions performed by the pipeline.
- `## Validation Gates` - Required checks that must pass.
- `## Failure Handling` - Expected response for failures (triage, retry, rollback path).
- `## References` - Supporting links and optional owned backlog tasks.
  - `### Related Docs` - Links to hubs, providers, and adjacent CI/CD docs.
- `### Technical Backlog Tasks` under `## References` (optional) - Canonical pipeline improvement tasks.

### Provider document

- `## Service Role` - What capability this provider delivers in Kartuli.
- `## Current Usage` - Where and how this provider is currently used.
- `## Limits and Cost Model` - Free-tier limits, thresholds, and cost implications.
- `## Operational Notes` - Maintenance concerns, incidents, and escalation hints.
- `## References` - Supporting links and optional owned backlog tasks.
  - `### Related Docs` - Links to consuming hubs, tools, apps, or architecture docs.
- `### Technical Backlog Tasks` under `## References` (optional) - Canonical provider-related improvement tasks.

## Backlog conventions

#### Ownership model

- `### Technical Backlog` is for listings only (hub and root backlog index).
- `### Technical Backlog Tasks` contains task definitions (owner docs).
- Listings must link to task definitions; task details should not be duplicated.
- Documentation backlog is a temporary TODO queue.
- Move accepted items to project/issues for long-term tracking, and remove items from docs when done or discarded.

#### Heading levels

- Use `##` for primary content blocks.
- Use `###` for sections inside `## References`.
- Use `####` for individual technical backlog task definitions.

#### Technical Backlog format (`### Technical Backlog`)

Allowed locations:
- Hub documents (`index.md`)
- Root backlog index document

Format rules:
- List entries only (no long task details).
- Every entry must include a task title.
- Every entry must link to the task definition location.
- In root backlog index documents, group entries by source hub/domain.
- Use hub/domain headings for grouping (for example, `### Documentation Hub`, `### Web Docs Client Hub`).

Entry template:
- `<Short title> -> <link to task definition>`

#### Technical Backlog Tasks format (`### Technical Backlog Tasks`)

Allowed locations:
- Any owner document

Format rules:
- Task is defined once in its owner document.
- Do not duplicate the full task body in backlog listings.
- Task IDs are not required.

Task template:
```
#### <Task title>

- **What**: <what should be implemented>
- **Why**: <why this matters>
- **Details**: <constraints, assumptions, acceptance notes>
- **Status**: Proposed | Planned | In Progress | Blocked | Done
```

Example:
```md
#### Add docs root backlog index

- **What**: Create a root-level technical backlog index page for centralized task discovery.
- **Why**: Improve visibility of cross-domain technical improvements.
- **Details**: Keep only summary entries in the index and link to task definitions in owner docs.
- **Status**: Proposed
```

## References

### Related Docs

- [Documentation Hub](./index.md)
- [Documentation Maintenance Workflow](./maintenance-workflow.md)
