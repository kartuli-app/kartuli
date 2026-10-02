---
description: V8 aggregation, CI reporting, exclusions and interpretation of uncovered behavior.
status: implemented
intent: reference
---

# Coverage

## What is collected

`pnpm run test:all:coverage` runs root Vitest with the V8 provider. Root `vitest.config.mts` discovers app/package/tool projects but excludes E2E and Storybook. Coverage therefore does not measure the entire browser or deployed journey.

Reporters produce text, text-summary, HTML, JSON and JSON-summary under `coverage/`. Exclusions cover node_modules, test files, configuration files, setupTests and type directories. No repository-wide percentage threshold is configured in this root file.

## Reading results

Open `coverage/index.html` after a successful run to inspect uncovered lines and branches. Use `coverage/coverage-summary.json` for summaries. CI's all-monorepo composite action invokes the Vitest coverage report action when the summary exists, even if another step failed; a coverage comment alone is not proof the entire workflow passed.

Percentages describe executed code, not the strength of assertions. A module can reach 100% with weak assertions, while a meaningful browser scenario may sit outside this report. Review uncovered failure paths and decisions rather than adding tests solely to inflate totals.

## Maintaining exclusions

When excluding code, state why its behavior is verified elsewhere or why it is non-executable/generated. Do not remove difficult application code from the denominator to satisfy an informal target. Keep root coverage configuration distinct from provider analysis exclusions in [SonarCloud](../../10-services/03-sonarcloud.md).

Use [Testing strategy](../01-testing.md) to choose the right layer. Workspace tests and `validate:all` remain separate execution commands; running coverage is not automatically the same as executing every Turbo test task.
