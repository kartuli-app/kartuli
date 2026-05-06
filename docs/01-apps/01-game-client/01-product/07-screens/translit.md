---
description: Per-screen implementation contract for the Translit utility screen in the game client.
---

# Translit Screen

## Summary

- Role: transliterate text between Georgian and Latin scripts and support token-level inspection
- Entry point: `/{locale}/app/translit`
- Route binding: `/{locale}/app/translit`
- Screen type: route screen
- Primary user question: how do I transliterate this text and inspect how the tokens map between scripts?
- Primary decision: enter source text, inspect the output, and optionally switch direction or copy the result

## Source links

- Routing: [Routing and Flows](../06-routing-and-flows.md)
- UI system: [Ui System](../08-ui-system.md)
- Component catalog: [Component Catalog](../12-component-catalog.md)
- Core: [Core](../05-core.md)

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Top bar | yes | `TopBar` | Route-level back target is intended to be owned by Routing and Flows; exact target needs explicit confirmation there |
| Source panel | yes | `TranslitSourcePanel` | Source actions live here |
| Transliteration panel | yes | `TranslitOutputPanel`, `TokenInspectionTooltip` | Output actions live here; token inspection is embedded in the output surface |
| Dock | yes | `BottomDock` | Translit active |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `TopBar` | Route-level chrome for the utility screen | Translit title pattern with route-level return action | [Component Catalog](../12-component-catalog.md) |
| `TranslitSourcePanel` | Source input and source-side actions | default editing state | [Component Catalog](../12-component-catalog.md) |
| `TranslitOutputPanel` | Read-only transliteration output and output-side actions | output ready state | [Component Catalog](../12-component-catalog.md) |
| `TokenInspectionTooltip` | Output-token inspection | inspection closed, inspection open | [Component Catalog](../12-component-catalog.md) |
| `BottomDock` | Top-level navigation | Translit active | [Component Catalog](../12-component-catalog.md) |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| live transliteration | source input changes | update transliteration output on every input change | Output is derived rather than manually edited |
| direction switched | the user switches direction | turn the current output into the new input and update the output accordingly | Direction is not persisted between visits in MVP |
| token inspection active | the user inspects an output token | reveal the matching source token inside the output inspection UI | Inspection uses token mapping rather than character-position comparison |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Enter source text | type or paste into the source panel | update the source text and transliterate live | This screen |
| Clear source text | activate the clear action in the source panel | clear the source text | This screen |
| Switch direction | activate the direction switch action | turn the current output into the new input and reverse transliteration direction | This screen |
| Copy output | activate the copy action in the output panel | copy the current transliteration output | This screen |
| Inspect token mapping | inspect an output token | reveal the matching source token | This screen |
| Return from top bar | activate the top-bar back action | follow the Translit return target owned by Routing and Flows | [Routing and Flows](../06-routing-and-flows.md) |

## Content

- Source text is editable.
- Output stays read-only.
- Output preserves whitespace runs.
- Punctuation stays attached to the surrounding token.
- Output-token inspection reveals the matching source token.
- Direction is not persisted between visits in MVP.

## Behavior notes

- Transliteration updates on every input change.
- Switching direction turns the current output into the new input.
- Output is tokenized for source/output inspection rather than character-position comparison.
- Dock visibility and top-level destination membership are owned by [Routing and Flows](../06-routing-and-flows.md).

## Design notes

- Use a practical utility treatment.
- Prioritize fast editing, panel separation, and readable text.

## Accessibility notes

- Source and output panels should remain easy to distinguish.
- The output panel should clearly communicate that it is read-only.
- Token inspection should remain reachable without requiring the user to infer hidden structure.

## Not this

- Do not persist direction between visits in MVP.
- Do not make the output directly editable.
- Do not collapse token inspection into character-position comparison.
- Do not detach punctuation from the surrounding token.

## Storybook coverage

- Translit composition
- `TranslitSourcePanel`: editing
- `TranslitOutputPanel`: output ready
- `TokenInspectionTooltip`: token inspection open
- `BottomDock`: Translit active

## Open questions

- Exact top-bar back target for Translit in [Routing and Flows](../06-routing-and-flows.md).
- Whether token tooltips should later include translations for recognized vocabulary.
- Whether the screen should later support loading example text from learning content.
