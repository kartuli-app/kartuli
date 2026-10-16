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

The reusable application shell is implemented in `@kartuli/ui`: app-bar structure, content container,
optional rails, responsive offsets, dock structure and dock-item presentation are shared. Applications
still own navigation definitions, router adapters, localized labels, titles, identity, actions and
decorative rail content.

## Choosing a layer

Use the smallest existing contract that expresses the value:

```text
Need a raw design value?
→ primitive

Need a visual meaning that can vary independently?
→ semantic

Need a stable reusable component-owned contract?
→ component token

Need only layout or structure?
→ ordinary structural Tailwind utility
```

An arbitrary value is not automatically a violation. It can remain local when no equivalent token
exists, it belongs to the composition and it is not a reusable component contract. Repeated stable
component-specific values should prompt a component-token review, not an automatic token addition.
The detailed extension workflow belongs in [Design tokens](./01-tokens.md); spacing, radius and
structural exceptions belong in [Layout, spacing and radius](./04-layout-and-spacing.md).

## Compliance checklist

Run this checklist before finishing normal React product or shared UI work:

- [ ] Colors use semantic roles; primitive colors appear only in an intentional allowed context.
- [ ] No raw CSS color or generic/arbitrary Tailwind color was added when a semantic role exists.
- [ ] Equivalent Kartuli spacing and radius primitives are used.
- [ ] Stable reusable component-owned dimensions use component tokens where appropriate.
- [ ] Arbitrary values are justified as local composition or a genuinely missing contract.
- [ ] Structural utilities were not unnecessarily tokenized.
- [ ] New tokens belong to the correct primitive, semantic or component layer.
- [ ] No speculative surface, token or shared component was introduced.
- [ ] Shared/reusable UI was reviewed under relevant Storybook themes, states and viewports.
- [ ] App-specific routing, content, identity and composition remain app-owned.
- [ ] Relevant documentation and tests were updated.

## Typography, themes and patterns

The Game Client root layout supplies Manrope through `next/font/google` and local Mersad for Georgian, binding font variables to the theme contract. App font loading is an integration detail, not proof every surface uses the same fonts. Storybook visualizes tokens and provides real-app and synthetic cross-theme review modes; this is not an implemented end-user theme switcher.

React Icons and Motion are current app dependencies. Their usage is cataloged under [Libraries](../05-engineering/02-libraries.md); a comprehensive icon, motion and responsive-pattern specification remains planned. Do not infer a finished design system from individual components.

[Accessibility](../06-quality/02-accessibility.md) owns keyboard, focus, semantics and contrast expectations. Add reusable visual contracts here; keep product-specific screen behavior in Apps.

## Working guides

- [Design tokens](./01-tokens.md): names, layers and exact utility mappings.
- [Color and theming](./02-color-and-theming.md): semantic roles and preview overrides.
- [Typography and fonts](./03-typography.md): loading, variables and script coverage.
- [Layout, spacing and radius](./04-layout-and-spacing.md): actual scale and shell breakpoints.
- [Components and interaction](./05-components-and-interaction.md): ownership, states and verification.

These pages document current implementation and explicitly identify incomplete contracts. They are the starting point for token/component changes, not just an inventory of files.
