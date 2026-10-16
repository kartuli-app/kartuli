---
description: Token naming layers, Tailwind mappings and the workflow for changing a shared visual contract.
status: implemented
intent: reference
---

# Design Tokens

## Source and layers

`packages/design-system/index.css` is the public CSS entry point. It imports the hand-maintained
`primitives.css`, `semantics.css` and `components.css` files in that order. Each layer owns both its
runtime custom properties and its corresponding `@theme static` mappings. No external token generator,
Style Dictionary/DTCG pipeline or custom token build step is required.

Primitives are ingredients: raw colors, spacing and radii. Semantics give UI meaning to colors and
shared state values in the shell, panel and floating contexts. Component tokens define stable,
component-owned contracts such as rail width, app-bar height and dock-item size; they may resolve to a
primitive, semantic value or justified literal.

Normal product and shared React components must not use primitive color utilities such as
`bg-p-color-*`, `text-p-color-*` or `border-p-color-*`. Use a semantic role, adding the smallest role in
an existing context only when no current role expresses the meaning. Intentional primitive token
showcases and debug fixtures are exceptions. Primitive spacing and radius utilities are valid and
preferred when the equivalent Kartuli value exists.

Component tokens are for stable reusable component contracts, not every numeric class. Local content
layout and one-off composition can use a justified literal or arbitrary utility when no token is
equivalent. A component token may resolve to a primitive, a semantic token or a justified literal; do
not create component color aliases that merely repeat semantic colors.

## Mapping examples

| Runtime variable | Tailwind theme entry | Consumer example |
| --- | --- | --- |
| `--p-spacing-2` | `--spacing-p-spacing-2` | `p-p-spacing-2`, `gap-p-spacing-2` |
| `--p-radius-2` | `--radius-p-radius-2` | `rounded-p-radius-2` |
| `--s-color-panel-bg` | `--color-s-color-panel-bg` | `bg-s-color-panel-bg` |
| `--c-height-appbar` | `--spacing-height-appbar` | `h-height-appbar`, `mt-height-appbar` |

The spelling matters: existing utilities include the primitive `p-` prefix. Do not infer class names from prose examples without checking the mapping.

## Extending the vocabulary

Add a primitive only when real UI requires a genuinely new raw value, such as a missing shared color,
spacing step or radius. Do not add primitives in anticipation of future work.

Add a semantic token when the UI introduces a meaning that must vary independently. Reuse an existing
role when the meaning is the same, avoid feature names disguised as semantic roles and do not add a new
surface until product evidence shows that `shell`, `panel` and `floating` are insufficient.

Add a component token when a reusable component owns a stable visual or layout value as part of its
contract. Do not promote local composition values or every repeated number into the shared package.

## Changing a token

Identify whether the change is a palette adjustment, a semantic role change or a stable component
contract. Reuse an existing role if its meaning matches; create a new semantic role when two meanings
must vary independently. Do not introduce a new semantic surface without a concrete product need, and
do not add component color aliases that merely duplicate semantic roles. Add both the runtime variable
and the correct Tailwind namespace mapping when a new utility is required.

Search consumers before changing or removing a name. Verify both apps' Tailwind integration tests, token/component stories, focused browser behavior and full validation. Inspect hover, focus, selected and disabled states, not just the default color. Update this contract when naming/layer conventions change.

### Practical workflow

1. Search the runtime variable, `@theme` mapping and utility consumers before editing.
2. Change the owning layer under `packages/design-system`. Keep the runtime value and Tailwind
   namespace mapping together in that file.
3. If the primitive catalog changed, update
   `packages/ui/src/components/design-system-tokens/design-system-tokens.tsx` so Storybook displays it.
4. Update consuming components only when a role or utility name changed; a palette value change should
   normally flow through existing semantic mappings.
5. Run both CSS compilation tests, verify development recompilation in all three consumers, then run
   Storybook browser tests and the affected builds.

```bash
rg -n -- '--s-color-panel-bg|bg-s-color-panel-bg' packages apps tools
pnpm --filter @kartuli/game-client exec vitest run \
  src/root-layout/tailwind-integration.test.ts
pnpm --filter @kartuli/backoffice-client exec vitest run \
  src/domains/app-shell/tailwind-integration.test.ts
pnpm --filter @kartuli/storybook run test
pnpm run c:build:game-client
pnpm run c:build:backoffice-client
pnpm run c:build:storybook
pnpm run validate:all
```

The integration tests verify import order, source registration, representative runtime variables and
Tailwind mappings from all three layers. They do not exercise every token or prove watch behavior, so
inspect the token story, actual component states and live development recompilation before accepting a
visual change.

### Adding versus changing a role

Changing a primitive can affect many semantic roles at once. Changing a semantic mapping is appropriate
when the role's meaning stays stable but its appearance changes. Add a new semantic role when two
consumers need to evolve independently; do not give a raw palette value a feature-specific name inside
component code.

For a new dimension, choose the Tailwind namespace from its use: spacing mappings generate width,
height, margin, padding and gap utilities; radius mappings generate rounded utilities; color mappings
generate foreground/background/border utilities. Confirm the emitted class rather than assuming a
custom-property name creates it automatically.

Application customization belongs in the app's `theme.css` and is currently limited to selected
primitive color overrides. Shared semantic mappings, spacing, radius and component contracts remain in
the package. Game Client uses the defaults; Backoffice overrides its primitive brand/accent ramps to
prove app identity through the shared semantic contract. These theme files are not runtime or
user-selectable theme systems.

## Limits

Integration tests compile the entry stylesheet through PostCSS/Tailwind and assert emitted variables/mappings; they do not check every class or visual result. Raw structural utilities remain useful. A token is not automatically accessible: color combinations, focus visibility and geometry must be checked in context. See [Color and theming](./02-color-and-theming.md), [layout](./04-layout-and-spacing.md) and [Accessibility](../06-quality/02-accessibility.md).
