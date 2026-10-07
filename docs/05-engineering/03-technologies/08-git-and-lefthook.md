---
description: Local Git hooks, affected validation and the boundary with hosted review enforcement.
status: implemented
intent: reference
---

# Git and Lefthook

## Role and configuration

Git stores source/history. Lefthook installs local hooks through root `prepare` when a Git directory exists. `lefthook.yml` defines pre-commit lint, conflict marker checks, a large-source-file check and debugging-pattern checks; `.lefthook/commit-msg/validate-conventional-commit.sh` validates commit messages.

The pre-commit lint command runs Turbo lint across workspaces, despite the file's “staged files” wording. Debug/conflict checks use staged file lists. Pre-push runs typechecks with an affected filter plus E2E typecheck, then affected tests, each with a full-run fallback when needed. These hooks can therefore require browser tooling.

## Working with the hooks

Install dependencies before expecting hooks to exist. Keep commits in `<type>[optional scope]: <description>` format. If a hook fails, run the printed command directly to separate source failures from runtime/browser problems. Do not replace the full validation gate with the subset a hook happened to run.

Hooks run on a developer machine; they do not enforce GitHub branch protection. Hosted code-owner review and required checks need separately verified rules. [Project workflow](../../12-project/02-workflow.md) owns branch/PR conventions, while [GitHub](../../10-services/01-github.md) owns provider settings.

When changing hook scope, inspect fallback behavior and shell portability, and document any new prerequisites. A config edit does not retroactively install hooks in every existing checkout; rerun the normal prepare/install step if needed.
