---
description: Per-screen implementation contract for the Alphabet catalog screen in the game client.
---

# Alphabet Catalog Screen

## Summary

- Role: browse grouped alphabet content, preview letter audio, and choose what to Study or Play
- Entry point: `/{locale}/app/learn/explore/alphabet`
- Route binding: `/{locale}/app/learn/explore/alphabet`
- Screen type: route screen
- Parent flow: Explore flow
- Primary user question: which alphabet set do I want to work with right now?
- Primary decision: select one alphabet lesson or the alphabet module review set

## Source links

- Routing: [Routing and Flows](../06-routing-and-flows.md)
- UI system: [Ui System](../08-ui-system.md)
- Component catalog: [Component Catalog](../12-component-catalog.md)
- Audio: [Audio and Sound](../10-audio-and-sound.md)

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Top bar | yes | `TopBar`, `TitleBlock`, `MutedAudioControl` | Back action, two-line title, and sound toggle |
| Lessons section | yes | `LessonCard`, `PreviewGrid`, `PreviewSlot` | Alphabet lesson list |
| Full-review section | yes | `FullReviewCard`, `PreviewGrid`, `PreviewSlot` | Full review targets module-review routes |
| Selected study-resource surface | yes | `SelectedResourceDrawer` | Contextual, dismissible, non-modal Study/Play launch surface |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `TopBar` | Route-level chrome with back action | Explore / Alphabet title pattern | [Component Catalog](../12-component-catalog.md) |
| `TitleBlock` | Shows `Explore` and `Alphabet` | two-line title | [Component Catalog](../12-component-catalog.md) |
| `MutedAudioControl` | Toggle alphabet preview audio | available, muted, lightweight preview muted | [Component Catalog](../12-component-catalog.md) |
| `LessonCard` | Select one alphabet lesson | default, selected resource context | [Component Catalog](../12-component-catalog.md) |
| `FullReviewCard` | Select the alphabet module review set | full-review variant | [Component Catalog](../12-component-catalog.md) |
| `PreviewGrid` | Shows letter preview assets inside cards | alphabet preview grid | [Component Catalog](../12-component-catalog.md) |
| `PreviewSlot` | Hosts one letter preview asset | tappable preview slot | [Component Catalog](../12-component-catalog.md) |
| `SelectedResourceDrawer` | Hosts Study and Play actions for the selected resource | open, dismissed, updated-in-place | [Component Catalog](../12-component-catalog.md) |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| default | route loads normally | show title, lesson cards, full-review card, and no dock | MVP route state |
| resource selected | user selects a lesson or full review | show selected study-resource surface with Study and Play actions | Surface is contextual and non-modal |
| sound enabled | sound preference is enabled | alphabet preview taps may play audio | Helper copy depends on sound state |
| sound disabled | sound preference is disabled | alphabet preview taps still select context but fail silently for audio playback | Canonical muted behavior lives in Audio and Sound |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Return to Explore | tap back action | navigate to `/{locale}/app/learn/explore` | [Routing and Flows](../06-routing-and-flows.md) |
| Select alphabet lesson | tap lesson card or one of its preview letters | select the containing lesson context | This screen |
| Select alphabet full review | tap the full-review card | select the alphabet module review set | This screen |
| Preview alphabet audio | tap a preview letter while sound is enabled | play that letter's audio and select the containing lesson context | [Audio and Sound](../10-audio-and-sound.md) |
| Toggle alphabet preview audio | use the sound control | update global sound preference for preview behavior | [Audio and Sound](../10-audio-and-sound.md) |
| Open Study | activate Study in the selected study-resource surface | navigate to the canonical Study route for the selected resource | [Routing and Flows](../06-routing-and-flows.md) |
| Open Play | activate Play in the selected study-resource surface | navigate to the canonical Play route for the selected resource | [Routing and Flows](../06-routing-and-flows.md) |

## Content

- Title pattern:
  - `Explore`
  - `Alphabet`
- Helper copy: depends on sound state
- Current lesson set:
  - `The five vowels`
  - `Sounds you know`
  - `More easy sounds`
  - `Puff and Pop`
  - `The K family`
  - `Hissing sounds`
  - `Buzzing sounds`
- Full review label: `Full review`

## Behavior notes

- Shared module-browser pattern context remains in [Screens](../07-screens.md).
- Tapping a preview letter selects the containing lesson context.
- When sound is enabled, tapping a preview letter also plays that letter's audio.
- When sound is disabled, alphabet preview taps fail silently for audio playback.
- Full review includes all alphabet letters and targets module-review routes, not an authored lesson.
- Route-level back-target ownership lives in [Routing and Flows](../06-routing-and-flows.md).

## Design notes

- Keep the screen aligned to the shared module-browser pattern.
- Use the alphabet-specific preview language from [Ui System](../08-ui-system.md).
- The selected study-resource surface should stay contextual rather than turning into embedded Study.

## Accessibility notes

- The page needs one clear primary heading while preserving the visible two-line title pattern.
- Preview letters and cards must remain clear tap targets.
- The sound control should stay visible as an explicit control even when sound is disabled.

## Not this

- Do not show the dock on this screen.
- Do not turn the selected study-resource surface into embedded Study content.
- Do not treat the alphabet preview mute state as a disabled or error state.
- Do not convert the full-review target into an authored lesson.

## Storybook coverage

- Alphabet catalog composition
- `LessonCard`: alphabet lesson
- `FullReviewCard`: alphabet full review
- `MutedAudioControl`: alphabet preview enabled
- `MutedAudioControl`: alphabet preview muted
- `SelectedResourceDrawer`: lesson selected
- `SelectedResourceDrawer`: full review selected

## Open questions

- Exact visual treatment that distinguishes the full-review card without changing its internal grid model.
- Sound-toggle iconography and label treatment.
