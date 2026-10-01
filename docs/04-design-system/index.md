---
description: Current primitive, semantic and component token model, shared UI and app integration.
status: implemented
intent: architecture
---

# Design System

The shared visual contract is implemented in `packages/tailwind-config/shared-styles.css`. It is hand-maintained source and the shipped artifact, not output from a separate token generator.

## Token layers and styling

Primitive tokens hold raw color, spacing and radius values. Semantic tokens assign visual roles. Component tokens capture recurring component decisions; Tailwind `@theme` mappings expose utilities. Prefer semantic roles in feature UI and token-backed spacing/radius utilities; ordinary layout utilities remain appropriate for flex, grid and positioning.

Apps import Tailwind and `@kartuli/tailwind-config` in their stylesheets. Shared React code is in `@kartuli/ui`; app-specific patterns remain under the app's `src/ui`. Use the shared `cn` helper for conditional class merging. Package exports are owned by [Packages](../02-packages/index.md).

## Typography, themes and patterns

The Game Client root layout supplies Manrope through `next/font/google` and local Mersad for Georgian, binding font variables to the theme contract. App font loading is an integration detail, not proof every surface uses the same fonts. Storybook visualizes tokens and offers brand-ramp overrides; this is not an implemented end-user theme switcher.

React Icons and Motion are current app dependencies. Their usage is cataloged under [Libraries](../05-engineering/02-libraries.md); a comprehensive icon, motion and responsive-pattern specification remains planned. Do not infer a finished design system from individual components.

[Accessibility](../06-quality/02-accessibility.md) owns keyboard, focus, semantics and contrast expectations. Add reusable visual contracts here; keep product-specific screen behavior in Apps.
