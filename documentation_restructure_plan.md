# Documentation Restructure Plan — Game Client Product Docs

## Goal

Restructure the game-client product documentation so it better supports:

- AI-assisted UI/UX design
- AI-assisted component implementation
- Storybook-first development
- Screen-by-screen implementation
- A clear relationship between product behavior, screen contracts, component contracts, and design tokens

The current docs already have a good authority model: canonical rules should live in one owning document, and other docs should link back instead of duplicating full specs. Preserve that principle.

The main missing layer is:

1. Per-screen implementation docs
2. A component catalog that maps components to screens, variants, states, caveats, token usage, and Storybook coverage

Do not rewrite all product docs at once. Make structural changes first, then migrate screens iteratively.

---

## Current Documentation Context

Existing docs:

```txt
docs/01-apps/01-game-client/01-product/
  01-product-hub.md
  02-documentation-contract.md
  03-product-overview.md
  04-roadmap-and-decisions.md
  05-core.md
  06-routing-and-flows.md
  07-screens.md
  08-ui-system.md
  09-client-preferences.md
  10-audio-and-sound.md
  11-privacy-and-analytics.md
```

Current ownership model:

- `03-product-overview.md`
  - product definition, promise, principles, brand, mascot, tone
- `05-core.md`
  - glossary, modeling hierarchy, localization, learning-content model, activity, mastery
- `06-routing-and-flows.md`
  - information architecture, route catalog, navigation model, high-level flows
- `07-screens.md`
  - route screens and Play flow screens
- `08-ui-system.md`
  - reusable UI rules, global UI surfaces, responsive behavior, component families
- `09-client-preferences.md`
  - client-side preference registry and shared preference-resolution model
- `10-audio-and-sound.md`
  - sound behavior, muted behavior, listening rounds
- `11-privacy-and-analytics.md`
  - storage, privacy consent, analytics behavior
- root `DESIGN.md`
  - AI-facing design/token helper document, not product source of truth

Keep these ownership boundaries.

---

## Target Documentation Structure

Add per-screen docs and a component catalog.

Target structure:

```txt
docs/01-apps/01-game-client/01-product/
  01-product-hub.md
  02-documentation-contract.md
  03-product-overview.md
  04-roadmap-and-decisions.md
  05-core.md
  06-routing-and-flows.md
  07-screens.md
  07-screens/
    _template.md
    explore-entry.md
    alphabet-catalog.md
    vocabulary-catalog.md
    study.md
    translit.md
    settings.md
    privacy.md
    recovery.md
    play/
      lobby.md
      round.md
      feedback.md
      results.md
  08-ui-system.md
  09-client-preferences.md
  10-audio-and-sound.md
  11-privacy-and-analytics.md
  12-component-catalog.md
```

Important:

- `07-screens.md` becomes the screen index, screen contract template, and migration status document.
- Detailed screen specs move into `07-screens/*.md`.
- `12-component-catalog.md` becomes the implementation-facing component catalog.
- `08-ui-system.md` remains the reusable UI principles and component-family rules document.
- Do not move route rules out of `06-routing-and-flows.md`.
- Do not move canonical audio behavior out of `10-audio-and-sound.md`.
- Do not move canonical privacy behavior out of `11-privacy-and-analytics.md`.

---

## Phase 1 — Update Documentation Contract

Modify:

```txt
docs/01-apps/01-game-client/01-product/02-documentation-contract.md
```

Add ownership rules for the new docs.

### Add to “Owning documents”

```md
- [Screen Specs](./07-screens/)
  - per-screen implementation contracts, component inventories, screen states, and Storybook coverage
- [Component Catalog](./12-component-catalog.md)
  - implementation-facing component contracts, variants, states, usage locations, caveats, token usage, and Storybook requirements
```

### Add to “Boundary rules”

```md
- Screen-specific implementation details, component inventories, screen states, and Storybook coverage belong in per-screen docs under [Screen Specs](./07-screens/).
- Concrete component contracts, variants, states, usage locations, caveats, token usage, and Storybook requirements belong in [Component Catalog](./12-component-catalog.md).
- [Ui System](./08-ui-system.md) owns reusable UI principles and component-family rules; it does not own the detailed implementation contract for every component.
- Storybook is the executable UI reference for implemented components and states, but product behavior remains owned by the product docs.
```

### Add a `DESIGN.md` clarification

Add or preserve:

```md
`DESIGN.md` is an AI-facing design/token helper document. It may summarize product UI rules and define design tokens, but it is not the canonical source for product behavior, route behavior, audio behavior, privacy behavior, or screen-specific interaction rules.
```

---

## Phase 2 — Convert `07-screens.md` into Screen Index

Modify:

```txt
docs/01-apps/01-game-client/01-product/07-screens.md
```

Do not delete screen content immediately unless doing a careful migration. For the first PR, it is acceptable to keep old content and add an index/migration section at the top.

Eventually, this document should contain:

1. Purpose
2. Screen contract template
3. Screen index
4. Migration status
5. Links to per-screen docs

### Suggested new opening

```md
# Screens

This document is the index for route screens and Play flow screens.

Detailed per-screen implementation contracts live under [`./07-screens/`](./07-screens/).

Reusable UI rules live in [Ui System](./08-ui-system.md).
Route-level navigation targets live in [Routing and Flows](./06-routing-and-flows.md).
Component contracts live in [Component Catalog](./12-component-catalog.md).
```

### Add screen index

```md
## Screen index

| Screen | Kind | Route / entry point | Detail doc | Migration status |
|---|---|---|---|---|
| Explore entry | Route screen | `/{locale}/app/learn/explore` | `./07-screens/explore-entry.md` | planned |
| Alphabet catalog | Route screen | `/{locale}/app/learn/explore/alphabet` | `./07-screens/alphabet-catalog.md` | planned |
| Vocabulary catalog | Route screen | `/{locale}/app/learn/explore/vocabulary` | `./07-screens/vocabulary-catalog.md` | planned |
| Study | Route screen | Study lesson/module routes | `./07-screens/study.md` | planned |
| Play Lobby | Flow screen | Play route initial state | `./07-screens/play/lobby.md` | planned |
| Game Round | Flow screen | Play active round state | `./07-screens/play/round.md` | planned |
| Game Feedback | Flow screen | Play feedback state | `./07-screens/play/feedback.md` | planned |
| Game Results | Flow screen | Play results state | `./07-screens/play/results.md` | planned |
| Translit | Route screen | `/{locale}/app/translit` | `./07-screens/translit.md` | planned |
| Settings | Route screen | `/{locale}/app/settings` | `./07-screens/settings.md` | planned |
| Privacy | Route screen | `/{locale}/privacy` | `./07-screens/privacy.md` | planned |
| Recovery screens | Route states | global not found / resource unavailable | `./07-screens/recovery.md` | planned |
```

### Migration rule

Add:

```md
## Migration rule

During migration, the original screen entries may remain in this file until their per-screen docs are created and reviewed.

Once a screen has a dedicated doc, this file should keep only a short summary and link to the dedicated doc.
```

---

## Phase 3 — Add Screen Template

Create:

```txt
docs/01-apps/01-game-client/01-product/07-screens/_template.md
```

Contents:

```md
# {Screen Name}

## Summary

- Role:
- Entry point:
- Route binding:
- Screen type:
- Parent flow:
- Primary user question:
- Primary decision:

## Source links

- Routing:
- UI system:
- Component catalog:
- Preferences/audio/privacy, if relevant:

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Main area | yes |  |  |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|

## Content

- Title:
- Support copy:
- Primary labels:
- Secondary labels:
- Empty/recovery copy, if any:

## Behavior notes

Link to owning behavior docs instead of duplicating full rules.

## Design notes

Screen-specific visual guidance. Do not include raw CSS implementation.

## Accessibility notes

- Required heading behavior:
- Navigation/landmark expectations:
- Keyboard behavior, if relevant:

## Not this

List things AI/tools must not do.

## Storybook coverage

- Screen composition stories:
- State stories:
- Related component stories:

## Open questions

- ...
```

---

## Phase 4 — Create Component Catalog

Create:

```txt
docs/01-apps/01-game-client/01-product/12-component-catalog.md
```

Initial contents:

```md
---
description: Implementation-facing component contracts, usage locations, variants, states, caveats, token usage, and Storybook requirements for the game client.
---

# Component Catalog

This document owns the implementation-facing component catalog for the game client.

It bridges:

- screen contracts
- UI system rules
- DESIGN.md tokens
- Storybook implementation
- React component implementation

[Ui System](./08-ui-system.md) owns reusable UI principles and component-family rules.
This document owns concrete component contracts, usage locations, variants, states, caveats, token usage, and Storybook requirements.

## Component contract template

Each component entry should define:

- Role
- Used by screens
- Variants
- States
- Token usage
- Behavior notes
- Not this
- Required Storybook stories

## Component index

| Component | Family | Used by screens | Storybook status |
|---|---|---|---|
| `AppShell` | Shell | All app screens | planned |
| `PageHeader` | Shell / navigation | Explore, catalog, Study, utility, recovery | planned |
| `TopBar` | Shell / navigation | Catalog, Study, Play, Translit, Settings, Privacy, recovery | planned |
| `BottomDock` | Navigation | Explore, Translit, Settings | planned |
| `DestinationCard` | Browse | Explore entry | planned |
| `LessonCard` | Browse | Alphabet catalog, Vocabulary catalog | planned |
| `FullReviewCard` | Browse | Alphabet catalog, Vocabulary catalog | planned |
| `PreviewGrid` | Preview | Catalog, Study summary | planned |
| `PreviewSlot` | Preview | Catalog, Study summary | planned |
| `SelectedResourceDrawer` | Overlay / context drawer | Alphabet catalog, Vocabulary catalog | planned |
| `StudyNavBar` | Study | Study, Results failed-item review | planned |
| `SummaryCard` | Study | Study, Results failed-item review | planned |
| `DetailCard` | Study | Study, Results failed-item review | planned |
| `StickyPlayCta` | Study | Study | planned |
| `GameTopBar` | Play | Lobby, Round, Feedback | planned |
| `LobbyPanel` | Play | Play Lobby | planned |
| `ProgressIndicator` | Play | Round, Feedback | planned |
| `CueBlock` | Play | Round, Feedback | planned |
| `AnswerOption` | Play | Round, Feedback | planned |
| `FeedbackNotification` | Feedback | Round Feedback, global notification cases | planned |
| `ResultsReviewBlock` | Play results | Results | planned |
| `LeaveGameConfirmation` | Blocking overlay | Play Round, Feedback | planned |
| `MutedAudioControl` | Audio | Alphabet catalog, Study, Play | planned |
| `ReadingSurface` | Public / utility | Privacy | planned |
| `SettingsSection` | Utility | Settings | planned |
| `PrivacyBanner` | Global surface | App init when consent is unknown | planned |
| `TranslitSourcePanel` | Utility | Translit | planned |
| `TranslitOutputPanel` | Utility | Translit | planned |
| `TokenInspectionTooltip` | Tooltip | Translit | planned |

## Component entries

Add detailed component entries as screens are migrated.

Do not invent future components unless needed by MVP screen docs.
```

---

## Phase 5 — Add First Component Entries

Add a few high-value entries now because they encode important semantics.

### `MutedAudioControl`

```md
## `MutedAudioControl`

### Role

A visible audio control or audio affordance used when an audio-capable screen exposes manual playback or sound control.

### Used by screens

| Screen | Usage |
|---|---|
| Alphabet catalog | Sound toggle and lightweight preview behavior |
| Study | Explicit audio controls for audio-capable resources |
| Play Lobby | Sound toggle and listening-round availability |
| Game Round | Replay cue audio for listening rounds |
| Game Feedback | Sound state remains visible |

### Variants

| Variant | Meaning |
|---|---|
| available | sound is enabled and playback may occur |
| muted | sound is disabled; explicit controls remain visible and tappable |
| lightweight-preview-muted | lightweight preview tap fails silently |

### States

| State | Interactive | Notes |
|---|---:|---|
| available | yes | plays or toggles audio behavior |
| muted-explicit-control | yes | tapping explains why playback is unavailable |
| muted-lightweight-preview | yes | tapping fails silently for alphabet preview slots |

### Token usage

- muted surface: `brand-color-muted`
- text/icon: `brand-color-text-muted`
- border: `brand-color-border`
- do not use fail/error colors

### Behavior notes

Canonical behavior lives in [Audio and Sound](./10-audio-and-sound.md).

Explicit audio controls in Study and Play remain tappable when sound is disabled and explain why playback is unavailable.

Alphabet preview audio is lightweight preview behavior. When sound is disabled, tapping an alphabet preview does not play audio and fails silently.

### Not this

- Do not treat muted audio as disabled.
- Do not use negative/error styling.
- Do not remove explicit controls from the layout when sound is disabled.

### Storybook stories

- available
- muted explicit control
- muted explicit control with notification
- lightweight preview muted
```

### `AnswerOption`

```md
## `AnswerOption`

### Role

A selectable answer control in Play rounds.

### Used by screens

| Screen | Usage |
|---|---|
| Game Round | Four equal answer options |
| Game Round Feedback | Resolved answer states |

### Variants

| Variant | Meaning |
|---|---|
| default | unanswered option |
| selected | chosen answer before or during resolution |
| correct | resolved correct answer |
| wrong | chosen wrong answer |
| locked | non-winning locked option after answer submission |

### States

| State | Interactive | Notes |
|---|---:|---|
| default | yes | immediate answer submission |
| selected | no | input locks after answer |
| correct | no | feedback state |
| wrong | no | feedback state |
| locked | no | feedback state |

### Token usage

- default surface: `brand-color-surface`
- default text: `brand-color-text`
- selected surface: `brand-color-primary-soft`
- correct surface: `brand-color-success-soft`
- wrong surface: `brand-color-fail-soft`
- default border: `brand-color-border`
- correct border: `brand-color-success`
- wrong border: `brand-color-fail`
- radius: `brand-radius-md`
- typography: answer/body-strong role from `DESIGN.md`

### Behavior notes

- Answer submission is immediate.
- Inputs lock right away after selection.
- Desktop answer bindings use `1`, `2`, `3`, and `4`.
- During feedback, answer hotkeys are inactive.

### Not this

- Do not style answer options as mixed-priority buttons.
- Do not make the correct answer look like a primary CTA.
- Do not reuse muted audio styling for answer locking.
- Do not treat wrong answer as a generic destructive button.

### Storybook stories

- default
- selected
- correct
- wrong
- locked
- four-option set
```

### `BottomDock`

```md
## `BottomDock`

### Role

Top-level app navigation for the MVP destinations.

### Used by screens

| Screen | Usage |
|---|---|
| Explore entry | Learn active |
| Translit | Translit active |
| Settings | Settings active |

### Variants

| Variant | Meaning |
|---|---|
| learn-active | Learn is current |
| translit-active | Translit is current |
| settings-active | Settings is current |

### States

| State | Interactive | Notes |
|---|---:|---|
| default | yes | route navigation |
| active item | yes | current destination remains visible |

### Token usage

- surface: `brand-color-surface`
- active signal: `brand-color-primary`
- inactive text: `brand-color-text-muted`
- border: `brand-color-border`

### Behavior notes

Dock visibility is owned by [Routing and Flows](./06-routing-and-flows.md).

For MVP, do not convert the dock into a desktop sidebar.

### Not this

- Do not show the dock on catalog, Study, Play, Privacy, or recovery screens.
- Do not stretch the dock across the full desktop browser width.
- Do not introduce additional destinations beyond Learn, Translit, and Settings.

### Storybook stories

- Learn active
- Translit active
- Settings active
```

---

## Phase 6 — Migrate First Screen: Explore Entry

Create:

```txt
docs/01-apps/01-game-client/01-product/07-screens/explore-entry.md
```

Use the screen template and copy facts from the current Explore entry section in `07-screens.md`.

Do not invent new behavior.

Expected content:

```md
# Explore Entry Screen

## Summary

- Role: act as the top-level manual learning entry screen
- Entry point: `/{locale}/app/learn` resolving to `/{locale}/app/learn/explore`
- Route binding: `/{locale}/app/learn/explore`
- Screen type: route screen
- Parent flow: Explore flow
- Primary user question: what do I want to learn?
- Primary decision: choose Alphabet or Vocabulary

## Source links

- Routing: [Routing and Flows](../06-routing-and-flows.md)
- UI system: [Ui System](../08-ui-system.md)
- Component catalog: [Component Catalog](../12-component-catalog.md)

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Branded header area | yes | `PageHeader`, `TitleBlock` | Header uses branding rather than back action |
| Learning-choice area | yes | `DestinationCard` | Alphabet and Vocabulary choices |
| Dock | yes | `BottomDock` | Learn active |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `PageHeader` | Branded entry header | default | Component catalog |
| `TitleBlock` | Shows Explore title and support copy | default | Component catalog |
| `DestinationCard` | Alphabet and Vocabulary choices | alphabet, vocabulary | Component catalog |
| `BottomDock` | Top-level navigation | Learn active | Component catalog |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| default | route loads normally | show Explore header, two destination cards, and dock | MVP state |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Open Alphabet | tap Alphabet card | navigate to `/{locale}/app/learn/explore/alphabet` | Routing and Flows |
| Open Vocabulary | tap Vocabulary card | navigate to `/{locale}/app/learn/explore/vocabulary` | Routing and Flows |
| Open Translit | tap dock Translit item | navigate to `/{locale}/app/translit` | Routing and Flows |
| Open Settings | tap dock Settings item | navigate to `/{locale}/app/settings` | Routing and Flows |

## Content

- Title: `Explore`
- Support copy: `Choose what you want to learn.`
- Alphabet card copy: `Learn Georgian letters step by step.`
- Vocabulary card copy: `Learn useful words and phrases by topic.`

## Behavior notes

- The screen must not mix current Explore behavior with future Recommended logic.
- Learn entry does not show a back button.
- Dock visibility is defined in Routing and Flows.

## Design notes

- Mobile-first.
- Should aim to fit common mobile heights without scroll in MVP.
- Header may use mascot/logo treatment, but exact mascot placement remains open.
- Use `DestinationCard` rather than `LessonCard`.

## Accessibility notes

- The page needs one clear primary heading.
- Destination cards must be reachable as clear tap/click targets.
- Dock navigation must expose current destination state.

## Not this

- Do not introduce Recommended content in MVP.
- Do not make Alphabet and Vocabulary look like small lesson cards.
- Do not add a back button.
- Do not hide the dock.

## Storybook coverage

- Explore entry composition
- DestinationCard: Alphabet
- DestinationCard: Vocabulary
- BottomDock: Learn active

## Open questions

- Exact mascot/logo treatment in the header.
- Whether the mascot appears only in the header or also inside the cards.
```

Then update `07-screens.md` migration status for Explore entry to `migrated`.

---

## Phase 7 — Update Product Hub

Modify:

```txt
docs/01-apps/01-game-client/01-product/01-product-hub.md
```

Add new docs to the map.

### Add to “Read by task”

```md
- Screen implementation:
  - [Screens](./07-screens.md)
  - per-screen docs under [`./07-screens/`](./07-screens/)
- Component implementation:
  - [Component Catalog](./12-component-catalog.md)
- AI-facing design tokens and visual contract:
  - repo-root `DESIGN.md`
```

### Add to “Document map”

```md
- [Screen Specs](./07-screens/)
  - per-screen implementation contracts, component inventories, states, and Storybook coverage
- [Component Catalog](./12-component-catalog.md)
  - component usage locations, variants, states, caveats, token usage, and Storybook requirements
```

---

## Phase 8 — Do Not Over-Migrate Yet

For this PR, do not migrate every screen.

The goal of the first documentation-structure PR is:

- Add the new structure
- Add templates
- Add the component catalog
- Migrate exactly one screen: Explore entry
- Prove the workflow

After this lands, migrate screens one by one.

Recommended migration order:

```txt
1. Explore entry
2. Alphabet catalog
3. Vocabulary catalog
4. Study
5. Play Lobby
6. Game Round
7. Game Feedback
8. Results
9. Translit
10. Settings
11. Privacy
12. Recovery screens
```

---

## Acceptance Criteria

This documentation change is complete when:

- `02-documentation-contract.md` explains ownership of per-screen docs and component catalog.
- `07-screens.md` acts as an index and migration tracker.
- `07-screens/_template.md` exists.
- `12-component-catalog.md` exists.
- Initial component entries exist for:
  - `MutedAudioControl`
  - `AnswerOption`
  - `BottomDock`
- `07-screens/explore-entry.md` exists and follows the template.
- `01-product-hub.md` links to the new screen docs and component catalog.
- No canonical route rules were moved out of `06-routing-and-flows.md`.
- No canonical audio rules were moved out of `10-audio-and-sound.md`.
- No canonical privacy rules were moved out of `11-privacy-and-analytics.md`.
- No speculative future screens or components were added beyond MVP needs.

---

## Codex Working Rules

When editing:

1. Preserve existing product facts.
2. Do not invent new UI behavior.
3. Link to owning docs instead of duplicating full behavior rules.
4. Keep per-screen docs implementation-facing.
5. Keep component catalog practical, not exhaustive.
6. Do not introduce pixel-perfect CSS specs into product docs.
7. Do not move stable product behavior into `DESIGN.md`.
8. Do not migrate all screens in this first pass.
9. Prefer small, reviewable changes.
10. If uncertain, leave an `Open question` in the owning document.
