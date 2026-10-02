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

## Applying the checks

Run component/browser tests for component states and use `expectA11y(page, options)` from the E2E helper after navigating to the relevant page/state. An unopened dialog is not evidence its open state passes. Include interaction states such as expanded menus, focus transitions and validation errors where applicable.

The helper accepts a label, additional tags, disabled rule IDs and narrowly scoped exclusions. Its default exclusion is the Base UI focus-guard selector. Every additional exception should explain why the node cannot be fixed at its source and how the remaining behavior is checked. Storybook has its own configuration; per-scan exceptions are not automatically shared.

## Debugging and privacy

Failures summarize rule IDs, impact, help links and a first failing selector. The E2E helper omits raw node HTML in CI unless `DEBUG_AXE_HTML=1`; local output may include HTML. Avoid enabling verbose HTML logging against private/user data without considering artifact exposure.

## Manual review

Use the keyboard to reach and operate controls, open and dismiss overlays, and confirm focus returns sensibly. Check that names and headings remain meaningful in both locales. Inspect reflow and text enlargement, and check motion alternatives for gesture-based interactions. Record the actual scope reviewed rather than asserting broad conformance from a Lighthouse score or axe pass.
