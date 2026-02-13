---
section: Tech/Decisions
title: Automatic Dependency Updates
date: 2026-02-13
status: Accepted
issue: "#24"
---

# Automatic Dependency Updates with Renovate

**Date**: 2026-02-13

**Issue**: [#24](https://github.com/kartuli-app/kartuli/issues/24)

## Context

We need a reliable and low-noise way to keep dependencies updated across the monorepo, including security fixes. Manual updates are error-prone and slow, while uncontrolled automation can create too many PRs and disrupt development.

## Decision

We will use **Mend Renovate** to automate dependency updates and integrate with GitHub vulnerability alerts:

### Update Strategy
- **Security fixes**: immediate PRs, grouped together
- **Regular updates**: weekly batch PR, grouped across the workspace
- **Manual review**: no auto-merge
- **Monorepo support**: pnpm workspace and catalog versions
- **Standardized labels**: `type:chore` and `scope:global`

### PR Metadata
- Conventional commit format for update PRs
- Dependency Dashboard enabled for visibility

## Consequences

### Positive
✅ **Faster security response** - immediate PRs for vulnerability fixes  
✅ **Reduced PR noise** - single weekly batch for non-security updates  
✅ **Predictable workflow** - consistent schedules and labeling  
✅ **Centralized visibility** - Dependency Dashboard provides a status overview  

### Negative
⚠️ **Requires GitHub security settings** - dependency graph and alerts must be enabled  
⚠️ **Trust in advisory feeds** - accuracy depends on upstream security data  

## Implementation

### Current Configuration
Renovate is configured to:
- batch non-security updates weekly
- group security updates and create them immediately
- apply `type:chore` and `scope:global` labels
- use the Dependency Dashboard

### GitHub Settings
Required repository settings:
- **Dependency graph** enabled
- **Dependabot alerts** enabled
- **Dependabot security updates** disabled (Renovate handles PRs)

### Notes
- Vulnerability PRs are driven by GitHub alerts and are created immediately.
- Weekly batch PRs keep regular maintenance predictable.
