---
description: Screen index, shared screen-pattern notes, and per-screen doc hub for the game client.
---

# Screens

This document is the index for route screens and Play flow screens.

Detailed per-screen implementation contracts live in dedicated docs under `./07-screens/`.

Reusable UI rules live in [Ui System](./08-ui-system.md).
Route-level navigation targets and route-state ownership live in [Routing and Flows](./06-routing-and-flows.md).
Component contracts live in [Component Catalog](./12-component-catalog.md).

## Purpose

This page now does three jobs:

- provides the screen-doc template entry point
- indexes dedicated screen docs
- keeps only the shared screen-pattern notes that span more than one dedicated screen doc

## Screen contract template

Use [Screen Template](./07-screens/_template.md) when creating or revising a dedicated per-screen doc.

Each dedicated screen doc should define:

- Summary
- Source links
- Layout regions
- Component inventory
- Screen states
- Actions
- Content
- Behavior notes
- Design notes
- Accessibility notes
- Not this
- Storybook coverage
- Open questions

## Migration status

All tracked screens and recovery route states now have dedicated docs.

This file should keep only short summaries and shared cross-screen notes.
Detailed behavior, states, actions, and open questions belong in the dedicated screen docs.

## Screen index

| Screen | Kind | Route / entry point | Detail doc | Migration status |
|---|---|---|---|---|
| Explore entry | Route screen | `/{locale}/app/learn/explore` | [Explore Entry Screen](./07-screens/explore-entry.md) | migrated |
| Alphabet catalog | Route screen | `/{locale}/app/learn/explore/alphabet` | [Alphabet Catalog Screen](./07-screens/alphabet-catalog.md) | migrated |
| Vocabulary catalog | Route screen | `/{locale}/app/learn/explore/vocabulary` | [Vocabulary Catalog Screen](./07-screens/vocabulary-catalog.md) | migrated |
| Study | Route screen | Study lesson/module routes | [Study Screen](./07-screens/study.md) | migrated |
| Play Lobby | Flow screen | Play route initial state | [Play Lobby Screen](./07-screens/play/lobby.md) | migrated |
| Game Round | Flow screen | Play active round state | [Game Round Screen](./07-screens/play/round.md) | migrated |
| Game Feedback | Flow screen | Play feedback state | [Game Feedback Screen](./07-screens/play/feedback.md) | migrated |
| Game Results | Flow screen | Play results state | [Game Results Screen](./07-screens/play/results.md) | migrated |
| Translit | Route screen | `/{locale}/app/translit` | [Translit Screen](./07-screens/translit.md) | migrated |
| Settings | Route screen | `/{locale}/app/settings` | [Settings Screen](./07-screens/settings.md) | migrated |
| Privacy | Route screen | `/{locale}/privacy` | [Privacy Screen](./07-screens/privacy.md) | migrated |
| Recovery screens | Route states | global not found / resource unavailable | [Recovery Screens](./07-screens/recovery.md) | migrated |

## Shared Screen Patterns

### Module browser pattern

- Used by [Alphabet Catalog Screen](./07-screens/alphabet-catalog.md) and [Vocabulary Catalog Screen](./07-screens/vocabulary-catalog.md)
- Shared role: browse one module, select one study resource, and launch Study or Play
- Shared rules:
  - every module browser exposes exactly one `Full review` section
  - `Full review` is the UI label; the underlying product model is a module review set
  - the selected study-resource surface is contextual, dismissible, and non-modal
  - selecting another resource updates the same surface in place
- Shared owners:
  - reusable layout and drawer patterns: [Ui System](./08-ui-system.md)
  - canonical navigation targets: [Routing and Flows](./06-routing-and-flows.md)

### Play host pattern

- Used by the canonical Play routes for lessons and module review sets
- Shared role: host the full Play flow for one study resource
- Flow order:
  - [Play Lobby Screen](./07-screens/play/lobby.md)
  - [Game Round Screen](./07-screens/play/round.md)
  - [Game Feedback Screen](./07-screens/play/feedback.md)
  - [Game Results Screen](./07-screens/play/results.md)
- Shared rules:
  - the Lobby prepares the game plan before the session starts
  - one active round is shown at a time
  - MVP answer format remains `single-choice`
  - leaving from an active round or feedback state uses a confirmation surface because progress would be lost
  - active-session sound changes affect playback immediately without regenerating the prepared round sequence
- Shared owners:
  - route flow and return targets: [Routing and Flows](./06-routing-and-flows.md)
  - sound behavior: [Audio and Sound](./10-audio-and-sound.md)
  - overlay and feedback families: [Ui System](./08-ui-system.md)

### Recovery-state pattern

- Used by [Recovery Screens](./07-screens/recovery.md)
- Shared role: help the student recover from invalid URLs or valid routes that cannot load their required resource
- Shared rule: valid controlled routes with missing data use route-owned unavailable screens instead of collapsing into global not found
- Shared owners:
  - route-state families: [Routing and Flows](./06-routing-and-flows.md)
  - recovery-state distinction: [Roadmap and Decisions](./04-roadmap-and-decisions.md)

## Dedicated Screen Docs

### Route screens

- [Explore Entry Screen](./07-screens/explore-entry.md): top-level Learn entry for choosing Alphabet or Vocabulary
- [Alphabet Catalog Screen](./07-screens/alphabet-catalog.md): module browser for alphabet lessons and alphabet full review
- [Vocabulary Catalog Screen](./07-screens/vocabulary-catalog.md): module browser for vocabulary lessons and vocabulary full review
- [Study Screen](./07-screens/study.md): summary/detail preview flow for one study resource before Play
- [Translit Screen](./07-screens/translit.md): Georgian <-> Latin transliteration utility with token inspection
- [Settings Screen](./07-screens/settings.md): app-wide preferences and app metadata
- [Privacy Screen](./07-screens/privacy.md): longform privacy notice and storage/analytics explanation

### Play flow screens

- [Play Lobby Screen](./07-screens/play/lobby.md): prepared-session review and start point
- [Game Round Screen](./07-screens/play/round.md): active answering state for one round
- [Game Feedback Screen](./07-screens/play/feedback.md): resolved-answer teaching and continuation state
- [Game Results Screen](./07-screens/play/results.md): post-session failed-item review and next-step actions

### Recovery route states

- [Recovery Screens](./07-screens/recovery.md): grouped contract for global not found, Study resource unavailable, and Play resource unavailable
