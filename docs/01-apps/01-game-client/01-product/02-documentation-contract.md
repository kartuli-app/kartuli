---
description: Documentation ownership rules and writing conventions for the game-client product docs.
---

# Documentation Contract

This document defines how the product documentation set is organized and how the files relate to each other.

## Purpose

The product docs are implementation-facing source of truth for developers and AI assistants working inside this repository.

The documentation set is designed so a task can be completed by reading only the documents that own that task's domain.

## Authority model

A canonical rule should live in one owning document.

Other documents may mention that rule briefly when needed for orientation, but they should link back to the owner instead of restating the full specification.

`DESIGN.md` is the exception: it is an AI-facing helper summary, not a source-of-truth document, and duplication there is acceptable when useful.

## Owning documents

- [Product Overview](./03-product-overview.md)
  - product definition, promise, principles, brand, mascot, and tone
- [Core](./05-core.md)
  - glossary, modeling hierarchy, localization, learning-content model, activity, and mastery
- [Client Preferences](./09-client-preferences.md)
  - client-side preference registry and shared preference-resolution model
- [Audio and Sound](./10-audio-and-sound.md)
  - sound behavior, muted behavior, and listening rounds
- [Privacy and Analytics](./11-privacy-and-analytics.md)
  - storage, privacy consent, and analytics behavior
- [Routing and Flows](./06-routing-and-flows.md)
  - information architecture, route catalog, navigation, and high-level flows
- [Screens](./07-screens.md)
  - route screens and Play flow screens
- [Ui System](./08-ui-system.md)
  - reusable UI rules, global UI surfaces, responsive behavior, and component families
- [Roadmap and Decisions](./04-roadmap-and-decisions.md)
  - roadmap, deferred scope, candidate work, and reduced decision history

## Boundary rules

- Route patterns, route metadata, navigation targets, and route-state families belong in [Routing and Flows](./06-routing-and-flows.md).
- Screen roles, layout regions, actions, content, and screen-specific open questions belong in [Screens](./07-screens.md).
- Reusable visual and component-family rules belong in [Ui System](./08-ui-system.md).
- Global sound behavior belongs in [Audio and Sound](./10-audio-and-sound.md).
- Global privacy, storage, and analytics behavior belongs in [Privacy and Analytics](./11-privacy-and-analytics.md).
- The list of client-side preferences and the shared resolution model belong in [Client Preferences](./09-client-preferences.md).
- Future scope, deferred work, candidate routes, and historical decision context belong in [Roadmap and Decisions](./04-roadmap-and-decisions.md).

## Open questions

Open questions should live in the document that owns the unresolved decision.

Examples:

- a route question belongs in [Routing and Flows](./06-routing-and-flows.md)
- a screen question belongs in [Screens](./07-screens.md)
- a global UI-surface question belongs in [Ui System](./08-ui-system.md)

Do not collect open questions in one generic appendix.

## Planning language

Roadmap, deferred scope, candidate work, and other time-scoped planning language belong in [Roadmap and Decisions](./04-roadmap-and-decisions.md).

The source-of-truth docs should read as product specifications, not backlog notes.

## Writing conventions

- Use route patterns such as `/{locale}/app/learn` instead of framework file paths.
- Use product terminology from [Core](./05-core.md).
- Prefer direct, declarative language over status labeling.
- If a rule depends on another doc, summarize it briefly and link to the owner instead of duplicating the full rule.

## AI-facing helper docs

`DESIGN.md` has a different audience and purpose than the source-of-truth docs.

It may summarize or duplicate parts of [Ui System](./08-ui-system.md) when that helps AI assistants work effectively.

