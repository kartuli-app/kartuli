---
section: Tools/Storybook
title: Storybook Hub
description: "Hub for Storybook: component development and documentation, root scripts, and CI/CD."
type: hub
---

# Storybook Hub

## Overview

Storybook is the component development and documentation tool for Kartuli UI components. It is a build tool (not deployable as a product); it runs in staging CI only (no production pipeline).

**In-repo README:** [tools/storybook/README.md](https://github.com/kartuli-app/kartuli/blob/main/tools/storybook/README.md)

## Root scripts that apply

From the repository root you can use:

| Script | Description |
|--------|-------------|
| `pnpm c:dev:storybook` | Start Storybook dev server (port 6006) |
| `pnpm c:build:storybook` | Build static Storybook site |
| `pnpm c:preview:storybook` | Run Storybook preview locally |
| `pnpm c:e2e:storybook` | Run E2E tests against local Storybook (BASE_URL=http://localhost:6006) |

See [Root scripts](../../tech/development/root-scripts.md) for the full list of root-level commands.

## CI/CD

- [CI/CD Staging](./ci-cd-staging.md) — Runs on PR when Storybook is affected; build, preview, E2E smoke.

Storybook has no production deploy workflow.

## References

### Related docs

- [Staging pipelines](../../tech/development/staging-pipelines.md)
- [Documentation Home](../../index.md)

### Providers

- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
