---
description: Per-screen implementation contract for the Game Round flow screen in the game client.
---

# Game Round Screen

## Summary

- Role: present one active round and accept an immediate answer
- Entry point: when the next prepared round becomes active
- Route binding: `/{locale}/app/learn/lessons/{lessonId}/play`, `/{locale}/app/learn/modules/{moduleId}/review/play`
- Screen type: flow screen
- Parent flow: Play flow
- Primary user question: what is the correct answer for this cue?
- Primary decision: answer the current round now

## Source links

- Routing: [Routing and Flows](../../06-routing-and-flows.md)
- UI system: [Ui System](../../08-ui-system.md)
- Component catalog: [Component Catalog](../../12-component-catalog.md)
- Audio: [Audio and Sound](../../10-audio-and-sound.md)

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Round header | yes | `TopBar`, `ProgressIndicator`, `MutedAudioControl` | Leave-game action replaces a normal back arrow; hybrid progress stays visible; study-resource title stays hidden during active rounds |
| Cue area | yes | `CueBlock` | Cue payload may be text, visual, or audio; replay and cue-specific controls live here |
| Answer area | yes | `AnswerOption` | Instruction prompt sits in or just above this area; four equal answer options live here |
| Leave confirmation overlay | conditional | `LeaveGameConfirmation` | Opens only when the user tries to leave an active session |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `TopBar` | Route-level chrome for the active-round header | leave-game active round pattern | [Component Catalog](../../12-component-catalog.md) |
| `ProgressIndicator` | Hybrid session progress in the active-round header | active round progress | [Component Catalog](../../12-component-catalog.md) |
| `MutedAudioControl` | Sound state and replay availability for audio-capable rounds | available, muted explicit control | [Component Catalog](../../12-component-catalog.md) |
| `CueBlock` | Cue presentation and replay affordance | text, visual, audio-capable cue | [Component Catalog](../../12-component-catalog.md) |
| `AnswerOption` | Immediate answer selection | default four-option set | [Component Catalog](../../12-component-catalog.md) |
| `LeaveGameConfirmation` | Guard against accidental session loss | closed, open | [Component Catalog](../../12-component-catalog.md) |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| active round ready | the next prepared round becomes active | show cue, prompt, answers, and updated progress | Default round state |
| listening round | the prepared round includes listening audio | autoplay once on round entry; replay remains available before answering | Listening-round inclusion is fixed once the session starts |
| sound disabled during round | global sound turns off during an active session | replay controls stay visible and explain why playback is unavailable | Canonical sound behavior lives in Audio and Sound |
| input guard active | a new round first appears | short guard prevents accidental carry-over taps before normal answering resumes | Each round starts with brief protection |
| leave confirmation open | the user triggers the leave-game action | show the blocking confirmation surface above the round | Surface family and leave behavior are owned elsewhere |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Submit answer | tap one of four answer options | submit immediately and lock round inputs right away | This screen |
| Submit answer by keyboard | press `1`, `2`, `3`, or `4` on desktop | submit the mapped answer immediately | This screen |
| Replay cue audio | activate replay on a listening round before answering | replay the current cue when sound is available | [Audio and Sound](../../10-audio-and-sound.md) |
| Toggle sound | use the sound control during an active round | update global sound preference and affect playback immediately without regenerating the prepared sequence | [Audio and Sound](../../10-audio-and-sound.md) |
| Open leave confirmation | activate the leave-game action | show the blocking confirmation surface | [Ui System](../../08-ui-system.md) |
| Resume game | choose `Resume game` from the confirmation surface | dismiss the confirmation and return to the active round | [Ui System](../../08-ui-system.md) |
| Leave game | choose `Leave game` from the confirmation surface | abandon the current session and return to the canonical Study route for the resource | [Routing and Flows](../../06-routing-and-flows.md) |

## Content

- Cue payload may be text, visual, or audio.
- Hybrid progress remains visible throughout the round.
- Study-resource title stays hidden during active rounds.
- Instruction prompt sits in or just above the answer area.
- Four answer options should feel equal in importance and size.
- Listening rounds autoplay once when the round appears.
- Replay remains available before answering on listening rounds.

## Behavior notes

- Active Play rounds use a leave-game action instead of a normal back arrow. Canonical route behavior lives in [Routing and Flows](../../06-routing-and-flows.md).
- Each new round starts with a short input guard to prevent accidental carry-over taps.
- Answer submission is immediate and locks inputs right away.
- Desktop answer bindings use `1`, `2`, `3`, and `4`.
- Muted replay controls stay visible and explain why playback is unavailable.
- Changing sound during an active session affects playback immediately and does not regenerate the prepared round sequence. Canonical sound behavior lives in [Audio and Sound](../../10-audio-and-sound.md).

## Design notes

- Prioritize speed, clarity, and focus over heavy explanation.
- Keep cue and answers clearly separated.
- Answer options should feel equal in importance and size.

## Accessibility notes

- Cue and answer regions should remain easy to distinguish at a glance.
- The four answer options need clear labels and keyboard access.
- Replay and leave controls should remain reachable without competing with answer selection.

## Not this

- Do not show a normal back arrow during active rounds.
- Do not hide muted replay controls when sound is disabled.
- Do not delay answer submission behind an extra confirmation step.
- Do not mix answer options with non-answer CTA hierarchy.

## Storybook coverage

- Game Round composition
- `CueBlock`: text cue
- `CueBlock`: listening round with replay available
- `CueBlock`: listening round muted
- `AnswerOption`: default four-option set
- `ProgressIndicator`: active round
- `LeaveGameConfirmation`: round exit open

## Open questions

- None
