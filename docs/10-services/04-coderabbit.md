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

## Verified behavior and its scope

The GitHub connector inspected PR #166 and commit `700f639` on **2026-10-06**.

| Evidence | What it establishes |
| --- | --- |
| [CodeRabbit review comment](https://github.com/kartuli-app/kartuli/pull/166#issuecomment-5937834675) | A review ran using Organization UI configuration, ASSERTIVE profile and an Advanced plan |
| Commit range in that comment | That review covered the initial `10ce3d0` revision, not every later commit |
| Review result | No actionable comments were generated in that review; additional informational comments and language feedback exist |
| Status on `700f639` | Success with description “Review skipped: automatic reviews are disabled” |
| Generated PR-body section | The bot maintains a release-note summary between its generated-comment markers |

The earlier completed review and later skipped status are both valid observations. A green CodeRabbit
status must not be described as a review of the latest change unless the comment's commit range
supports that claim. The comment also records the allowance for that run; billing and quotas are
time-specific and should not be copied as permanent repository limits.

## Configuration responsibility

The observed configuration owner is the organization UI. To change triggers, profile, path ignores or
instructions, first inspect that effective configuration with an authorized owner. Introducing a local
YAML file would be a policy/configuration change and needs its own review of precedence and scope.

The existing review's additional-context section shows it consumed `CLAUDE.md` and repository
documentation rules. Keep shared architecture in canonical docs and link it from agent bootstraps.
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
gh pr view 166 --json headRefOid,comments,reviews,statusCheckRollup
gh pr checks 166
```

Installation permissions, current organization rules, data retention, model/provider processing and
billing are not exposed by the inspected PR. Their owners must verify them in CodeRabbit/GitHub
administration; this page records observed behavior without assuming defaults.
