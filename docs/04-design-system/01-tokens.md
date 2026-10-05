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

### Practical workflow

1. Search the runtime variable, `@theme` mapping and utility consumers before editing.
2. Change `packages/tailwind-config/shared-styles.css`. Keep the primitive/semantic/component layer and
   the Tailwind namespace mapping together.
3. If the primitive catalog changed, update
   `packages/ui/src/components/design-system-tokens/design-system-tokens.tsx` so Storybook displays it.
4. Update consuming components only when a role or utility name changed; a palette value change should
   normally flow through existing semantic mappings.
5. Run both CSS compilation tests, then Storybook browser tests and the affected app build.

```bash
rg -n -- '--s-color-panel-bg|bg-s-color-panel-bg' packages apps tools
pnpm --filter @kartuli/game-client exec vitest run \
  src/root-layout/tailwind-integration.test.ts
pnpm --filter @kartuli/backoffice-client exec vitest run \
  src/domains/app-shell/tailwind-integration.test.ts
pnpm --filter @kartuli/storybook run test
pnpm run c:build:game-client
pnpm run validate:all
```

The integration tests should show two passing assertions per app: the shared variables exist and their
Tailwind mappings were emitted. They do not exercise every token, so inspect the token story and the
actual component states before accepting a visual change.

### Adding versus changing a role

Changing a primitive can affect many semantic roles at once. Changing a semantic mapping is appropriate
when the role's meaning stays stable but its appearance changes. Add a new semantic role when two
consumers need to evolve independently; do not give a raw palette value a feature-specific name inside
component code.

For a new dimension, choose the Tailwind namespace from its use: spacing mappings generate width,
height, margin, padding and gap utilities; radius mappings generate rounded utilities; color mappings
generate foreground/background/border utilities. Confirm the emitted class rather than assuming a
custom-property name creates it automatically.

## Limits

Integration tests compile the entry stylesheet through PostCSS/Tailwind and assert emitted variables/mappings; they do not check every class or visual result. Raw structural utilities remain useful. A token is not automatically accessible: color combinations, focus visibility and geometry must be checked in context. See [Color and theming](./02-color-and-theming.md), [layout](./04-layout-and-spacing.md) and [Accessibility](../06-quality/02-accessibility.md).
