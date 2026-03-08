---
name: pr-title-and-description
description: Draft pull request title and description from branch vs main, following the repo PR template. Use when the user asks to generate, write, or draft a PR description, PR title, pull request description, or "what should my PR say". Does not create or open the PR—only produces the text.
---

# PR title and description

Produce a **PR title** (text, conventional commit format) and **PR description** (markdown) for the current branch compared to `main`. Output is meant to be pasted into GitHub (or used by another skill that creates the PR).

## When to use

- User says: "generate the PR description", "draft my PR", "write PR title and description", "what should my PR say", or similar.
- User is on a feature branch and wants copy for a new pull request.

## Steps

1. **Get the diff and context**
   - Ensure `origin/main` is available (e.g. `git fetch origin main`); in shallow/CI/agent checkouts a local `main` may be missing or stale.
   - Compare current branch to `origin/main`: `git diff origin/main...HEAD --stat` and `git log origin/main..HEAD --oneline`.
   - **Inspect substantive diffs, not only stat and commit messages.** Commit messages are often narrowly scoped (e.g. all "chore(diagrams):"); the PR may include other important changes. To avoid omitting them:
     - Review the **content** of diffs for config and tooling (e.g. `tsconfig.json`, `vitest.config.*`, `vite.config.*`, root and app-level), so path alias changes, baseUrl, or resolver config are captured.
     - Review the **content** of diffs for source files (e.g. changed imports, path alias usage like `@app/...` or `@domain/...`), so refactors and import migrations are captured.
     - If the stat shows changes in both config and source, treat them as separate themes until the diff shows they are the same (e.g. diagram tooling only).
   - Use diff content and log together to infer what the PR does (scope, type, description).

2. **Optional: related issue**
   - If the user provides a related issue—either an issue number (e.g. `#42`, "issue 42") or a GitHub issue URL (e.g. `https://github.com/org/repo/issues/42`)—reference it in the description under **Linked Issues** using GitHub keywords: `Closes #42`, `Fixes #42`, or `Resolves #42`. Extract the issue number from a URL if needed.

3. **Follow the PR template**
   - When running in a repository checkout, read `.github/pull_request_template.md` from the workspace (current branch) so PR-local changes to the template are applied. Fallback / human reference: [.github/pull_request_template.md on main](https://github.com/kartuli-app/kartuli/blob/main/.github/pull_request_template.md).
   - Fill sections in this order:
     - **Description**: Clear summary of what the PR does and why (from diff content and log). Include every substantive theme found in the diff (e.g. diagram tooling and path alias refactors), not only the theme that dominates the commit messages.
     - **Linked Issues**: `Closes #N` (or none) if user gave an issue.
     - **Type**: Check the one that matches the change (`feat`, `chore`, `fix`, `docs`, `test`).
     - **Scope**: Check all that apply (`game-client`, `backoffice-client`, `ui`, `storybook`, `e2e`, `global`).
     - **Screenshots / Preview links / Testing notes / Documentation changes**: Fill only if the diff clearly implies them; otherwise leave placeholders or "N/A" as in the template.

4. **Title**
   - One line, conventional commit: `type(scope): short description`.
   - Examples from template: `feat(game-client): add user authentication`, `fix(ui): resolve button alignment issue`, `docs: update contributing guidelines`, `chore(e2e): upgrade testing dependencies`.

## Output format

Return exactly two things, clearly labeled:

1. **Title** (single line, conventional commit).
2. **Description** (full markdown body matching the PR template structure, ready to paste into the PR description field).

Example:

```
Title:
feat(ui): add responsive layout for settings panel

Description:
[full markdown following .github/pull_request_template.md]
```

## What this skill does not do

- Does not create or open the PR on GitHub.
- Does not set assignees, reviewers, or labels.
- A future skill (e.g. "pr-create") could use this draft and then perform those actions.
