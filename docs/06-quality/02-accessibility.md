---
description: Shared accessibility expectations and current component, page and lint enforcement.
status: implemented
intent: specification
---

# Accessibility

Use meaningful landmarks/headings, accessible control names, keyboard operation, visible focus and adequate contrast. Check focus and screen-reader behavior manually for new interactions; automated scans cover only part of the requirement.

## Current enforcement

Storybook `preview.tsx` and `tools/e2e/tests/helpers/expect-a11y.ts` configure axe tags for WCAG 2/2.1/2.2 A and AA plus best-practice checks. Storybook's `a11y.test: 'error'` fails component tests on violations; its wrapper supplies a main landmark for isolated stories. Individual story overrides may exist and must be justified during review.

Biome accessibility rules catch source-level issues. Lighthouse supplies a separate accessibility score, not an accessibility certification. [Testing](./01-testing.md) explains where browser/page suites run.

The [Design System](../04-design-system/index.md) should supply accessible reusable patterns. Base UI primitives help implement interactions, but app composition, content and navigation still need validation. A completed manual audit or conformance claim is not established by this repository.
