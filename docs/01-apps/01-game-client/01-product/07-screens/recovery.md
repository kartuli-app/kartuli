---
description: Grouped implementation contract for the recovery route states in the game client.
---

# Recovery Screens

## Summary

- Role: group the recovery route states that help the student recover from invalid URLs or missing learning resources
- Entry points:
  - global not-found route state
  - Study resource unavailable route state
  - Play resource unavailable route state
- Screen type: route states
- Primary user question: how do I continue from this invalid or unavailable route state?
- Primary decision: return to a safe destination

## Source links

- Core: [Core](../05-core.md)
- Routing: [Routing and Flows](../06-routing-and-flows.md)
- UI system: [Ui System](../08-ui-system.md)
- Component catalog: [Component Catalog](../12-component-catalog.md)
- Roadmap decisions: [Roadmap and Decisions](../04-roadmap-and-decisions.md)

## Shared recovery rules

- Recovery states stay distinct from normal route screens.
- Valid controlled routes with missing data use route-owned unavailable screens rather than collapsing into global not found.
- Recovery states do not show the dock.
- Recovery states should feel calm, branded, and easy to exit.

## Layout regions

| Region | Required | Used by states | Components | Notes |
|---|---:|---|---|---|
| Top bar | yes | global not found, Study resource unavailable, Play resource unavailable | `TopBar` | Route-owned unavailable states expose a Learn return action; global not found still uses the same recovery-shell region without adding extra dock navigation |
| Main recovery content area | yes | global not found, Study resource unavailable, Play resource unavailable | `PageHeader` | Holds short recovery copy and the recovery action |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `TopBar` | Recovery-shell chrome for route-state handling | global not found, Study unavailable, Play unavailable | [Component Catalog](../12-component-catalog.md) |
| `PageHeader` | Recovery title, explanation, and action surface | global not found, Study unavailable, Play unavailable | [Component Catalog](../12-component-catalog.md) |

## Recovery State Index

| State | Trigger | Primary action | Notes |
|---|---|---|---|
| Global not found | requested URL does not match a controlled route pattern after locale handling | go to Learn | Invalid URL recovery |
| Study resource unavailable | valid Study route cannot load its lesson or module review set | go to Learn | Must remain distinct from global not found |
| Play resource unavailable | valid Play route cannot load its lesson or module review set | go to Learn | MVP keeps recovery focused on Learn |

## Global Not Found

- Entry point: global not-found route state
- Main user question: where should I go now that this page does not exist?
- Primary decision: return to a safe destination

### Actions

- Primary:
  - go to Learn
- Secondary:
  - none

### Content

- short title
- short explanation
- no raw attempted URL shown in MVP UI

### Behavior notes

- Trigger ownership lives in [Routing and Flows](../06-routing-and-flows.md).
- This state is for invalid route intent, not for valid routes that fail to load data.

## Study Resource Unavailable

- Entry point:
  - `/{locale}/app/learn/lessons/{lessonId}/study`
  - `/{locale}/app/learn/modules/{moduleId}/review/study`
- Main user question: how do I continue if this study resource cannot be opened?
- Primary decision: return to Learn and choose another resource

### Actions

- Primary:
  - go to Learn
- Secondary:
  - return to Learn from the top bar

### Content

- message must distinguish resource unavailable from global not found
- message should not expose raw resource IDs

### Behavior notes

- Trigger ownership lives in [Routing and Flows](../06-routing-and-flows.md).
- This is a route-owned unavailable state for a valid Study route.

## Play Resource Unavailable

- Entry point:
  - `/{locale}/app/learn/lessons/{lessonId}/play`
  - `/{locale}/app/learn/modules/{moduleId}/review/play`
- Main user question: how do I continue if this study resource cannot be played?
- Primary decision: return to Learn and choose another resource

### Actions

- Primary:
  - go to Learn
- Secondary:
  - return to Learn from the top bar

### Content

- message must distinguish resource unavailable from global not found
- MVP recovery path stays focused on Learn instead of offering a secondary Study fallback here

### Behavior notes

- Trigger ownership lives in [Routing and Flows](../06-routing-and-flows.md).
- This is a route-owned unavailable state for a valid Play route.

## Design notes

- Use a calm, branded recovery treatment.
- Clarity beats cleverness.
- Route-owned unavailable states should reuse the normal app shell and stay calm and recoverable.

## Accessibility notes

- Each recovery state needs a clear heading, short explanation, and one obvious recovery action.
- Recovery copy should stay easy to scan and should not rely on mascot treatment alone.
- Recovery states should avoid exposing raw URLs or resource IDs in MVP UI.

## Not this

- Do not collapse route-owned unavailable states into global not found.
- Do not show the dock on recovery states.
- Do not expose raw attempted URLs or resource IDs in MVP UI.
- Do not offer a Study fallback from Play resource unavailable in MVP.

## Storybook coverage

- Global not found recovery composition
- Study resource unavailable composition
- Play resource unavailable composition

## Open questions

- Final localized title and copy for global not found.
- Whether Study resource unavailable should say `could not be found` or softer wording such as `is not available`.
