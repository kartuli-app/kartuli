---
description: Screen and experience index for the game client, with a few shared pattern notes.
---

# Screens

This document indexes route screens, route experiences, and Play flow screens.

Detailed definitions live in dedicated docs under `./07-screens/`.

Shared product UI components live in [Component Catalog](./09-component-catalog.md).

## Purpose

This page does two jobs:

- index dedicated screen and experience docs
- keep only short shared notes that span more than one dedicated doc

## Screen index

| Screen | Kind | Route or entry | Detail doc |
|---|---|---|---|
| Explore entry | Route screen | `/{locale}/explore` | [Explore Entry Screen](./07-screens/explore-entry.md) |
| Browse | Route screen | `/{locale}/explore/alphabet`, `/{locale}/explore/vocabulary` | [Browse Screen](./07-screens/browse.md) |
| Study | Route screen | Study lesson and module review routes | [Study Screen](./07-screens/study.md) |
| Play | Route experience | Play lesson and module review routes | [Play Experience](./07-screens/play.md) |
| Play Lobby | Flow screen | Play route initial state | [Play Lobby Screen](./07-screens/play/lobby.md) |
| Play Round | Flow screen | Active round state | [Play Round Screen](./07-screens/play/round.md) |
| Play Results | Flow screen | End-of-game outcome state | [Play Results Screen](./07-screens/play/results.md) |
| Play Mistakes Review | Flow screen | Post-results review state | [Play Mistakes Review Screen](./07-screens/play/mistakes-review.md) |
| Translit | Route screen | `/{locale}/translit` | [Translit Screen](./07-screens/translit.md) |
| Settings | Route screen | `/{locale}/settings` | [Settings Screen](./07-screens/settings.md) |
| Recovery screens | Route states | Global not found and resource unavailable states | [Recovery Screens](./07-screens/recovery.md) |

## Shared Screen Patterns

### Browse pattern

- Used by the `Browse` routes
- Shared role: browse one content family, select one study resource, and launch Study or Play
- Shared rules:
  - every browse route exposes exactly one `Full review` section
  - `Full review` is the UI label; the underlying product model is a module review set
  - browse cards use the same shared grid structure across content families
  - only the preview visual asset changes by content family
  - the selected study-resource surface is contextual, dismissible, and non-modal
  - selecting another resource updates the same surface in place

### Study pattern

- Used by the lesson and module review `Study` routes
- Shared role: review one route-provided item set before Play
- Shared rules:
  - the route provides title, content family, item set, and back target
  - the study navigation bar is shared across content families
  - summary shows all items and may scroll
  - detail shows one item at a time
  - `Play` remains available in summary and detail

### Play pattern

- Used by the canonical Play routes for lessons and module review sets
- Shared role: generate a game for one route-provided set and run the full Play flow
- Flow order:
  - [Play Experience](./07-screens/play.md)
  - [Play Lobby Screen](./07-screens/play/lobby.md)
  - [Play Round Screen](./07-screens/play/round.md)
  - [Play Results Screen](./07-screens/play/results.md)
  - [Play Mistakes Review Screen](./07-screens/play/mistakes-review.md)
- Shared rules:
  - Play generates the game before the Lobby is shown
  - one active round is shown at a time
  - answer buttons submit immediately
  - the first wrong answer marks the round failed and enters corrective elimination inside the round
  - the round includes active, corrective, and resolved states inside the same screen
  - resolved rounds pause briefly and then auto-advance
  - Results show the outcome first and may open Mistakes review from the failed-result variant
  - leaving from an active or resolved round state uses a confirmation surface because progress would be lost

### Recovery-state pattern

- Used by [Recovery Screens](./07-screens/recovery.md)
- Shared role: help the student recover from invalid URLs or valid routes that cannot load their required resource
- Shared rules:
  - valid controlled routes with missing data use route-owned unavailable screens instead of collapsing into global not found
  - the safe return destination is `/{locale}/explore`
  - route-owned unavailable states are separate from the normal `Study` and `Play` experiences

## Dedicated Screen Docs

### Route screens and experiences

- [Explore Entry Screen](./07-screens/explore-entry.md): top-level Learn entry for choosing Alphabet or Vocabulary
- [Browse Screen](./07-screens/browse.md): shared browse experience for alphabet and vocabulary routes
- [Study Screen](./07-screens/study.md): summary/detail preview flow for one study resource before Play
- [Play Experience](./07-screens/play.md): shared Play experience for lesson and module review routes
- [Translit Screen](./07-screens/translit.md): Georgian <-> Latin transliteration utility with token inspection
- [Settings Screen](./07-screens/settings.md): app language selection in MVP

### Play flow screens

- [Play Lobby Screen](./07-screens/play/lobby.md): generated-game review and start point
- [Play Round Screen](./07-screens/play/round.md): active, corrective, and resolved states for one round
- [Play Results Screen](./07-screens/play/results.md): post-game outcome screen and next-step actions
- [Play Mistakes Review Screen](./07-screens/play/mistakes-review.md): failed-item review flow after Results

### Recovery route states

- [Recovery Screens](./07-screens/recovery.md): grouped contract for global not found, Study resource unavailable, and Play resource unavailable
