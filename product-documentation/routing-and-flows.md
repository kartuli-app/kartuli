# Routing and Flows

This document owns information architecture, route modeling, route-level metadata/indexability, navigation targets, route-state families, and high-level flows.

Read it together with [../PRODUCT.md](../PRODUCT.md).

## Routing contract

- `Confirmed`: use route patterns in this doc, not framework file-path syntax
- `Confirmed`: route-level navigation targets are canonical here
- `Confirmed`: screen-specific structure and content belong in [screens.md](screens.md)
- `Confirmed`: reusable UI rules belong in [ui-system.md](ui-system.md)

## Information architecture

### Sections

#### App section

- `Current MVP`: Learn
- `Current MVP`: Translit
- `Current MVP`: Settings

#### Public section

- `Current MVP`: Privacy

## Route notation

- `Confirmed`: use `/` for the non-localized root route
- `Confirmed`: use `/{locale}/...` for localized route patterns
- `Confirmed`: use `{paramName}` for dynamic segments such as `{lessonId}` and `{moduleId}`
- `Confirmed`: actual URLs are examples, not canonical notation

Examples:

- Route pattern: `/`
- Actual URL: `/`
- Route pattern: `/{locale}/privacy`
- Actual URL: `/en/privacy`
- Route pattern: `/{locale}/app/learn/lessons/{lessonId}/study`
- Actual URL: `/en/app/learn/lessons/alphabet-intro/study`

## Routing model

### Top-level rules

- `Current MVP`: `/` is non-localized
- `Current MVP`: public routes live under `/{locale}/...`
- `Current MVP`: app routes live under `/{locale}/app/...`

### Browse routes versus resource routes

- `Confirmed`: browse routes may encode learning area and grouping
- `Confirmed`: Study and Play routes encode the resource family and explicit action
- `Confirmed`: canonical Study and Play routes do not encode the discovery path that led to them

### Locale canonicalization

- `Confirmed`: unsupported locale values do not get a dedicated locale-error screen
- `Confirmed`: if the route intent is recognized, the app redirects to the equivalent route under a supported locale
- `Confirmed`: if the route intent is not recognized, unsupported locale values fall through to global not-found handling

### Route-state families

- `Confirmed`: the product has two route-state families
  - `global not found`
  - `resource unavailable`
- `Current MVP`: route-owned unavailable states exist for Study and Play only

### Deterministic return-target rules

- `Confirmed`: app-owned back/exit actions use explicit route targets, not raw browser-history behavior
- `Current MVP`: direct entry into Study still returns to the owning browse route for that resource family
- `Current MVP`: direct entry into Play still exposes canonical actions that target the Study route for the current resource
- `Current MVP`: active-session leave actions and Results `Back to Study` use the canonical Study route for the current resource, even if the user never opened Study first

Canonical Study targets from Play:

- Lesson Play -> `/{locale}/app/learn/lessons/{lessonId}/study`
- Module review Play -> `/{locale}/app/learn/modules/{moduleId}/review/study`

Canonical browse targets from Study:

- Alphabet lessons and alphabet module review sets -> `/{locale}/app/learn/explore/alphabet`
- Vocabulary lessons and vocabulary module review sets -> `/{locale}/app/learn/explore/vocabulary`

## Route catalog

### Root route

#### `/`

- Status: `Current MVP`
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
- `Post-MVP`: root may later branch between a landing route and Learn based on visitor state

### Public routes

#### `/{locale}/privacy`

- Status: `Current MVP`
- Kind: page route
- Purpose: show the privacy notice
- Section: Public
- Metadata: page-specific metadata
- Standalone entry: yes
- In-app return target: `/{locale}/app/learn`
- Binding: Privacy screen

### App routes

#### `/{locale}/app/learn`

- Status: `Current MVP`
- Kind: redirect route
- Purpose: stable top-level Learn entry route
- Section: Learn
- Metadata: `noindex`
- Canonical/share role: not a canonical destination
- Behavior: redirects to `/{locale}/app/learn/explore`
- Binding: none
- `Post-MVP`: Learn may later resolve between Explore and Recommended once that mode exists
- `Open question`: exact selection logic for a future Explore/Recommended split

#### `/{locale}/app/learn/explore`

- Status: `Current MVP`
- Kind: page route
- Purpose: enter manual lesson selection
- Section: Learn / Explore
- Metadata: page-specific metadata
- Binding: Explore entry screen

#### `/{locale}/app/learn/explore/alphabet`

- Status: `Current MVP`
- Kind: page route
- Purpose: browse alphabet lessons and the alphabet module review set
- Section: Learn / Explore
- Metadata: page-specific metadata
- Binding: Alphabet catalog screen

#### `/{locale}/app/learn/explore/vocabulary`

- Status: `Current MVP`
- Kind: page route
- Purpose: browse vocabulary lessons and the vocabulary module review set
- Section: Learn / Explore
- Metadata: page-specific metadata
- Binding: Vocabulary catalog screen

#### `/{locale}/app/learn/lessons/{lessonId}/study`

- Status: `Current MVP`
- Kind: page route
- Purpose: preview one authored lesson before play
- Section: Learn / Study
- Metadata: lesson-specific metadata
- Canonical/share role: canonical shareable authored-lesson Study route
- Unavailable handling: render Study resource unavailable when the lesson cannot be found or loaded
- Canonical browse return:
  - alphabet lessons -> `/{locale}/app/learn/explore/alphabet`
  - vocabulary lessons -> `/{locale}/app/learn/explore/vocabulary`
- Binding: Study screen

#### `/{locale}/app/learn/lessons/{lessonId}/play`

- Status: `Current MVP`
- Kind: page route
- Purpose: host the Play flow for one authored lesson
- Section: Learn / Play
- Metadata: `noindex`
- Canonical/share role: not a primary search/share destination
- Unavailable handling: render Play resource unavailable when the lesson cannot be found or loaded
- Canonical Study return: `/{locale}/app/learn/lessons/{lessonId}/study`
- Binding: Play screen

#### `/{locale}/app/learn/modules/{moduleId}/review/study`

- Status: `Current MVP`
- Kind: page route
- Purpose: preview one module review set before play
- Section: Learn / Study
- Metadata: module-specific metadata
- Canonical/share role: canonical shareable module-review Study route
- Unavailable handling: render Study resource unavailable when the module review set cannot be found or loaded
- Canonical browse return:
  - alphabet module review sets -> `/{locale}/app/learn/explore/alphabet`
  - vocabulary module review sets -> `/{locale}/app/learn/explore/vocabulary`
- Binding: Study screen

#### `/{locale}/app/learn/modules/{moduleId}/review/play`

- Status: `Current MVP`
- Kind: page route
- Purpose: host the Play flow for one module review set
- Section: Learn / Play
- Metadata: `noindex`
- Canonical/share role: not a primary search/share destination
- Unavailable handling: render Play resource unavailable when the module review set cannot be found or loaded
- Canonical Study return: `/{locale}/app/learn/modules/{moduleId}/review/study`
- Binding: Play screen

#### `/{locale}/app/translit`

- Status: `Current MVP`
- Kind: page route
- Purpose: access the bidirectional translit utility
- Section: Translit
- Metadata: page-specific metadata
- Binding: Translit screen

#### `/{locale}/app/settings`

- Status: `Current MVP`
- Kind: page route
- Purpose: access global app preferences and app metadata
- Section: Settings
- Metadata: `noindex`
- Canonical/share role: utility route, not a primary search destination
- Binding: Settings screen

## Routing states

### Global not-found state

- Status: `Current MVP`
- Trigger: the requested URL does not match a controlled route pattern after locale handling
- Metadata: `noindex`
- Binding: Global not found screen

### Study resource unavailable state

- Status: `Current MVP`
- Trigger: a valid Study route cannot load its lesson or module review set
- Metadata: `noindex`
- Binding: Study resource unavailable screen

### Play resource unavailable state

- Status: `Current MVP`
- Trigger: a valid Play route cannot load its lesson or module review set
- Metadata: `noindex`
- Binding: Play resource unavailable screen

## Navigation model

### Top-level destinations

- `Current MVP`: Learn
- `Current MVP`: Translit
- `Current MVP`: Settings

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

- `Current MVP`: Learn entry does not show a back button
- `Current MVP`: `/{locale}/app/learn/explore/alphabet` returns to `/{locale}/app/learn/explore`
- `Current MVP`: `/{locale}/app/learn/explore/vocabulary` returns to `/{locale}/app/learn/explore`
- `Current MVP`: `/{locale}/app/settings` returns to `/{locale}/app/learn`
- `Current MVP`: `/{locale}/privacy` returns to `/{locale}/app/learn` when shown inside the app shell
- `Current MVP`: Study returns to the canonical browse target for the resource family
- `Current MVP`: Play Lobby back arrow returns to the canonical Study route for the current resource
- `Current MVP`: active Play rounds and feedback use a leave-game action instead of a normal back arrow
- `Current MVP`: leaving from an active round or feedback state opens a confirmation surface
- `Current MVP`: Results use explicit next-step actions instead of a back arrow

## High-level flows

### Learning flow

`Explore -> optional Study -> Play -> Repeat`

- `Current MVP`: Explore is the only active Learn entry mode
- `Post-MVP`: Recommended may become a second entry mode later

### Explore flow

- `Current MVP`: the user lands on `/{locale}/app/learn/explore`
- `Current MVP`: the screen offers Alphabet and Vocabulary
- `Current MVP`: choosing Alphabet opens `/{locale}/app/learn/explore/alphabet`
- `Current MVP`: choosing Vocabulary opens `/{locale}/app/learn/explore/vocabulary`

### Study flow

- `Current MVP`: Study may be opened from a browser screen or directly by URL
- `Current MVP`: Study opens on summary by default
- `Current MVP`: the user may go straight to Play from summary or detail
- `Current MVP`: item position is internal UI state, not URL state
- `Current MVP`: direct-entry Study still returns to the canonical browse route for that resource family

### Play flow

- `Current MVP`: entering Play opens the Game Lobby for one study resource
- `Current MVP`: the Lobby prepares the game plan before the session starts
- `Current MVP`: the Lobby shows exact round count, variant summary, and whether listening rounds are included
- `Current MVP`: the `Include listening rounds` control defaults from the current global sound preference for audio-capable resources
- `Current MVP`: changing the Lobby listening-rounds setting regenerates the prepared plan
- `Current MVP`: once the session starts, listening-round inclusion is fixed for that session
- `Current MVP`: the game then runs `Game Round -> Game Round Feedback` cycles until Results
- `Current MVP`: every item in the study resource should appear at least once as a target
- `Confirmed`: exact weighting and sequencing can evolve later without changing the visible flow contract

### Change language flow

- `Current MVP`: the user changes language in Settings
- `Current MVP`: the stored language preference updates immediately
- `Current MVP`: the app navigates to the equivalent localized route
- `Current MVP`: there is no separate confirmation step

### Privacy consent flow

- `Current MVP`: on app init, the app resolves stored privacy consent before deciding whether the banner should appear
- `Current MVP`: missing consent resolves to `unknown`
- `Current MVP`: `unknown` shows a non-dismissible privacy banner until the user chooses `Accept` or `Reject`
- `Current MVP`: `granted` starts optional analytics on init
- `Current MVP`: `rejected` keeps optional analytics off on init
- `Current MVP`: the privacy page must be reachable from the banner
- `Current MVP`: consent can later be reviewed and changed in Settings

### Translit flow

- `Current MVP`: transliteration updates on every input change
- `Current MVP`: the user can clear input, switch direction, and copy output
- `Current MVP`: switching direction turns the current output into the new input
- `Current MVP`: output is tokenized for source/output inspection rather than character-position comparison
