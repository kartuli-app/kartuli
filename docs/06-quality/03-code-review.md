---
description: Human review, CODEOWNERS, automated assistance and documentation-impact expectations.
status: implemented
intent: specification
---

# Code Review

Reviewers should check behavior, scope, dependency boundaries, accessibility/privacy impact, meaningful validation evidence and canonical documentation updates. Separate implemented behavior from product plans in both docs and the PR description.

## Review finding disposition

Every real defect, inconsistency or actionable technical-debt finding discovered during implementation or review must have one of these outcomes:

1. Fix an in-scope actionable finding in the current PR before merge.
2. For an actionable finding outside the PR scope, link an existing issue or create a follow-up issue before considering the review complete.
3. For a transient, non-actionable or insignificant observation, explicitly record why no issue is being created.

Deciding that a PR can merge is not the same as disposing of every finding; review completion includes recording each finding's outcome. Link follow-up issues in the PR where practical, but do not expand the current PR merely to absorb unrelated work.

`.github/CODEOWNERS` assigns all paths to `@kartuli-app/maintainers`. The active main ruleset inspected on 2026-10-06 requires zero ordinary approvals and does not require code-owner review; it does require resolved review threads. See the dated [GitHub settings evidence](../10-services/01-github.md#verified-repository-and-branch-settings). Team membership remains unverified.

[CodeRabbit](../10-services/04-coderabbit.md) is review assistance and [SonarQube Cloud](../10-services/03-sonarcloud.md) is static analysis. The live [overall summary for `main`](https://sonarcloud.io/summary/overall?id=kartuli-app_kartuli&branch=main) shows the current project overview. The retrieved ruleset requires the `SonarCloud Code Analysis` check but not CodeRabbit. A successful CodeRabbit status can mean automatic review was skipped; inspect the description and reviewed commit range. Provider review/gate settings are separate from GitHub merge enforcement.

Use the PR template and [Project workflow](../12-project/02-workflow.md), link the issue, explain validation failures and state documentation impact. Do not merge solely because a draft is ready for review.
