---
description: Current security boundaries, secret handling and planned authentication capabilities.
status: implemented
intent: reference
---

# Security

This section owns authentication, authorization, secret handling, application security and vulnerability management independently of future providers.

## Current boundaries

Game Client learning state is local and its generated owner/device IDs are not authenticated identities. They must not be treated as authorization claims. No completed backend auth or Backoffice permission model is established by the repository. The Backoffice scaffold's existence does not make privileged content operations safe.

Document secret **names and purposes only**, never values. Workflow credentials and provider verification tasks are cataloged in [Services](../10-services/index.md). `.env` and local environment files are ignored, but ignore rules are not a substitute for avoiding credential exposure in source, logs or docs.

Renovate vulnerability behavior is configured in `renovate.json`; [Dependency Management](../07-platform/04-dependency-management.md) owns update mechanics. GitHub workflow permissions are explicit in YAML. Installed app permissions, repository protection and credential rotation need manual verification.

## Planned capabilities

Authentication and authorization designs, a data-access model for content editing, a vulnerability response policy and secret rotation/runbooks remain planned. Supabase is evaluating, not an adopted authentication architecture. When implementing these capabilities, specify trust boundaries here and provider details under Services; coordinate identifiers/retention with [Data & Privacy](../09-data-and-privacy/index.md).
