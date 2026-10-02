---
description: Shared versus app components, visual states, icons, motion and review workflow.
status: implemented
intent: reference
---

# Components and Interaction

## Ownership

`@kartuli/ui` supplies shared source exports and utilities. Game Client's `src/ui/components` owns its shell, panels, surfaces, actions, feedback and overlays; `src/ui/experiences` owns feature composition. A component can be reused inside an app without becoming a cross-app package contract.

Before moving a component into shared UI, identify its consumers, props and dependencies. Remove app-specific routing/content assumptions from the shared boundary or keep it app-local. Source aliases used by Storybook are an inspection mechanism, not proof that a component belongs in the package.

## States and interactions

Document meaningful default, hover, focus, selected, disabled, loading and error states where they exist. Use semantic tokens for these roles, accessible control names for icon-only actions and keyboard alternatives for gestures. Base UI provides primitive behavior for overlays/feedback; app wrappers still own semantics and styling.

Motion currently supports study-carousel interactions. React Icons supplies app icon families. Neither dependency establishes a complete motion/icon governance system. [Library integration](../05-engineering/05-libraries/06-motion-and-ui-helpers.md) owns their technical setup.

## Component change workflow

Update the component, relevant stories and behavior tests together. Check interaction and accessibility in a real browser, then inspect the component in its route composition. A story can look correct with simplified content while failing with actual translations or application context.

Review shared-token impact before adding another raw value. Use `cn` for conditional classes and inspect the final merged output for variants. Broader reduced-motion conventions and a curated icon catalog remain gaps to resolve explicitly, rather than claiming they are already standardized.
