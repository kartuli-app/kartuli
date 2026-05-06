---
description: Per-screen implementation contract for the Game Results flow screen in the game client.
---

# Game Results Screen

## Summary

- Role: close the session, show what the student missed, and direct the next useful action
- Entry point: after the final round resolves
- Route binding: `/{locale}/app/learn/lessons/{lessonId}/play`, `/{locale}/app/learn/modules/{moduleId}/review/play`
- Screen type: flow screen
- Parent flow: Play flow
- Primary user question: how did I do, what should I review, and what do I want to do next?
- Primary decision: replay, return to Study, or choose something else

## Source links

- Routing: [Routing and Flows](../../06-routing-and-flows.md)
- UI system: [Ui System](../../08-ui-system.md)
- Component catalog: [Component Catalog](../../12-component-catalog.md)
- Roadmap decisions: [Roadmap and Decisions](../../04-roadmap-and-decisions.md)

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Results header | yes | `TitleBlock` | No back arrow; header uses a two-line pattern with score summary and lightweight tone line |
| Failed-items review area | yes | `ResultsReviewBlock`, `StudyNavBar`, `SummaryCard`, `DetailCard` | Opens on summary first and reuses the Study summary and detail navigation pattern |
| Results action area | yes | Screen actions | CTA actions sit below the review area |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `TitleBlock` | Results-specific two-line header | score summary / tone line | [Component Catalog](../../12-component-catalog.md) |
| `ResultsReviewBlock` | Failed-item review container or success state container | failed items, nothing failed success state | [Component Catalog](../../12-component-catalog.md) |
| `StudyNavBar` | Reused summary/detail navigation pattern inside failed-item review | summary first, detail navigation | [Component Catalog](../../12-component-catalog.md) |
| `SummaryCard` | Review opens on summary first | failed-item summary | [Component Catalog](../../12-component-catalog.md) |
| `DetailCard` | Review detail for failed items | correct answer and detail only | [Component Catalog](../../12-component-catalog.md) |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| failed items available | the completed session has at least one failed item | show the failed-items review area with deduplicated failed items | Review prioritizes immediate learning value |
| nothing failed | the completed session has no failed items | show a success card in the review area instead of failed-item review | The screen still keeps the same general structure |
| summary first | the Results screen first opens | failed-item review starts on summary before moving into detail | Reuses the Study summary/detail navigation pattern |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Play again | activate `Play again` | return to the Lobby for the same resource instead of starting immediately | This screen |
| Back to Study | activate `Back to Study` | return to the canonical Study route for the current resource | [Routing and Flows](../../06-routing-and-flows.md) |
| Choose something else | activate `Choose something else` | leave this completed session and choose a different learning option | This screen |
| Open failed-item detail | move from summary into a failed item | show the failed item's detail view | This screen |
| Return to failed-item summary | navigate back from failed-item detail | return to the failed-item summary view | This screen |

## Content

- Results header uses a two-line pattern:
  - score summary
  - lightweight tone and mood line
- Show only failed items in the review area.
- Deduplicate failed items across repeated misses.
- Review shows the correct answer and detail only, not the wrong choices again.
- Failed-item review opens on summary first.
- If nothing was failed, show a success card in the same area.
- `Play again` returns to the Lobby first instead of starting immediately.

## Behavior notes

- Results use explicit next-step actions instead of a back arrow. Canonical route behavior lives in [Routing and Flows](../../06-routing-and-flows.md).
- The failed-item review should feel related to Study without becoming the Study route.
- Results prioritize failed-item review rather than replaying the whole session history. Supporting decision context lives in [Roadmap and Decisions](../../04-roadmap-and-decisions.md).

## Design notes

- Keep the screen reflective and useful, not just celebratory.
- The review area should feel closely related to Study without becoming a route handoff.
- The action area should make the next useful step easy to spot after review.

## Accessibility notes

- The results header still needs one clear primary heading while preserving the visible two-line pattern.
- Failed-item summary and detail states should stay easy to distinguish and navigate.
- The success state should remain meaningful without relying on celebratory styling alone.

## Not this

- Do not add a back arrow to Results.
- Do not replay the whole session history in the main review area.
- Do not show wrong answer choices again in failed-item review.
- Do not make `Play again` start immediately without returning to the Lobby first.

## Storybook coverage

- Game Results composition: failed items available
- Game Results composition: nothing failed success state
- `ResultsReviewBlock`: failed-item summary
- `ResultsReviewBlock`: failed-item detail
- `ResultsReviewBlock`: success state

## Open questions

- Exact tone and mood buckets such as `Very good`, `Not bad`, or `Keep trying`.
- Exact destination for `Choose something else`.
