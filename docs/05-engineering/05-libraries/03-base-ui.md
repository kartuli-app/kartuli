---
description: Interaction primitives, tooltip and toast composition, focus behavior and accessibility checks.
status: implemented
intent: reference
---

# Base UI

## Role and consumers

Game Client uses Base UI interaction primitives, including Toast in `src/ui/components/feedback/notifications.tsx` and Tooltip in `src/ui/components/overlay/tooltip.tsx`. The app provides styling and product composition; Base UI supplies behavior that still needs verification in that composition.

## Working conventions

Read the existing wrapper before importing another primitive directly into a feature. Preserve trigger semantics, accessible names, focus behavior and portal placement when changing wrappers. A visually correct overlay can still trap focus or disappear under a stacking context.

Use shared floating-surface styles for the visual contract rather than duplicating tooltip colors. Add stories for default, open, disabled and relevant interaction states, and use play functions where behavior matters. Shared requirements live in [Accessibility](../../06-quality/02-accessibility.md).

## Validation and limitations

Playwright's axe helper narrowly excludes `[data-base-ui-focus-guard]` sentinel nodes. This is not a general exemption for Base UI components. Storybook's global a11y settings and the E2E helper are separate integrations; do not assume every per-scan exclusion is shared.

Check keyboard focus, dismissal, trigger naming and browser rendering after upgrades. If axe reports a failure, inspect the exact rule and node before expanding exclusions. A dependency upgrade can change internal sentinel behavior, so reevaluate whether the existing narrow exclusion is still needed. Sources: the wrappers above, their stories, and `tools/e2e/tests/helpers/expect-a11y.ts`.
