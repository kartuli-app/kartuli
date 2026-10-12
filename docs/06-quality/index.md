---
description: Current validation layers, static analysis, accessibility and web-quality expectations.
status: implemented
intent: reference
---

# Quality

Quality is a shared capability. App specs define expected product behavior; tools implement checks against it.

`AGENTS.md` requires `pnpm run validate:all` for every change, including docs: root Biome, workspace lint, workspace typechecks, then Turbo tests. Report environment blockers explicitly; do not claim checks passed or silently substitute narrower checks.

[Testing](./01-testing/index.md) owns layer selection and coverage. [Accessibility](./02-accessibility.md) owns cross-surface requirements. [Code Review](./03-code-review.md) owns review expectations.
[Web Quality and Lighthouse](./04-web-quality.md) owns the current mobile audit profile, explicit
routes, informational failure semantics and report handling.

## Static analysis and web quality

`biome.json` and `biome.root.json` configure formatting/lint, including accessibility checks. Workspace TypeScript configs provide static type validation. [SonarQube Cloud](../10-services/03-sonarcloud.md) performs automatic analysis through its GitHub integration. The [overall summary for `main`](https://sonarcloud.io/summary/overall?id=kartuli-app_kartuli&branch=main) is the live project overview; a committed properties file is only a configuration reference.

`lighthouserc.json` configures one mobile-emulated run without score assertions. Staging updates stable
PR comments, while separate allowed-failure production jobs write Actions summaries. Reports upload to
temporary public storage and expose lab evidence rather than a release gate; inspect requested/final
URLs and reporting status before interpreting the scores.

Performance budgets, manual accessibility coverage and a broader SEO standard remain planned.
Automated scans do not certify complete accessibility or product readiness.
