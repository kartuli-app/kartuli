---
description: Lightweight frontmatter, implementation status, writing intent and source-verification rules.
status: implemented
intent: reference
---

# Writing Guide

## Required page shape

Every Markdown page needs a nonempty, one-line `description` in frontmatter for the docs processor/LLM index. New pages also use lightweight `status` and `intent` fields:

```yaml
---
description: Current storage behavior and known limitations in Kartuli.
status: implemented
intent: reference
---
```

Use one H1 and stable relative Markdown links. Two-digit directory/file prefixes control order and generated labels; `index.md` is a hub. Avoid changing existing numbered paths merely to renumber the tree. The processor currently consumes `description`; `status` and `intent` are writing conventions, not a schema or automatic status badge. Put important status distinctions in visible prose as well.

## Lifecycle

| Status | Meaning |
| --- | --- |
| `implemented` | Current behavior with source/config evidence; does not certify provider state |
| `planned` | Intended behavior or committed direction, not an implementation claim |
| `evaluating` | Option under consideration; no adoption decision |
| `deprecated` | Retained for migration/history; point to the replacement and explain limits |

Mixed pages use explicit section/table statuses. An implemented overview can list planned gaps. A planned product spec can contain elements already shipped; link to the current app inventory and call out divergence. Include the status in descriptions when agents must see it before opening a page. Do not label unverified external configuration implemented simply because a provider is named in a workflow.

## Writing intent

| Intent | Question |
| --- | --- |
| `specification` | What must be true / what behavior is intended? |
| `architecture` | How and why is Kartuli structured this way? |
| `runbook` | How is an operational task performed and checked? |
| `reference` | What exists and where is its configuration? |

Write about Kartuli usage, constraints, consumers and source/config locations. Link upstream docs for APIs/tutorials rather than copying them. Name the evidence; distinguish source observations, desired policy and unknown provider settings. For manual verification, state exactly which setting needs checking and never include secret values.

## Before review

Check canonical ownership, descriptions, visible status, relative links and the generated agent index. Run `pnpm run c:build:web-docs-client` and `pnpm run validate:all`; inspect the built site/index as described in [Web Docs Client](../../03-tools/03-web-docs-client.md). Do not commit generated `kartuli-llm.txt` or unrelated diagram/cache changes. A build passing with an existing invalid diagram asset does not mean that diagram has been repaired.

## Authoring templates and depth

Repository-only templates live under `documentation-templates/` (outside the published source tree). Choose technology/library, service, quality or runbook guidance. They are prompts to answer useful questions, not a schema requiring empty sections. Replace template descriptions/headings before publishing.

A technology/library page should enable a maintainer to locate configuration, understand consumer boundaries, make a typical change and validate it. Catalog tables are discovery aids; they do not replace the dedicated guide. A service page must distinguish source-controlled integration from provider-console state and explain how to investigate failures without revealing credentials.

Update the command/dependency inventories when manifests change. Use actual utility names and command behavior from source; do not repeat a misleading comment simply because it is already written down. H1 headings become navigation labels, while `index.md` is represented by the clickable section heading rather than an “Index” child.

Use the [coverage map](./02-coverage-map.md) when a change adds a workspace, architectural dependency,
cross-cutting configuration, workflow or implementation data boundary. The map identifies the
canonical owner and intentional gaps; it is not a substitute for the substantive guide.

The templates are not part of the live site or `kartuli-llm.txt`. Maintain their conventions here so contributors can discover them from published docs without publishing the template placeholders.
