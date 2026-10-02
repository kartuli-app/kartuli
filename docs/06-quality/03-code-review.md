---
description: Human review, CODEOWNERS, automated assistance and documentation-impact expectations.
status: implemented
intent: specification
---

# Code Review

Reviewers should check behavior, scope, dependency boundaries, accessibility/privacy impact, meaningful validation evidence and canonical documentation updates. Separate implemented behavior from product plans in both docs and the PR description.

`.github/CODEOWNERS` assigns all paths to `@kartuli-app/maintainers`. This expresses ownership; enforcement depends on repository rules requiring code-owner review. Those settings need manual verification in [GitHub](../10-services/01-github.md).

[CodeRabbit](../10-services/04-coderabbit.md) is review assistance and [SonarCloud](../10-services/03-sonarcloud.md) is static analysis. Neither substitutes for human review; required-check enforcement and external configuration are not proven by files in this repo.

Use the PR template and [Project workflow](../12-project/02-workflow.md), link the issue, explain validation failures and state documentation impact. Do not merge solely because a draft is ready for review.
