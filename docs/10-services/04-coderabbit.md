---
description: CodeRabbit review evidence, configuration location, skipped-check interpretation and review operations.
status: implemented
intent: reference
---

# CodeRabbit

CodeRabbit supplies automated PR review commentary and release-note summaries. There is no
`.coderabbit.yaml` or `.coderabbit.yml` in the current checkout and no Actions workflow invoking it.
Its GitHub integration operates separately from the repository's validation jobs.

[Code Review](../06-quality/03-code-review.md) owns acceptance policy. Provider suggestions need the
same source, behavior and test review as other proposed changes.

## Interpreting review evidence

A successful check can mean “Review skipped: automatic reviews are disabled”. Read the description
and compare the review comment's base/head commit range with the current PR before counting it as
fresh analysis. Generated release notes are separate from actionable code review.

Last verified configuration owner: organization UI, **2026-10-06**. Review triggers, profile and plan
are provider settings to inspect when needed; historical allowances are not repository limits.

## Configuration responsibility

The observed configuration owner is the organization UI. To change triggers, profile, path ignores or
instructions, first inspect that effective configuration with an authorized owner. Introducing a local
YAML file would be a policy/configuration change and needs its own review of precedence and scope.

Inspect the review's additional-context section to see which repository instructions it consumed. Keep shared architecture in canonical docs and link it from agent bootstraps.
There is no evidence here for a complete list of provider instructions or ignored paths.

## Reviewing a PR with CodeRabbit

1. Read the status description and review comment before counting the check as completed analysis.
2. Compare the reported base/head range with the PR's current commits.
3. Evaluate actionable suggestions against the current source, not only the quoted diff.
4. Apply accepted changes through the normal branch workflow, with relevant validation.
5. Use the provider's authorized review controls if another review is needed; verify the resulting
   comment covers the new head.
6. Resolve conversations after the implementation or explanation is complete.

The [main ruleset](https://github.com/kartuli-app/kartuli/rules/9070716), inspected on 2026-10-06,
requires resolved review threads but does not name CodeRabbit as a required status. Human review and
bot status enforcement are separate settings; neither should be inferred from the green icon.

## Troubleshooting

| Symptom | Investigation |
| --- | --- |
| Green check without fresh comments | Read the status description for skipped/disabled review |
| Summary mentions old files | Compare the comment's commit range and update time with the latest head |
| Missing review on a new PR | Check organization trigger/draft/path settings and service availability |
| Conflicting bot advice | Prefer verified contracts, repository instructions and actual test evidence |
| Generated release notes overwrite hand edits | Edit the human-owned PR description outside the bot's marked block |

Read-only GitHub commands:

```bash
gh pr view PR_NUMBER --json headRefOid,comments,reviews,statusCheckRollup
gh pr checks PR_NUMBER
```

Installation permissions, current organization rules, data retention, model/provider processing and
billing are not exposed by the inspected PR. Their owners must verify them in CodeRabbit/GitHub
administration; this page records observed behavior without assuming defaults.
