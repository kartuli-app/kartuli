---
description: Current validation layers, static analysis, accessibility and web-quality expectations.
status: implemented
intent: reference
---

# Quality

Quality is a shared capability. App specs define expected product behavior; tools implement checks against it.

`AGENTS.md` requires `pnpm run validate:all` for every change, including docs: root Biome, workspace lint, workspace typechecks, then Turbo tests. Report environment blockers explicitly; do not claim checks passed or silently substitute narrower checks.

[Testing](./01-testing.md) owns layer selection and coverage. [Accessibility](./02-accessibility.md) owns cross-surface requirements. [Code Review](./03-code-review.md) owns review expectations.
[Web Quality and Lighthouse](./04-web-quality.md) owns the current mobile audit profile, score
thresholds, CI severity and report handling.

## Static analysis and web quality

`biome.json` and `biome.root.json` configure formatting/lint, including accessibility checks. Workspace TypeScript configs provide static type validation. [SonarCloud](../10-services/03-sonarcloud.md) performs automatic analysis through its GitHub integration; a committed properties file is only a configuration reference.

`lighthouserc.json` configures one mobile-emulated run and minimum scores of 0.9 for performance, accessibility, best practices and SEO. Workflows supply `LIGHTHOUSE_ASSERT_LEVEL`; staging uses `warn` and production app workflows use `error`. Reports upload to temporary public storage. Configuration is an intended gate, not evidence every deployment meets it; inspect actual workflow results.

Performance budgets beyond these thresholds, manual accessibility coverage and a broader SEO standard remain planned. Automated scans do not certify complete accessibility or product readiness.
