---
section: Tech/Development/Documentation
title: Documentation Maintenance Workflow
type: standard
---

# Documentation Maintenance Workflow

## Change Workflow

When creating or updating documentation:
- Ensure frontmatter is present and follows the standard.
- Ensure the document is linked from the appropriate hub section when relevant.
- Ensure related cross-domain links are added where appropriate.
- Ensure backlog entries are linked to task definitions without duplicating task bodies.

## Relationship Maintenance

Minimum relationship checks:
- New document appears in the correct hub under `### Documents in This Hub`.
- `### Related Docs` includes relevant cross-domain references.
- If a task is added in an owner document, hubs/reference indexes list it under `### Technical Backlog`.

## References

### Related Docs

- [Documentation Hub](./index.md)
- [Documentation Standards](./documentation-standards.md)

### Technical Backlog Tasks

#### Improve documentation home page content and layout

- **What**: Define and implement a more useful landing page structure for `docs/index.md`.
- **Why**: Current content duplicates sidebar navigation and provides limited onboarding value.
- **Details**: Focus on concise introduction, practical quick links, and migration-context clarity.
- **Status**: Proposed

#### Create documentation maintenance skill

- **What**: Define and implement an AI skill that validates and updates documentation relationships consistently.
- **Why**: Reduce manual misses when adding/updating docs and improve consistency over time.
- **Details**: Keep implementation scope lightweight at first and expand behavior iteratively.
- **Status**: Proposed

#### Add automated documentation validation checks

- **What**: Define and implement automated checks for frontmatter, section requirements, and key relationship rules.
- **Why**: Provide deterministic guardrails independent of manual reviews.
- **Details**: Start with basic checks and expand as standards mature.
- **Status**: Proposed
