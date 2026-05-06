---
description: Per-screen implementation contract for the Privacy screen in the game client.
---

# Privacy Screen

## Summary

- Role: present the privacy notice as readable longform content and explain storage and analytics behavior
- Entry point: `/{locale}/privacy`
- Route binding: `/{locale}/privacy`
- Screen type: route screen
- Primary user question: what does the app store, what does consent control, and where can I read the full privacy notice?
- Primary decision: read and understand the privacy notice

## Source links

- Routing: [Routing and Flows](../06-routing-and-flows.md)
- UI system: [Ui System](../08-ui-system.md)
- Component catalog: [Component Catalog](../12-component-catalog.md)
- Privacy: [Privacy and Analytics](../11-privacy-and-analytics.md)

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Top bar | yes | `TopBar` | Route title and back action; in-app return target is owned by Routing and Flows |
| Longform content area | yes | `ReadingSurface` | Calm reading surface for the privacy notice |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `TopBar` | Route-level chrome with route title and return action | Privacy title pattern | [Component Catalog](../12-component-catalog.md) |
| `ReadingSurface` | Readable longform legal content | localized privacy notice | [Component Catalog](../12-component-catalog.md) |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| localized privacy notice | the active locale resolves a supported privacy document | show the matching longform privacy content | Current content sources are `privacy-en.md` and `privacy-ru.md` |
| in-app return context | the Privacy page is opened from inside the app shell | show the return action to Learn | Canonical in-app return target is owned by Routing and Flows |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Return to Learn | activate the top-bar back action | return to `/{locale}/app/learn` when shown inside the app shell | [Routing and Flows](../06-routing-and-flows.md) |

## Content

- Top bar title: `Privacy`
- Content sources:
  - `privacy-en.md`
  - `privacy-ru.md`
- Content stays legal and informational rather than promotional.

## Behavior notes

- The Privacy page is a standalone public route and may also be reached from inside the app. Canonical route behavior lives in [Routing and Flows](../06-routing-and-flows.md).
- Storage, privacy-consent behavior, and analytics behavior are owned by [Privacy and Analytics](../11-privacy-and-analytics.md).
- The privacy page must remain reachable from the privacy banner flow. Canonical banner and consent flow behavior lives in [Routing and Flows](../06-routing-and-flows.md) and [Ui System](../08-ui-system.md).

## Design notes

- Use a calm reading surface.
- Prioritize typography, spacing, and readable line length.

## Accessibility notes

- The page needs a clear primary heading and readable longform hierarchy.
- Reading comfort should take priority over dense utility layout.
- The return action should remain easy to find without competing with the notice content.

## Not this

- Do not show the dock on the Privacy page.
- Do not turn the Privacy page into a settings-style control panel.
- Do not make the notice feel promotional.

## Storybook coverage

- Privacy screen composition
- `ReadingSurface`: localized longform notice

## Open questions

- Whether the top bar should use mascot/logo only or mascot/logo plus brand text.
