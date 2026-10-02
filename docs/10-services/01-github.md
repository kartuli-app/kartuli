---
description: Repository governance, Actions, Pages, labels and external settings to verify.
status: implemented
intent: reference
---

# GitHub

Repository: `kartuli-app/kartuli`. GitHub provides source hosting, PRs/reviews, issues and Actions. [Project workflow](../12-project/02-workflow.md) owns contributor conventions; [CI](../07-platform/01-ci.md) and [Deployment](../07-platform/02-deployment.md) own capability behavior.

## Repository evidence

- `.github/CODEOWNERS` assigns `*` to `@kartuli-app/maintainers`.
- `.github/ISSUE_TEMPLATE/feature_or_task.md` and `.github/pull_request_template.md` guide contributions.
- `.github/labels.yml` defines labels. `labels-sync-available-on-github-from-repo-config.yml` syncs them; `labels-auto-apply-to-issues-from-template.yml` and `labels-propagate-to-pr-from-linked-issue.yml` automate assignment.
- Actions use `GITHUB_TOKEN` with job-scoped permissions. Workflow artifact uploads include failure E2E results (typically three days) and app Lighthouse results (seven days); consult individual upload steps for exact retention.
- Docs deploy through the `github-pages` environment using Pages artifact upload/deploy actions and `pages: write` / `id-token: write` permissions.

## Manual verification required

Check repository rulesets/branch protection, required status checks, code-owner review enforcement, maintainer team membership, merge permissions, GitHub App installations/permissions and Actions access policy. Capture GitHub Projects URL/owner, fields, views and automation; none is defined in source. Verify Pages source/environment protection/custom domain and artifact retention/access policies. Do not infer these settings from CODEOWNERS or workflow YAML.

## Integration flow and maintenance

A PR to main starts the staging orchestrator, which selects affected target workflows and runs all-monorepo validation. Label workflows synchronize the repository-defined vocabulary and propagate labels from linked issues. Pages receives a built static artifact; it does not compile the docs from Markdown on demand.

When a check is missing, inspect workflow event/path filters, affected-target mapping and job conditions before changing branch rules. When a Pages URL is stale, inspect the build artifact, deployment job and returned environment URL. A successful source upload is not the same as a successful Pages deployment.

For ownership changes, update CODEOWNERS and verify the referenced team has access and review enforcement is enabled. For labels, inspect the sync workflow's deletion policy before dispatching it: synchronization can remove labels outside the configured inventory. For Projects, capture the verified project and automation separately; no workflow here establishes its fields/views.

Validate changes through the relevant workflow and recorded check results. Preserve least-needed workflow permissions and never infer admin settings from a passing build. Source locations: `.github/workflows`, `.github/actions`, CODEOWNERS, labels and templates.
