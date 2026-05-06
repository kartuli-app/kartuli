---
description: Per-screen implementation contract for the Vocabulary catalog screen in the game client.
---

# Vocabulary Catalog Screen

## Summary

- Role: browse vocabulary lessons in the current module and choose what to Study or Play
- Entry point: `/{locale}/app/learn/explore/vocabulary`
- Route binding: `/{locale}/app/learn/explore/vocabulary`
- Screen type: route screen
- Parent flow: Explore flow
- Primary user question: which vocabulary set do I want to work with right now?
- Primary decision: select one vocabulary lesson or the vocabulary module review set

## Source links

- Routing: [Routing and Flows](../06-routing-and-flows.md)
- UI system: [Ui System](../08-ui-system.md)
- Component catalog: [Component Catalog](../12-component-catalog.md)

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Top bar | yes | `TopBar`, `TitleBlock` | Back action and two-line title |
| Module header | yes | `ModuleHeader` | Current module context |
| Lessons section | yes | `LessonCard`, `PreviewGrid`, `PreviewSlot` | Vocabulary lesson list |
| Full-review section | yes | `FullReviewCard`, `PreviewGrid`, `PreviewSlot` | Full review targets module-review routes |
| Selected study-resource surface | yes | `SelectedResourceDrawer` | Contextual, dismissible, non-modal Study/Play launch surface |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `TopBar` | Route-level chrome with back action | Explore / Vocabulary title pattern | [Component Catalog](../12-component-catalog.md) |
| `TitleBlock` | Shows `Explore` and `Vocabulary` | two-line title | [Component Catalog](../12-component-catalog.md) |
| `ModuleHeader` | Shows current module context | default | [Component Catalog](../12-component-catalog.md) |
| `LessonCard` | Select one vocabulary lesson | default, selected resource context | [Component Catalog](../12-component-catalog.md) |
| `FullReviewCard` | Select the vocabulary module review set | full-review variant | [Component Catalog](../12-component-catalog.md) |
| `PreviewGrid` | Shows visual preview assets inside cards | vocabulary preview grid | [Component Catalog](../12-component-catalog.md) |
| `PreviewSlot` | Hosts one preview asset | visual-only slot, possible overflow slot | [Component Catalog](../12-component-catalog.md) |
| `SelectedResourceDrawer` | Hosts Study and Play actions for the selected resource | open, dismissed, updated-in-place | [Component Catalog](../12-component-catalog.md) |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| default | route loads normally | show title, module header, lesson cards, full-review card, and no dock | MVP route state |
| resource selected | user selects a lesson or full review | show selected study-resource surface with Study and Play actions | Surface is contextual and non-modal |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Return to Explore | tap back action | navigate to `/{locale}/app/learn/explore` | [Routing and Flows](../06-routing-and-flows.md) |
| Select vocabulary lesson | direct interaction inside a lesson card | select that lesson resource | This screen |
| Select vocabulary full review | direct interaction inside the full-review card | select the vocabulary module review set | This screen |
| Open Study | activate Study in the selected study-resource surface | navigate to the canonical Study route for the selected resource | [Routing and Flows](../06-routing-and-flows.md) |
| Open Play | activate Play in the selected study-resource surface | navigate to the canonical Play route for the selected resource | [Routing and Flows](../06-routing-and-flows.md) |

## Content

- Title pattern:
  - `Explore`
  - `Vocabulary`
- Current module title: `Everyday basics`
- Current route acts as the module browser for the only authored vocabulary module.
- Preview assets are visual-only in MVP and do not add preview audio.
- Preview ordering follows authored item order.
- The last preview slot may become an overflow slot when needed.
- Full review label: `Full review`

## Behavior notes

- Shared module-browser pattern context remains in [Screens](../07-screens.md).
- Selection starts from direct interaction inside lesson and review cards.
- Study and Play actions live in the selected study-resource surface.
- Full review targets vocabulary module-review routes rather than an authored lesson route.
- Route-level back-target ownership lives in [Routing and Flows](../06-routing-and-flows.md).

## Design notes

- Keep the screen aligned to the shared module-browser pattern.
- Avoid turning the screen into a dense vocabulary table.
- Keep the selected study-resource surface contextual rather than turning it into embedded Study.

## Accessibility notes

- The page needs one clear primary heading while preserving the visible two-line title pattern.
- Lesson and review cards must remain clear tap targets.
- Visual previews should support recognition without becoming the only way to identify a lesson.

## Not this

- Do not show the dock on this screen.
- Do not add preview audio to vocabulary assets in MVP.
- Do not turn the selected study-resource surface into embedded Study content.
- Do not convert the full-review target into an authored lesson.

## Storybook coverage

- Vocabulary catalog composition
- `LessonCard`: vocabulary lesson
- `FullReviewCard`: vocabulary full review
- `SelectedResourceDrawer`: lesson selected
- `SelectedResourceDrawer`: full review selected
- `PreviewSlot`: default visual slot
- `PreviewSlot`: overflow slot

## Open questions

- Exact preview-slot count before overflow once real content is authored.
