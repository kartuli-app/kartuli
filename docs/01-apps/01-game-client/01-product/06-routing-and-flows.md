---
description: Information architecture, route catalog, navigation model, and high-level flows for the game client.
---

# Routing and Flows

This document owns information architecture, route modeling, route-level metadata, navigation targets, route-state families, and high-level flows.

Use it together with [Core](./05-core.md) and [Screens](./07-screens.md).

## Route notation

Use route patterns in this document, not framework file-path syntax.

Notation rules:

- use `/` for the non-localized root route
- use `/{locale}/...` for localized route patterns
- use `{paramName}` for dynamic segments such as `{lessonId}` and `{moduleId}`
- use actual URLs only as concrete examples when helpful

Examples:

- route pattern: `/`
- actual URL: `/`
- route pattern: `/{locale}/privacy`
- actual URL: `/en/privacy`
- route pattern: `/{locale}/app/learn/lessons/{lessonId}/study`
- actual URL: `/en/app/learn/lessons/alphabet-intro/study`

## Information architecture

### App section

The current top-level app destinations are:

- Learn
- Translit
- Settings

### Public section

The current public page is:

- Privacy

## Routing model

### Top-level rules

- `/` is non-localized
- public routes live under `/{locale}/...`
- app routes live under `/{locale}/app/...`

### Browse routes versus resource routes

- browse routes may encode learning area and grouping
- Study and Play routes encode the resource family and the explicit action
- canonical Study and Play routes do not encode the discovery path that led to them

### Locale canonicalization

- unsupported locale values do not produce a dedicated locale-error screen
- when the route intent is recognized, the app redirects to the equivalent route under a supported locale
- when the route intent is not recognized, unsupported locale values fall through to global not-found handling

### Route-state families

The product has two route-state families:

- global not found
- resource unavailable

Route-owned unavailable states currently exist for:

- Study
- Play

### Deterministic return-target rules

App-owned back and exit actions use explicit product route targets, not raw browser-history behavior.

Canonical return targets:

- direct-entry Study returns to the owning browse route for that resource family
- direct-entry Play still exposes the canonical Study route for the current resource
- active-session leave actions and Results `Back to Study` target the canonical Study route for the current resource, even if the user never opened Study first

Canonical Study targets from Play:

- lesson Play -> `/{locale}/app/learn/lessons/{lessonId}/study`
- module review Play -> `/{locale}/app/learn/modules/{moduleId}/review/study`

Canonical browse targets from Study:

- alphabet lessons and alphabet module review sets -> `/{locale}/app/learn/explore/alphabet`
- vocabulary lessons and vocabulary module review sets -> `/{locale}/app/learn/explore/vocabulary`

## Route catalog

### Root route

#### `/`

- Kind: redirect route
- Purpose: resolve the best localized entry URL for the current visitor
- Metadata: `noindex`
- Canonical/share role: not a canonical destination
- Resolution order:
  - preferred locale cookie
  - browser `Accept-Language` header
  - default locale `en`
- Behavior:
  - `/` -> `/en/app/learn` when no supported cookie or browser language is found
  - `/` -> `/{locale}/app/learn` when a supported locale is resolved
- Binding: none

### Public routes

#### `/{locale}/privacy`

- Kind: page route
- Purpose: show the privacy notice
- Section: Public
- Metadata: page-specific metadata
- Standalone entry: yes
- In-app return target: `/{locale}/app/learn`
- Binding: Privacy screen

### App routes

#### `/{locale}/app/learn`

- Kind: redirect route
- Purpose: stable top-level Learn entry route
- Section: Learn
- Metadata: `noindex`
- Canonical/share role: not a canonical destination
- Behavior: redirects to `/{locale}/app/learn/explore`
- Binding: none

#### `/{locale}/app/learn/explore`

- Kind: page route
- Purpose: enter manual lesson selection
- Section: Learn / Explore
- Metadata: page-specific metadata
- Binding: Explore entry screen

#### `/{locale}/app/learn/explore/alphabet`

- Kind: page route
- Purpose: browse alphabet lessons and the alphabet module review set
- Section: Learn / Explore
- Metadata: page-specific metadata
- Binding: Alphabet catalog screen

#### `/{locale}/app/learn/explore/vocabulary`

- Kind: page route
- Purpose: browse vocabulary lessons and the vocabulary module review set
- Section: Learn / Explore
- Metadata: page-specific metadata
- Binding: Vocabulary catalog screen

#### `/{locale}/app/learn/lessons/{lessonId}/study`

- Kind: page route
- Purpose: preview one authored lesson before Play
- Section: Learn / Study
- Metadata: lesson-specific metadata
- Canonical/share role: canonical shareable authored-lesson Study route
- Unavailable handling: render Study resource unavailable when the lesson cannot be found or loaded
- Canonical browse return:
  - alphabet lessons -> `/{locale}/app/learn/explore/alphabet`
  - vocabulary lessons -> `/{locale}/app/learn/explore/vocabulary`
- Binding: Study screen

#### `/{locale}/app/learn/lessons/{lessonId}/play`

- Kind: page route
- Purpose: host the Play flow for one authored lesson
- Section: Learn / Play
- Metadata: `noindex`
- Canonical/share role: not a primary search/share destination
- Unavailable handling: render Play resource unavailable when the lesson cannot be found or loaded
- Canonical Study return: `/{locale}/app/learn/lessons/{lessonId}/study`
- Binding: Play screen

#### `/{locale}/app/learn/modules/{moduleId}/review/study`

- Kind: page route
- Purpose: preview one module review set before Play
- Section: Learn / Study
- Metadata: module-specific metadata
- Canonical/share role: canonical shareable module-review Study route
- Unavailable handling: render Study resource unavailable when the module review set cannot be found or loaded
- Canonical browse return:
  - alphabet module review sets -> `/{locale}/app/learn/explore/alphabet`
  - vocabulary module review sets -> `/{locale}/app/learn/explore/vocabulary`
- Binding: Study screen

#### `/{locale}/app/learn/modules/{moduleId}/review/play`

- Kind: page route
- Purpose: host the Play flow for one module review set
- Section: Learn / Play
- Metadata: `noindex`
- Canonical/share role: not a primary search/share destination
- Unavailable handling: render Play resource unavailable when the module review set cannot be found or loaded
- Canonical Study return: `/{locale}/app/learn/modules/{moduleId}/review/study`
- Binding: Play screen

#### `/{locale}/app/translit`

- Kind: page route
- Purpose: access the bidirectional translit utility
- Section: Translit
- Metadata: page-specific metadata
- Binding: Translit screen

#### `/{locale}/app/settings`

- Kind: page route
- Purpose: access global app preferences and app metadata
- Section: Settings
- Metadata: `noindex`
- Canonical/share role: utility route, not a primary search destination
- Binding: Settings screen

## Routing states

### Global not-found state

- Trigger: the requested URL does not match a controlled route pattern after locale handling
- Metadata: `noindex`
- Binding: Global not found screen

### Study resource unavailable state

- Trigger: a valid Study route cannot load its lesson or module review set
- Metadata: `noindex`
- Binding: Study resource unavailable screen

### Play resource unavailable state

- Trigger: a valid Play route cannot load its lesson or module review set
- Metadata: `noindex`
- Binding: Play resource unavailable screen

## Navigation model

### Top-level destinations

- Learn
- Translit
- Settings

### Dock visibility

Dock visible:

- `/{locale}/app/learn` through its redirect to `/{locale}/app/learn/explore`
- `/{locale}/app/translit`
- `/{locale}/app/settings`

Dock hidden:

- `/{locale}/app/learn/explore/alphabet`
- `/{locale}/app/learn/explore/vocabulary`
- `/{locale}/app/learn/lessons/{lessonId}/study`
- `/{locale}/app/learn/lessons/{lessonId}/play`
- `/{locale}/app/learn/modules/{moduleId}/review/study`
- `/{locale}/app/learn/modules/{moduleId}/review/play`
- `/{locale}/privacy`

### Back and exit behavior

- Learn entry does not show a back button
- `/{locale}/app/learn/explore/alphabet` returns to `/{locale}/app/learn/explore`
- `/{locale}/app/learn/explore/vocabulary` returns to `/{locale}/app/learn/explore`
- `/{locale}/app/settings` returns to `/{locale}/app/learn`
- `/{locale}/privacy` returns to `/{locale}/app/learn` when shown inside the app shell
- Study returns to the canonical browse target for the resource family
- Play Lobby back arrow returns to the canonical Study route for the current resource
- active Play rounds and feedback use a leave-game action instead of a normal back arrow
- leaving from an active round or feedback state opens a confirmation surface
- Results use explicit next-step actions instead of a back arrow

## High-level flows

### Learning flow

`Explore -> optional Study -> Play -> Repeat`

### Explore flow

- the user lands on `/{locale}/app/learn/explore`
- the screen offers Alphabet and Vocabulary
- choosing Alphabet opens `/{locale}/app/learn/explore/alphabet`
- choosing Vocabulary opens `/{locale}/app/learn/explore/vocabulary`

### Study flow

- Study may be opened from a browser screen or directly by URL
- Study opens on summary by default
- the user may go straight to Play from summary or detail
- item position is internal UI state, not URL state
- direct-entry Study still returns to the canonical browse route for that resource family

### Play flow

- entering Play opens the Game Lobby for one study resource
- the Lobby prepares the game plan before the session starts
- the Lobby shows exact round count, variant summary, and whether listening rounds are included
- the `Include listening rounds` control defaults from the current global sound preference for audio-capable resources
- changing the Lobby listening-rounds setting regenerates the prepared plan
- once the session starts, listening-round inclusion is fixed for that session
- the game then runs `Game Round -> Game Round Feedback` cycles until Results
- every item in the study resource should appear at least once as a target
- exact weighting and sequencing may evolve without changing the visible flow contract

### Change language flow

- the user changes language in Settings
- the stored language preference updates immediately
- the app navigates to the equivalent localized route
- there is no separate confirmation step

### Privacy consent flow

- on app init, the app resolves stored privacy consent before deciding whether the banner should appear
- missing consent resolves to `unknown`
- `unknown` shows a non-dismissible privacy banner until the user chooses `Accept` or `Reject`
- `granted` starts optional analytics on init
- `rejected` keeps optional analytics off on init
- the privacy page must be reachable from the banner
- consent can later be reviewed and changed in Settings

### Translit flow

- transliteration updates on every input change
- the user can clear input, switch direction, and copy output
- switching direction turns the current output into the new input
- output is tokenized for source/output inspection rather than character-position comparison

