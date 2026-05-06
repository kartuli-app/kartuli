---
description: Per-screen implementation contract for the Explore entry screen in the game client.
---

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
| `PageHeader` | Branded entry header | default | [Component Catalog](../12-component-catalog.md) |
| `TitleBlock` | Shows Explore title and support copy | default | [Component Catalog](../12-component-catalog.md) |
| `DestinationCard` | Alphabet and Vocabulary choices | alphabet, vocabulary | [Component Catalog](../12-component-catalog.md) |
| `BottomDock` | Top-level navigation | Learn active | [Component Catalog](../12-component-catalog.md) |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| default | route loads normally | show Explore header, two destination cards, and dock | MVP state |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Open Alphabet | tap Alphabet card | navigate to `/{locale}/app/learn/explore/alphabet` | [Routing and Flows](../06-routing-and-flows.md) |
| Open Vocabulary | tap Vocabulary card | navigate to `/{locale}/app/learn/explore/vocabulary` | [Routing and Flows](../06-routing-and-flows.md) |
| Open Translit | tap dock Translit item | navigate to `/{locale}/app/translit` | [Routing and Flows](../06-routing-and-flows.md) |
| Open Settings | tap dock Settings item | navigate to `/{locale}/app/settings` | [Routing and Flows](../06-routing-and-flows.md) |

## Content

- Title: `Explore`
- Support copy: `Choose what you want to learn.`
- Alphabet card copy: `Learn Georgian letters step by step.`
- Vocabulary card copy: `Learn useful words and phrases by topic.`

## Behavior notes

- The screen must not mix current Explore behavior with future Recommended logic.
- Learn entry does not show a back button.
- Dock visibility is defined in [Routing and Flows](../06-routing-and-flows.md).

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
- `DestinationCard`: Alphabet
- `DestinationCard`: Vocabulary
- `BottomDock`: Learn active

## Open questions

- Exact mascot/logo treatment in the header.
- Whether the mascot appears only in the header or also inside the cards.
