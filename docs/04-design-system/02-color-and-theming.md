---
description: Palette roles, visual contexts, Storybook brand overrides and theme verification.
status: implemented
intent: reference
---

# Color and Theming

## Current palette and roles

The shared stylesheet defines neutral, brand and accent ramps plus selected success/danger colors. Semantics organize shell, panel and floating surfaces and their content, border, action, hover, selected and focus roles. Component code should consume those roles instead of assuming a primitive brand shade always means a primary action.

## Theme integration

Apps import the same stylesheet contract. Storybook supplies default, brand-emerald and brand-rose controls through `.storybook/preview.tsx` and `theme-wrappers.tsx`. Wrappers override primitive brand CSS variables on `document.documentElement`, record earlier inline values and restore them on cleanup.

These previews exercise how semantic roles follow primitives. They are not a persisted end-user theme chooser, a dark-mode contract or proof that every palette combination passes contrast checks.

## Changing colors

Change a primitive to alter the palette globally; change a semantic mapping to alter a role without redefining the palette. Check dependent roles and state combinations, including panel headers, outlines, floating content and focus rings. Keep wrapper overrides aligned with the primitive ramp if the shared names change.

Preview the affected components in each existing Storybook theme and in the app shell. Check computed styles if a portal inherits a different context. A custom property can exist while an incorrect mapping still prevents the intended utility from being generated.

Use the Storybook toolbar to compare Default, Brand Emerald and Brand Rose without reloading. The
alternate wrappers override only the brand primitive ramp; neutral/accent/success/danger values and
semantic assignments remain shared. If an alternate preview does not change a component, inspect
whether it uses a brand-derived semantic role or a raw unrelated value before changing the wrapper.

For a semantic color change, list every state consuming the role before editing. A safe review set for
an action includes default content/background/border, hover, focus ring, selected and disabled behavior
where implemented. For a surface, check content and border contrast plus any overlay rendered through a
portal. Run the commands in [Design Tokens](./01-tokens.md), then perform manual contrast/focus review;
axe reports some contrast failures but cannot validate the design intent of every token pairing.

## Verification and boundaries

Use axe/browser checks and manual contrast/focus inspection in context. Do not declare a complete dark theme or alternate brand contract until its surfaces and states are specified and tested. Source: `shared-styles.css`, Storybook `preview.tsx`, `theme-wrappers.tsx`, token stories; [Design tokens](./01-tokens.md) owns naming conventions.
