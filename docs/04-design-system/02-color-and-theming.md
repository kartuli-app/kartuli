---
description: Palette roles, visual contexts, Storybook brand overrides and theme verification.
status: implemented
intent: reference
---

# Color and Theming

## Current palette and roles

`primitives.css` defines neutral, brand and accent ramps plus selected success/danger colors.
`semantics.css` organizes shell, panel and floating surfaces and their content, border, action, control,
hover, selected and focus roles. Normal product/shared React code consumes those roles instead of
assuming that a primitive palette shade has a fixed UI meaning.

Do not use `bg-p-color-*`, `text-p-color-*`, `border-p-color-*`, raw CSS color literals, arbitrary
colors or generic Tailwind palette colors in normal React UI when the Design System already expresses
the meaning. Primitive colors are intentional only in token catalogs/showcases, Design System debug
fixtures, theme definitions, token implementation and tests that inspect primitive output. A normal
component story is not exempt merely because it is in Storybook.

Regular CSS may consume runtime variables from the layer it implements. The React rule does not ban a
semantic stylesheet from referencing primitives or an app theme from overriding permitted primitive
colors.

## Theme integration

The Design System supplies complete defaults. Each app imports its `theme.css` after
`@kartuli/design-system`; an app may override selected primitive colors there while semantic mappings,
spacing and radius remain shared. Game Client uses an empty/default theme integration. Backoffice
implements an emerald brand ramp and rose accent ramp as a deliberately small application identity
proof. It does not redefine semantic variables, spacing, radius or shared component dimensions.

Storybook supplies Game/default, Backoffice, Stress: Emerald and Stress: Rose controls through
`.storybook/preview.tsx` and `theme-wrappers.tsx`. Game/default has no overrides. Backoffice duplicates
the real app's 11 brand and 11 accent primitives, with exact parity enforced against production CSS.
The two synthetic stress modes override only the 11 brand primitives. Their 600 slots use the next
darker ramp value because that primitive backs selected surfaces paired with light text. Definitions
may not introduce semantic, neutral, spacing, radius or component variables.

One keyed wrapper applies a selected map to `document.documentElement`, recording previous inline
values and priorities before the change. Cleanup restores pre-existing values and removes values that
did not previously exist, preventing brand or accent state from leaking between stories.

These previews exercise how semantic roles follow primitives. They are not a persisted end-user theme chooser, a dark-mode contract or proof that every palette combination passes contrast checks.

Backoffice's production theme remains application-owned even though Storybook duplicates it as a real
review mode. Its darker emerald 500/600 values preserve border visibility and selected-action text
contrast in the current shell. The Backoffice Tailwind integration test verifies representative
overrides and rejects declarations outside the permitted brand/accent primitive namespaces.

## Changing colors

Change a primitive to alter the palette globally; change a semantic mapping to alter a role without redefining the palette. Check dependent roles and state combinations, including panel headers, outlines, floating content and focus rings. Keep wrapper overrides aligned with the primitive ramp if the shared names change.

Preview the affected components in each existing Storybook theme and in the app shell. Check computed styles if a portal inherits a different context. A custom property can exist while an incorrect mapping still prevents the intended utility from being generated.

Use the Storybook toolbar to compare Game/default, real Backoffice and both synthetic stress modes
without reloading. Backoffice changes brand and accent; Emerald and Rose change only brand. Neutral,
success, danger and semantic assignments remain shared in every mode. If an alternate preview does not
change a component, inspect whether it uses the relevant primitive-derived semantic role or a raw
unrelated value before changing the wrapper.

For a semantic color change, list every state consuming the role before editing. A safe review set for
an action includes default content/background/border, hover, focus ring, selected and disabled behavior
where implemented. For a surface, check content and border contrast plus any overlay rendered through a
portal. Run the commands in [Design Tokens](./01-tokens.md), then perform manual contrast/focus review;
axe reports some contrast failures but cannot validate the design intent of every token pairing.

A plausible palette ramp does not prove accessible resolved states. Review actual semantic
foreground/background pairings under every relevant theme, especially selected, hover and focus
states.

## Verification and boundaries

Use axe/browser checks and manual contrast/focus inspection in context. Do not declare a complete dark
theme, runtime theme switcher or alternate app brand contract until its surfaces and states are
specified and tested. Sources: `packages/design-system/primitives.css`, `semantics.css`, app
`theme.css` files, Storybook `preview.tsx`, `theme-wrappers.tsx` and token stories; [Design
tokens](./01-tokens.md) owns naming conventions.
