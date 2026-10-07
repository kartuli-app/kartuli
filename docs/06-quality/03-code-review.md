---
description: Human review, CODEOWNERS, automated assistance and documentation-impact expectations.
status: implemented
intent: specification
---

# Code Review

Reviewers should check behavior, scope, dependency boundaries, accessibility/privacy impact, meaningful validation evidence and canonical documentation updates. Separate implemented behavior from product plans in both docs and the PR description.

`.github/CODEOWNERS` assigns all paths to `@kartuli-app/maintainers`. The active main ruleset inspected on 2026-10-06 requires zero ordinary approvals and does not require code-owner review; it does require resolved review threads. See the dated [GitHub settings evidence](../10-services/01-github.md#verified-repository-and-branch-settings). Team membership remains unverified.

[CodeRabbit](../10-services/04-coderabbit.md) is review assistance and [SonarQube Cloud](../10-services/03-sonarcloud.md) is static analysis. The retrieved ruleset requires the `SonarCloud Code Analysis` check but not CodeRabbit. A successful CodeRabbit status can mean automatic review was skipped; inspect the description and reviewed commit range. Provider review/gate settings are separate from GitHub merge enforcement.

Use the PR template and [Project workflow](../12-project/02-workflow.md), link the issue, explain validation failures and state documentation impact. Do not merge solely because a draft is ready for review.
