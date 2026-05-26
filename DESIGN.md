---
version: alpha
name: kartuli.app
description: |
  A mobile-first Georgian language learning app for short lessons and simple games.
  The visual system is warm, focused, lightly playful, and neutral-first. Most UI is calm
  and border-led, with primary color used as a restrained signal for progression, active
  navigation, and selected context. Success and fail colors exist as semantic tokens for
  Play feedback, but the initial theme keeps them restrained so the interface can mature
  from a stable neutral foundation.

colors:

  # Required by the @google/design.md linter as a top-level primary sentinel.
  # Not a brand token — use brand-color-* tokens in the app instead.
  primary: "#ca00e8"

  brand-color-primary-soft: "#edb1ff"
  brand-color-primary: "#ca00e8"
  brand-color-primary-strong: "#570065"

  brand-color-neutral-soft: "#c3c7c7"
  brand-color-neutral: "#767979"
  brand-color-neutral-strong: "#101111"

  brand-color-semantic-success-soft: "#aafebb"
  brand-color-semantic-success: "#32e970"
  brand-color-semantic-success-strong: "#0d5a27"

  brand-color-semantic-error-soft: "#f19d9d"
  brand-color-semantic-error: "#942121"
  brand-color-semantic-error-strong: "#460a0a"

typography:
  brand-typography-title:
    fontSize: 24px
    fontWeight: 700
    lineHeight: 28px
    letterSpacing: -0.2px

  brand-typography-subtitle:
    fontSize: 18px
    fontWeight: 600
    lineHeight: 23px
    letterSpacing: 0px

  brand-typography-button:
    fontSize: 16px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px

rounded:
  brand-radius-none: 0px
  brand-radius-1: 8px
  brand-radius-2: 16px
  brand-radius-3: 24px
  brand-radius-full: 9999px

spacing:
  brand-spacing-1: 4px
  brand-spacing-2: 8px
  brand-spacing-3: 12px
  brand-spacing-4: 16px

components:
  appbar-title:
    backgroundColor: "transparent"
    textColor: "{colors.brand-color-neutral}"
    typography: "{typography.brand-typography-title}"

  button-primary:
    backgroundColor: "{colors.brand-color-primary}"
    textColor: "{colors.brand-color-neutral-soft}"
    typography: "{typography.brand-typography-button}"
    rounded: "{rounded.brand-radius-3}"
    padding: "{spacing.brand-spacing-3}"
---
# Design System

This file defines the initial design token set and a small set of component contracts for
`kartuli.app`.

## Source Of Truth

- The YAML frontmatter above is the source of truth for token names, token values, and
  component references.
- App code and Tailwind utilities should use the exported token namespaces directly:
  `brand-color-*`, `brand-typography-*`, `brand-radius-*`, and `brand-spacing-*`.
- `{colors.primary}` exists only as the required `design.md` compatibility sentinel. Product
  code should prefer `{colors.brand-color-primary}`.
- Prose in this file should stay high-level. Do not duplicate token-by-token values here.

## Product Direction

- The system is mobile-first, touch-first, and optimized for short learning sessions.
- Desktop MVP stays inside a centered mobile shell instead of becoming a separate desktop UI.
- The visual language is neutral-first, border-led, calm, and lightly playful.
- Primary color is a restrained signal, not a default fill.
- Explore and Study should feel calmer than Play.
- Georgian script can use a dedicated font family without becoming a separate visual system.

## Usage Rules

- Use generated tokens rather than raw hex values or ad hoc scales in components.
- Keep reusable UI aligned with the shared CSS/Tailwind output and Storybook examples.
- Update the frontmatter first whenever the design system changes.
- Keep component contracts in this file small and intentional; expand them only when they add
  real implementation value.

## Workflow

- Lint with `pnpm run design:lint`.
- Rebuild exported artifacts with `pnpm run design:build`.
- Review the current rendered output in Storybook when validating token changes.
