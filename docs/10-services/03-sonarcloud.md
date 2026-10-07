---
description: SonarQube Cloud automatic analysis, enforced GitHub gate, issue triage and configuration ownership.
status: implemented
intent: reference
---

# SonarQube Cloud

Kartuli uses the hosted SonarQube Cloud service at project
[`kartuli-app_kartuli`](https://sonarcloud.io/dashboard?id=kartuli-app_kartuli).
The repository filename and GitHub check still use the former SonarCloud name.
There is no self-hosted SonarQube server or scanner job configured in this repository.

## Analysis and configuration ownership

`sonar-project.properties` explicitly documents GitHub App automatic analysis and says the scanner
does not consume the file. No workflow invokes a Sonar scanner or uploads LCOV to it.
Changes to this file therefore record desired settings; effective automatic-analysis settings live
in the provider UI.

| Reference setting | Intended value | Verification location |
| --- | --- | --- |
| Source exclusions | `diagrams/output/**,**/i18n/resources/messages/**` | Project Analysis Scope / exclusions |
| Duplication exclusions | `**/tailwind-integration.test.ts` | Project duplication exclusions |
| Analysis project | `kartuli-app_kartuli` | Analysis link on the GitHub check |
| Analysis mode | Automatic, according to the committed integration note | Provider project administration |
| Merge check | `SonarCloud Code Analysis` | GitHub main ruleset, integration 12526 |

Open the [project exclusion settings](https://sonarcloud.io/project/settings?category=exclusions&id=kartuli-app_kartuli)
to compare effective patterns with the reference file. The GitHub connector can verify PR reports and
branch enforcement; it cannot establish the provider's quality profile, gate thresholds or UI exclusions.

## What GitHub actually verifies

On **2026-10-06**, the [active main ruleset](https://github.com/kartuli-app/kartuli/rules/9070716)
required `SonarCloud Code Analysis` with strict status checking. This is the only status named in
that retrieved ruleset. See [GitHub](./01-github.md) for bypass and review settings.

Read the current PR report and its analysis revision to interpret gate results. New-code metrics
do not establish whole-repository coverage or absence of existing issues. A passed gate does not
prove coverage was imported or a coverage threshold applied.

## Investigating a finding

1. Open the failing check on the current PR head and verify the analysis branch/revision.
2. Record rule, file, line, severity and whether it is new-code or existing-code scope.
3. Read the surrounding implementation and its callers; reproduce the relevant behavior locally.
4. Make the smallest correction that preserves intended behavior, or record a supported disposition
   in the provider when a finding is intentionally accepted.
5. Run `pnpm run validate:all`, plus a build/browser check when the affected behavior requires it.
6. Push the authorized correction and wait for a fresh analysis. A local test pass alone does not
   clear the external gate.

## Common failure modes

| Symptom | Next check |
| --- | --- |
| Properties edit has no effect | Compare provider UI settings; this integration does not read the file |
| Local tests pass but the gate fails | Inspect the actual rule/metric; tests and static analysis have different scope |
| Coverage comment differs from Sonar | GitHub's Vitest report and Sonar analysis are separate pipelines |
| Check remains pending or absent | Verify the latest SHA, GitHub integration and provider analysis activity |
| Old finding persists after a fix | Confirm the analysis revision and whether the changed file was analyzed |
| Gate passes but merge is blocked | Inspect strict up-to-date policy, review threads and other GitHub rules |

`gh pr checks PR_NUMBER` is a read-only way to inspect the current check and its details link.
Provider account ownership, installation scope, actual profile/gate, retention and accepted-issue
policy remain external verification tasks. [Code Review](../06-quality/03-code-review.md) and
[Testing](../06-quality/01-testing/index.md) describe the complementary review and test requirements.
