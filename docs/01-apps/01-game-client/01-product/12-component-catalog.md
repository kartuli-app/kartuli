---
description: Implementation-facing component contracts, usage locations, variants, states, caveats, token guidance, and Storybook requirements for the game client.
---

# Component Catalog

This document owns the implementation-facing component catalog for the game client.

It bridges:

- screen contracts
- UI-system rules
- `DESIGN.md` tokens
- Storybook implementation
- React component implementation

[Ui System](./08-ui-system.md) owns reusable UI principles and component-family rules.
This document owns concrete component contracts, usage locations, variants, states, caveats, token guidance, and Storybook requirements.

Component names in this catalog use implementation-facing names such as `BottomDock` and `AnswerOption`.
[Ui System](./08-ui-system.md) continues to own the reusable family vocabulary such as `dock`, `page-header`, and `answer-option`.

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
| `TitleBlock` | Shell / navigation | Explore, catalog, Study, Play, results | planned |
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
| `LobbyPanel` | Play | Play Lobby | planned |
| `ProgressIndicator` | Play | Game Round, Game Feedback | planned |
| `CueBlock` | Play | Game Round, Game Feedback | planned |
| `AnswerOption` | Play | Game Round, Game Feedback | planned |
| `FeedbackNotification` | Feedback | Game Feedback, global notification cases | planned |
| `ResultsReviewBlock` | Play results | Game Results | planned |
| `LeaveGameConfirmation` | Blocking overlay | Game Round, Game Feedback | planned |
| `MutedAudioControl` | Audio | Alphabet catalog, Study, Play | planned |
| `ReadingSurface` | Public / utility | Privacy | planned |
| `SettingsSection` | Utility | Settings | planned |
| `PrivacyBanner` | Global surface | App init when consent is unknown | planned |
| `TranslitSourcePanel` | Utility | Translit | planned |
| `TranslitOutputPanel` | Utility | Translit | planned |
| `TokenInspectionTooltip` | Tooltip | Translit | planned |

## `MutedAudioControl`

### Role

A visible audio control or audio affordance used when an audio-capable screen exposes manual playback or sound control.

### Used by screens

| Screen | Usage |
|---|---|
| Alphabet catalog | Sound toggle and lightweight preview behavior |
| Study | Explicit audio controls for audio-capable resources |
| Game Lobby | Sound toggle and listening-round availability |
| Game Round | Replay cue audio for listening rounds |
| Game Round Feedback | Sound state remains visible |

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

- available and selected audio states may use the accent family led by `brand-color-primary` and `brand-color-primary-soft`
- muted surfaces and icons should stay in the neutral family such as `brand-color-neutral` and `brand-color-neutral-soft`
- borders should stay in the current neutral border treatment, typically from the `brand-color-neutral*` family
- do not use `brand-color-semantic-error*` for muted state styling
- reuse the shared `brand-radius-*` family rather than defining a component-only radius here

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

- default and locked states should stay on the neutral token family such as `brand-color-neutral-soft` and `brand-color-neutral`
- selected state may use the accent selection family led by `brand-color-primary-soft` and `brand-color-primary`
- correct state should use the success family led by `brand-color-semantic-success-soft` and `brand-color-semantic-success`
- wrong state should use the error family led by `brand-color-semantic-error-soft` and `brand-color-semantic-error`
- reuse the shared `brand-radius-*` family and neutral/semantic border treatments instead of defining a component-only size here

### Behavior notes

- Answer submission is immediate.
- Inputs lock right away after selection.
- Desktop answer bindings use `1`, `2`, `3`, and `4`.
- During feedback, answer hotkeys are inactive.
- Reusable family guidance for this control lives in [Ui System](./08-ui-system.md).

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

- the dock surface should stay in the current neutral shell family, typically using `brand-color-neutral-soft` or the mapped shell-surface token derived from it
- active signal should use `brand-color-primary`
- inactive text and icon treatments should stay in the neutral family such as `brand-color-neutral`
- separators and borders should stay in the neutral family such as `brand-color-neutral-soft`
- do not use success or error token families for normal navigation state

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
