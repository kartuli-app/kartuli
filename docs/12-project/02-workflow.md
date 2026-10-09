---
description: Contributor setup, Conventional Commits, Git hooks, issue labels and PR documentation impact.
status: implemented
intent: runbook
---

# Development and Git Workflow

## Local work

Use the Node pin in `.nvmrc` and pnpm version in root `package.json`; install with `pnpm install --frozen-lockfile`. Read `AGENTS.md` before agent work. Use a dedicated branch for a scoped change and inspect the complete issue and relevant source/config before editing.

`lefthook.yml` installs pre-commit lint/conflict/debug checks, validates Conventional Commit messages, and runs affected typecheck/test checks before push with a full-run fallback. Those hooks do not replace the required `pnpm run validate:all` completion gate. E2E requires a running target; browser tests require Chromium.

## Issues, labels and ownership

Use `.github/ISSUE_TEMPLATE/feature_or_task.md` for scope/acceptance criteria and `.github/pull_request_template.md` for implementation/review context. `.github/labels.yml` is the label inventory. Keep scope/type labels consistent with the change; automation can apply labels from templates and propagate them from linked issues.

`.github/CODEOWNERS` assigns repository ownership to `@kartuli-app/maintainers`. [GitHub](../10-services/01-github.md) owns service details and the checklist for branch rules, team membership and Projects settings; those settings are not captured by a Markdown policy alone.

## PR and Git conventions

Use Conventional Commits: `<type>[optional scope]: <description>` (for example `docs: establish documentation foundation`). Agent commits require an explicit user request. Link the issue using `Closes #N` when the PR completes it; do not close it merely because a draft exists.

Explain why the change is needed, resulting behavior, validation performed and remaining limitations. Update the [canonical documentation](./01-documentation/index.md) when code/config/product behavior changes; if none changes, explain why. For docs, include build/index/link evidence. Keep unrelated infrastructure/product work out of the PR. Before treating review as complete, disposition findings under the canonical [Code Review](../06-quality/03-code-review.md#review-finding-disposition) policy and record the result in the PR template.
