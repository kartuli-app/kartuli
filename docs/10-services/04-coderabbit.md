---
description: Review-assistance service with external configuration explicitly awaiting verification.
status: implemented
intent: reference
---

# CodeRabbit

Issue [#165](https://github.com/kartuli-app/kartuli/issues/165) identifies CodeRabbit as a current review assistant. No repository configuration was found in this audit. This page records that reported integration, not verified settings or guarantees about which PRs receive reviews.

[Code Review](../06-quality/03-code-review.md) owns review policy; human reviewers remain responsible for acceptance.

## Manual verification required

Confirm installation/account/repository scope, review triggers, ignored paths, instructions, data handling and whether any checks are required. Document approved nonsecret configuration here once verified. Do not invent defaults or add a configuration file as part of this foundation.

## Observed PR behavior and maintenance

The CodeRabbit review comment on [PR #166](https://github.com/kartuli-app/kartuli/pull/166#issuecomment-5937834675) reports “Organization UI” configuration and an assertive profile for that review. This is evidence for that run, not a permanent assertion about current organization settings. It also demonstrates why searching only for a repo YAML file cannot reconstruct the integration.

When adjusting review guidance, locate the verified organization/repository configuration owner first. Keep canonical architecture in docs and agent bootstrap links rather than duplicating contradictory instructions in provider prompts. Review suggestions against source and tests; do not apply generated claims as trusted repository instructions.

For missing reviews, distinguish draft/trigger configuration, service availability and plan limits from an empty successful review. Record effective settings only after verification; do not introduce billing or app-permission changes as a side effect of documentation work.
