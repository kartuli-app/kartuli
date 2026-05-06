---
description: Per-screen implementation contract for the Play Lobby flow screen in the game client.
---

# Play Lobby Screen

## Summary

- Role: present the prepared session clearly and let the student start with minimal friction
- Entry point: immediately after Play resolves the current resource and prepares its initial plan
- Route binding: `/{locale}/app/learn/lessons/{lessonId}/play`, `/{locale}/app/learn/modules/{moduleId}/review/play`
- Screen type: flow screen
- Parent flow: Play flow
- Primary user question: am I ready to start, and do I want to adjust listening rounds first?
- Primary decision: start the prepared session

## Source links

- Routing: [Routing and Flows](../../06-routing-and-flows.md)
- UI system: [Ui System](../../08-ui-system.md)
- Component catalog: [Component Catalog](../../12-component-catalog.md)
- Audio: [Audio and Sound](../../10-audio-and-sound.md)

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Lobby header | yes | `TopBar`, `TitleBlock`, `MutedAudioControl` | Back arrow returns to Study; sound toggle remains visible |
| Session summary area | yes | `LobbyPanel` | Shows exact round count and compact variant summary |
| Session options area | yes | `LobbyPanel` | Shows whether listening rounds are included |
| Primary action area | yes | `LobbyPanel` | `Start` dominates; `Back to Study` sits near the primary action |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `TopBar` | Route-level chrome for the Lobby header | Play / current resource title pattern | [Component Catalog](../../12-component-catalog.md) |
| `TitleBlock` | Shows `Play` and the current study-resource title | two-line title | [Component Catalog](../../12-component-catalog.md) |
| `MutedAudioControl` | Sound toggle in the Lobby header | available, muted explicit control | [Component Catalog](../../12-component-catalog.md) |
| `LobbyPanel` | Main Lobby content and actions | prepared session, audio-capable options | [Component Catalog](../../12-component-catalog.md) |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| prepared session | Play resolves the current resource | show prepared plan, summary, options, and `Start` | Default Lobby state |
| audio-capable resource | current resource supports listening rounds | show the `Include listening rounds` control | Control defaults from the current global sound preference |
| sound disabled in Lobby | user turns sound off in Lobby | listening rounds turn off and the prepared plan regenerates | Canonical listening-round behavior lives in Audio and Sound |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Return to Study | tap the header back arrow | navigate to the canonical Study route for the current resource | [Routing and Flows](../../06-routing-and-flows.md) |
| Back to Study | activate the secondary action near the primary CTA | navigate to the canonical Study route for the current resource | [Routing and Flows](../../06-routing-and-flows.md) |
| Start session | activate `Start` | begin the prepared Play session | This screen |
| Toggle sound | use the sound toggle | update global sound preference for Play audio behavior | [Audio and Sound](../../10-audio-and-sound.md) |
| Include listening rounds | enable the Lobby listening-round control | regenerate the prepared plan with listening rounds included | [Routing and Flows](../../06-routing-and-flows.md) |
| Exclude listening rounds | disable the Lobby listening-round control | regenerate the prepared plan without listening rounds | [Routing and Flows](../../06-routing-and-flows.md) |

## Content

- Title pattern:
  - `Play`
  - current study-resource title
- Show exact round count.
- Show a compact variant summary.
- Show whether listening rounds are included.
- No extra item preview is required in MVP.

## Behavior notes

- Lobby back-arrow behavior is owned by [Routing and Flows](../../06-routing-and-flows.md).
- The Lobby prepares the game plan before the session starts.
- The `Include listening rounds` control appears only for audio-capable resources.
- When sound turns off in the Lobby, listening rounds turn off and the prepared plan regenerates.
- When sound turns on in the Lobby, the user may choose to turn listening rounds back on before starting.

## Design notes

- Keep the screen compact and utilitarian, but clearly the start of the core game experience.
- The `Start` action should dominate.

## Accessibility notes

- The screen needs one clear primary heading while preserving the visible two-line title pattern.
- The prepared-session summary and options should remain easy to scan before starting.
- The `Start` action should remain the clearest progression target.

## Not this

- Do not move `Back to Study` into the header-only action set.
- Do not require extra item preview before the session can start.
- Do not allow listening-round changes after the session has started.

## Storybook coverage

- Play Lobby composition
- `LobbyPanel`: prepared session
- `LobbyPanel`: audio-capable with listening rounds available
- `LobbyPanel`: sound off / listening rounds off
- `MutedAudioControl`: Lobby available
- `MutedAudioControl`: Lobby muted

## Open questions

- Exact visual format for the compact variant summary.
- Visual treatment for the `Back to Study` action.
