---
description: Current primitive, semantic and component token model, shared UI and app integration.
status: implemented
intent: architecture
---

# Design System

The CSS-first shared Design System contract is implemented by the hand-authored files in
`packages/design-system`. `index.css` is the public entry point and imports
`primitives.css`, `semantics.css` and `components.css` in dependency order. These committed files are
the shipped source, not output from a token generator.

## Token layers and styling

Primitive tokens hold raw color, spacing and radius values. Semantic tokens assign visual roles in the
shell, panel and floating contexts. Component tokens capture stable component-owned dimensions.
Runtime custom properties and their Tailwind `@theme static` mappings live together in the owning
layer file.

Normal product and shared React components must use semantic color roles rather than primitive color
utilities. Primitive colors remain available for theme overrides and intentional token/debug fixtures.
Use Kartuli primitive spacing and radius utilities when an equivalent exists; ordinary layout utilities
remain appropriate for flex, grid, positioning and other structural behavior.

Apps import Tailwind, then `@kartuli/design-system`, then their own `theme.css`. The shared package is
part of the CSS import graph; it is not a Tailwind class-name source. Each compilation environment uses
explicit `@source` directives for the React trees it renders. Shared React code is in `@kartuli/ui`;
app-specific patterns remain under the app's source tree. Use the shared `cn` helper for conditional
class merging. Package exports are owned by [Packages](../02-packages/index.md).

## Typography, themes and patterns

The Game Client root layout supplies Manrope through `next/font/google` and local Mersad for Georgian, binding font variables to the theme contract. App font loading is an integration detail, not proof every surface uses the same fonts. Storybook visualizes tokens and offers brand-ramp overrides; this is not an implemented end-user theme switcher.

React Icons and Motion are current app dependencies. Their usage is cataloged under [Libraries](../05-engineering/02-libraries.md); a comprehensive icon, motion and responsive-pattern specification remains planned. Do not infer a finished design system from individual components.

[Accessibility](../06-quality/02-accessibility.md) owns keyboard, focus, semantics and contrast expectations. Add reusable visual contracts here; keep product-specific screen behavior in Apps.

## Working guides

- [Design tokens](./01-tokens.md): names, layers and exact utility mappings.
- [Color and theming](./02-color-and-theming.md): semantic roles and preview overrides.
- [Typography and fonts](./03-typography.md): loading, variables and script coverage.
- [Layout, spacing and radius](./04-layout-and-spacing.md): actual scale and shell breakpoints.
- [Components and interaction](./05-components-and-interaction.md): ownership, states and verification.

These pages document current implementation and explicitly identify incomplete contracts. They are the starting point for token/component changes, not just an inventory of files.
