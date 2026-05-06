---
description: Per-screen implementation contract for the Game Feedback flow screen in the game client.
---

# Game Feedback Screen

## Summary

- Role: resolve the answered round, teach what happened, and move to the next round
- Entry point: immediately after an answer resolves
- Route binding: `/{locale}/app/learn/lessons/{lessonId}/play`, `/{locale}/app/learn/modules/{moduleId}/review/play`
- Screen type: flow screen
- Parent flow: Play flow
- Primary user question: was I right, and if not, what was correct?
- Primary decision:
  - correct: continue immediately or let the wait finish
  - wrong: acknowledge the correction and continue

## Source links

- Routing: [Routing and Flows](../../06-routing-and-flows.md)
- UI system: [Ui System](../../08-ui-system.md)
- Component catalog: [Component Catalog](../../12-component-catalog.md)
- Audio: [Audio and Sound](../../10-audio-and-sound.md)

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Round header | yes | `TopBar`, `ProgressIndicator`, `MutedAudioControl` | Leave-game action remains available; round progress remains visible; sound state and control remain visible |
| Cue area | yes | `CueBlock` | Keeps the resolved cue context visible during feedback |
| Answer area in feedback state | yes | `AnswerOption` | Shows resolved answer states; answer hotkeys are inactive during feedback |
| Feedback surface | yes | `FeedbackNotification` | Lightweight feedback surface above the round content |
| Leave confirmation overlay | conditional | `LeaveGameConfirmation` | Opens only when the user tries to leave an active session |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `TopBar` | Route-level chrome for the feedback header | leave-game feedback pattern | [Component Catalog](../../12-component-catalog.md) |
| `ProgressIndicator` | Hybrid session progress in feedback | feedback progress | [Component Catalog](../../12-component-catalog.md) |
| `MutedAudioControl` | Visible sound state and control during feedback | available, muted explicit control | [Component Catalog](../../12-component-catalog.md) |
| `CueBlock` | Resolved cue context during feedback | resolved cue | [Component Catalog](../../12-component-catalog.md) |
| `AnswerOption` | Resolved answer presentation | correct, wrong, locked | [Component Catalog](../../12-component-catalog.md) |
| `FeedbackNotification` | Lightweight positive or negative feedback surface | positive, negative | [Component Catalog](../../12-component-catalog.md) |
| `LeaveGameConfirmation` | Guard against accidental session loss | closed, open | [Component Catalog](../../12-component-catalog.md) |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| correct feedback | the submitted answer resolves as correct | show lightweight positive feedback, keep resolved round visible, start a short wait, then auto-advance | Can be skipped before the wait completes |
| wrong feedback | the submitted answer resolves as wrong | reveal the correct answer, preserve the chosen wrong answer state, and disable the rest | Does not auto-advance |
| sound disabled during feedback | global sound turns off during an active session | sound state stays visible; audio behavior follows the current global preference | Canonical sound behavior lives in Audio and Sound |
| leave confirmation open | the user triggers the leave-game action | show the blocking confirmation surface above feedback | Surface family and leave behavior are owned elsewhere |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Continue after correct feedback | skip from the feedback surface or a safe round area | advance immediately to the next prepared round | This screen |
| Continue after wrong feedback | acknowledge the correction | advance to the next prepared round | This screen |
| Continue by keyboard | press `Space` on desktop when continuation is allowed | continue from feedback | This screen |
| Toggle sound | use the sound control during feedback | update global sound preference and affect playback immediately without regenerating the prepared sequence | [Audio and Sound](../../10-audio-and-sound.md) |
| Open leave confirmation | activate the leave-game action | show the blocking confirmation surface | [Ui System](../../08-ui-system.md) |
| Resume game | choose `Resume game` from the confirmation surface | dismiss the confirmation and return to feedback | [Ui System](../../08-ui-system.md) |
| Leave game | choose `Leave game` from the confirmation surface | abandon the current session and return to the canonical Study route for the resource | [Routing and Flows](../../06-routing-and-flows.md) |

## Content

- Keep the resolved cue visible during feedback.
- Keep round progress visible during feedback.
- Correct feedback uses a short wait and then auto-advances.
- Wrong feedback reveals the correct answer and waits for acknowledgment.
- Wrong feedback preserves the chosen wrong answer state and disables the remaining answers.
- `Space` continues from feedback on desktop when continuation is allowed.

## Behavior notes

- Active Play feedback uses a leave-game action instead of a normal back arrow. Canonical route behavior lives in [Routing and Flows](../../06-routing-and-flows.md).
- Answer hotkeys are inactive during feedback.
- Correct feedback should be skippable before the short wait finishes.
- Wrong feedback should not auto-advance.
- Changing sound during an active session affects playback immediately and does not regenerate the prepared round sequence. Canonical sound behavior lives in [Audio and Sound](../../10-audio-and-sound.md).

## Design notes

- Correct feedback should be fast and low-friction.
- Wrong feedback should teach without becoming a separate heavy screen.
- Keep the feedback surface lightweight relative to the round content.

## Accessibility notes

- Feedback tone should be understandable without relying on color alone.
- The resolved correct and wrong answer states need clear, persistent labeling during feedback.
- Continue affordances should remain obvious when continuation is allowed, including the desktop `Space` shortcut.

## Not this

- Do not turn feedback into a separate heavy interstitial screen.
- Do not auto-advance wrong feedback.
- Do not reactivate answer hotkeys during feedback.
- Do not hide the leave-game action during feedback.

## Storybook coverage

- Game Feedback composition: correct
- Game Feedback composition: wrong
- `FeedbackNotification`: positive
- `FeedbackNotification`: negative
- `AnswerOption`: correct, wrong, and locked resolved states
- `LeaveGameConfirmation`: feedback exit open

## Open questions

- None
