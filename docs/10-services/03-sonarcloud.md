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
