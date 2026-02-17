---
section: Tech/Development/Documentation
title: Backlog Conventions
description: Backlog listing and backlog tasks format, ownership, and optional Type/Area.
type: standard
---

# Backlog Conventions

This document defines how backlogs work: where listings live, how tasks are defined, and how to tag which backlog (or area) a task belongs to. 

It is referenced from [Documentation Standards](./documentation-standards.md). 

It may later live under a project-management area.

**Generic format:** Backlog documents contain a listing; owner docs define tasks under **`### Backlog Tasks`**. 

Which backlog a task belongs to is determined by which backlog doc links to it (and optionally by **Type** or **Area** on the task). 

Adding a new backlog (e.g. marketing) requires only a new backlog doc; no change to Documentation Standards or to this task format.

## Current backlogs

- **Product backlog** (`backlog/product-backlog.md`): Roadmap, features, user-facing work, growth, content, marketing, operations. "What we're doing for the product and the project."
- **Technical backlog** (`backlog/technical-backlog.md`): Implementation, infrastructure, tooling, docs, CI/CD. "How we build and run it."

Tasks like "Create TikTok account" or "Generate high quality resources for mascot images" belong in the **product** backlog (they advance the product or brand). 

You may add an optional **Area** in the task (e.g. Marketing, Content) for clarity; no separate backlog doc is required.

## Ownership model

- **Canonical backlog listings** live only in backlog documents (e.g. `backlog/product-backlog.md`, `backlog/technical-backlog.md`). Hubs do **not** include a backlog listing section.
- **Task definitions** live in owner documents under **`### Backlog Tasks`**. Listings in the central backlog doc link to these; task details are not duplicated in the listing.
- Listings must link to task definitions; task details should not be duplicated.
- Documentation backlog is a temporary TODO queue. Move accepted items to project/issues for long-term tracking, and remove items from docs when done or discarded.

## Listing format (backlog docs)

Each backlog document has a listing section. The section can be named e.g. **`## Product Backlog`**, **`## Technical Backlog`**, **`## Marketing Backlog`**, or **`## Backlog`**, same format for all.

Format rules:
- List entries only (no long task details).
- Every entry must include a task title.
- Every entry must link to the task definition location (in the owner doc).
- Use whatever grouping fits (e.g. by hub/domain in technical backlog; by area or priority in product backlog).

Entry template:
- `<Short title> — <link to task definition>`

## Task definitions (owner docs)

Task definitions live in owner documents under **`### Backlog Tasks`** (one optional subsection). 

Tasks listed in a given backlog doc (product, technical, or other) are linked from that doc; use optional **Type** or **Area** when a document has tasks for more than one backlog.

Allowed locations: Any owner document (standard, CI/CD, provider, hub, etc.), except backlog documents.

Format rules:
- Task is defined once in its owner document.
- Do not duplicate the full task body in backlog listings.
- Task IDs are not required.
- **Optional**: **Type**: `product` | `technical` | … when the doc owns tasks for more than one backlog. **Optional**: **Area**: e.g. `Marketing`, `Content`, `Operations` to group without adding new backlog docs.

Task template:
```md
#### <Task title>

- **What**: <what should be implemented>
- **Why**: <why this matters>
- **Details**: <constraints, assumptions, acceptance notes>
- **Status**: Proposed | Planned | In Progress | Blocked | Done
- **Type**: product | technical | … (optional)
- **Area**: Marketing | Content | Operations | … (optional)
```

Example (technical):
```md
#### Add docs root backlog index

- **What**: Create a root-level technical backlog index page for centralized task discovery.
- **Why**: Improve visibility of cross-domain technical improvements.
- **Details**: Keep only summary entries in the index and link to task definitions in owner docs.
- **Status**: Proposed
```

Example (product, with optional Area):
```md
#### Create TikTok account

- **What**: Set up and verify the project TikTok account for outreach.
- **Why**: Reach learners where they are.
- **Details**: Follow org branding; link in app and docs when ready.
- **Status**: Proposed
- **Area**: Marketing
```

## Adding a new backlog

To add a new backlog (e.g. marketing): create a new backlog document (e.g. `backlog/marketing-backlog.md`) with an optional `## Overview` and a listing section (e.g. `## Marketing Backlog`). 

Link to task definitions in owner docs. 

No change to Documentation Standards or to the task format (`### Backlog Tasks`, optional Type/Area).

## References

### Related Docs

- [Documentation Standards](./documentation-standards.md)
- [Documentation Hub](./index.md)
- [Product Backlog](../../../backlog/product-backlog.md)
- [Technical Backlog](../../../backlog/technical-backlog.md)
