---
description: Verified GitHub governance, required checks, Actions, Pages and label automation for Kartuli.
status: implemented
intent: reference
---

# GitHub

GitHub hosts [kartuli-app/kartuli](https://github.com/kartuli-app/kartuli), its issues, pull requests,
automation and published documentation. [Project workflow](../12-project/02-workflow.md) owns
contribution conventions; [CI](../07-platform/01-ci.md) owns validation and
[Deployment](../07-platform/02-deployment.md) owns release flow.

## Verified repository and branch settings

The GitHub connector read repository metadata and the active
[main ruleset](https://github.com/kartuli-app/kartuli/rules/9070716) on **2026-10-06**.
These are dated observations; refresh them before changing merge policy.

| Setting | Observed value | Meaning for contributors |
| --- | --- | --- |
| Visibility / default branch | Public / `main` | PRs and published source are public |
| Merge methods | Squash enabled; merge commits and rebase disabled | Prepare a meaningful final squash title/body |
| Automatic merge | Disabled | A green PR does not merge automatically |
| Ruleset target | Active, `refs/heads/main` | Other branch names are not covered by this ruleset |
| Branch history | Deletion and non-fast-forward updates restricted; linear history required | Changes normally arrive through a PR |
| PR approval | Zero required approvals; CODEOWNERS approval not required | Ownership metadata does not enforce review |
| Review threads | Resolution required | Resolve outstanding conversations before merging |
| Required status check | `SonarCloud Code Analysis`, integration ID 12526 | This is the only check named in the retrieved ruleset |
| Strict status policy | Enabled | The branch must satisfy the up-to-date check policy |
| Bypass | Repository-role actor ID 5 has always-bypass | The rule is not an absolute barrier for every actor |

The ruleset also enables extra approval for unattributed changes. This does not turn its ordinary
zero-approval requirement into a blanket approval requirement.
`.github/CODEOWNERS` assigns all paths to `@kartuli-app/maintainers`; team membership and access were
not exposed by this repository audit. Full validation remains a repository requirement even though
the retrieved ruleset names only SonarCloud.

## PR checks and their owners

| Result in GitHub | Who produces it | How to interpret it |
| --- | --- | --- |
| Validate all monorepo | Staging Orchestrator / local composite action | Lint, typecheck, root coverage and Storybook tests |
| Staging CI target jobs | Orchestrator affected-package mapping | Empty target lists skip jobs; inspect the mapping summary |
| SonarCloud Code Analysis | SonarQube Cloud GitHub integration | Open its analysis link for the gate and revision |
| CodeRabbit | External review integration | Read the description: success can mean review skipped |
| Vercel app statuses | Vercel Git integration | Success can mean canceled by the Ignored Build Step |
| Coverage / Lighthouse comments | GitHub Actions | Reports describe that run, not independent required checks |

Skipped jobs and successful provider statuses do not establish that a review or deployment ran.
Read each status description and the workflow's job conditions.

## Workflow events and permissions

`.github/workflows/staging-orchestrator.yml` runs on PRs targeting main and manual dispatch.
It fetches history, detects affected workspaces and maps them through
`scripts/orchestrator/workflow-targets.json`. Concurrency cancels the older orchestrator run for a PR.
Reusable app jobs receive PR-write permission to publish reports; read-only jobs use contents-read.

Production workflows run on selected main-branch paths or manual dispatch, and guard their jobs with
`github.ref == 'refs/heads/main'`. Each app filter watches its own workspace and workflow plus the
shared UI, Tailwind, root build/dependency configuration and production E2E inputs listed in
[Deployment](../07-platform/02-deployment.md). App and docs path filters differ, and production does
not reuse staging's Turbo affected-workspace selection.

GitHub Pages has a build job that uploads `tools/web-docs-client/.vitepress/dist`, followed by a
deploy job in the `github-pages` environment with `pages: write` and `id-token: write`. The
post-deploy check waits for the site and text index, then runs browser smoke tests. The configured
site is [Kartuli Docs](https://kartuli-app.github.io/kartuli/). Environment protection and custom-domain
settings still need a provider-settings read.

## Issue and label operations

| Workflow | Trigger and exact behavior |
| --- | --- |
| `labels-auto-apply-to-issues-from-template.yml` | Issue opened/edited; parses checked labels in the Type/Scope area and adds missing labels; unchecking does not remove them |
| `labels-propagate-to-pr-from-linked-issue.yml` | PR opened only; takes labels from the first closing-keyword issue reference; later body edits do not rerun it |
| `labels-sync-available-on-github-from-repo-config.yml` | Manual; synchronizes `.github/labels.yml`; `delete-other-labels` defaults to false |

Use the issue and PR templates under `.github/`. If labels are missing, inspect event timing and the
first linked issue before editing the vocabulary. Enabling label deletion can remove labels beyond
the configured list and is a separate maintenance operation.

## Read-only investigation

Run from an authenticated checkout:

```bash
gh pr checks PR_NUMBER
gh run view RUN_ID
gh api repos/kartuli-app/kartuli/rulesets/9070716
gh api repos/kartuli-app/kartuli --jq '{default_branch,allow_squash_merge,allow_merge_commit,allow_rebase_merge,allow_auto_merge}'
```

Substitute the current PR/run IDs. Start with the failing step, its event, SHA and job condition.
A skipped workflow is different from a missing workflow and from an executed failure. E2E failure
artifacts generally retain three days; production Lighthouse artifacts retain seven. Exact upload
steps own retention and paths.

## Remaining external settings

GitHub Projects ownership, fields/views and automation, team membership, installation permissions,
Actions policy, Pages environment protection and secret rotation are not established by the source
or the reads above. Record their verified values and date when available. Do not infer them from
CODEOWNERS, templates or successful CI.
