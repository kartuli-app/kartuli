---
description: Automatic analysis evidence and the non-executed Sonar configuration reference.
status: implemented
intent: reference
---

# SonarCloud

`sonar-project.properties` explicitly states it is **not consumed by the scanner**: SonarCloud uses GitHub App automatic analysis. It points to project key `kartuli-app_kartuli` and records desired exclusions:

- Source exclusions: `diagrams/output/**`, `**/i18n/resources/messages/**`.
- Duplication exclusion: `**/tailwind-integration.test.ts`.

These are reference values to compare with SonarCloud UI, not proof of effective configuration. [Quality](../06-quality/index.md) owns static-analysis expectations.

## Manual verification required

Confirm the GitHub App installation, organization/project mapping, automatic-analysis mode, actual UI exclusions, quality gate/profile, branch/PR coverage and required-check enforcement. Record discrepancies without changing unrelated analysis infrastructure in a docs PR.

## Maintaining configuration

When source exclusions change, update the reference file and have a maintainer reconcile the actual automatic-analysis UI settings. Record the verified date and discrepancy in this page or a linked decision; editing `sonar-project.properties` alone has no scanner effect in this mode.

When a finding seems inconsistent, check analysis revision/branch, selected quality profile/gate and actual exclusions before adding suppression. Coverage emitted by Vitest and a GitHub coverage comment do not prove SonarCloud imported those reports; verify automatic-analysis coverage behavior independently.

Use findings to review maintainability/correctness, not as evidence of a complete security audit. Check status enforcement through GitHub separately from whether SonarCloud produced a result.
