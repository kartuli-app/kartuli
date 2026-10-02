---
description: Token naming layers, Tailwind mappings and the workflow for changing a shared visual contract.
status: implemented
intent: reference
---

# Design Tokens

## Source and layers

`packages/tailwind-config/shared-styles.css` is both hand-maintained source and shipped CSS. `:root` defines primitive `--p-*`, semantic `--s-*` and component `--c-*` values. `@theme static` exposes Tailwind utility mappings. No external token generator must be run to update this contract.

Primitives are ingredients (raw colors, spacing, radii). Semantics give them roles in shell, panel and floating contexts. Component tokens define stable dimensions such as rail width, app-bar height and dock-item size. Prefer a role when styling a product component so a palette change does not require editing every feature.

## Mapping examples

| Runtime variable | Tailwind theme entry | Consumer example |
| --- | --- | --- |
| `--p-spacing-2` | `--spacing-p-spacing-2` | `p-p-spacing-2`, `gap-p-spacing-2` |
| `--p-radius-2` | `--radius-p-radius-2` | `rounded-p-radius-2` |
| `--s-color-panel-bg` | `--color-s-color-panel-bg` | `bg-s-color-panel-bg` |
| `--c-height-appbar` | `--spacing-height-appbar` | `h-height-appbar`, `mt-height-appbar` |

The spelling matters: existing utilities include the primitive `p-` prefix. Do not infer class names from prose examples without checking the mapping.

## Changing a token

Identify whether the change is a palette adjustment, a semantic role change or a component dimension. Reuse an existing role if its meaning matches; create a new semantic role when two meanings must vary independently. Add both the runtime variable and the correct Tailwind namespace mapping when a new utility is required.

Search consumers before changing or removing a name. Verify both apps' Tailwind integration tests, token/component stories, focused browser behavior and full validation. Inspect hover, focus, selected and disabled states, not just the default color. Update this contract when naming/layer conventions change.

## Limits

Integration tests compile the entry stylesheet through PostCSS/Tailwind and assert emitted variables/mappings; they do not check every class or visual result. Raw structural utilities remain useful. A token is not automatically accessible: color combinations, focus visibility and geometry must be checked in context. See [Color and theming](./02-color-and-theming.md), [layout](./04-layout-and-spacing.md) and [Accessibility](../06-quality/02-accessibility.md).
