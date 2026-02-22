---
section: Apps/Backoffice Client
title: Backoffice Client Hub
description: "Hub for the backoffice client app: overview, root scripts, and CI/CD."
type: hub
---

# Backoffice Client Hub

## Overview

The backoffice client is the content management and administration interface for Kartuli (Next.js). It is deployable to Vercel and runs in staging (preview) and production.

**In-repo README:** [apps/backoffice-client/README.md](https://github.com/kartuli-app/kartuli/blob/main/apps/backoffice-client/README.md)

## Root scripts that apply

From the repository root you can use:

| Script | Description |
|--------|-------------|
| `pnpm c:dev:backoffice-client` | Start development server (port 3001) |
| `pnpm c:build:backoffice-client` | Build for production |
| `pnpm c:preview:backoffice-client` | Run production build locally |
| `pnpm c:e2e:backoffice-client` | Run E2E tests against local backoffice (BASE_URL=http://localhost:3001) |

See [Root scripts](../../tech/development/root-scripts.md) for the full list of root-level commands.

## CI/CD

- [CI/CD Staging](./ci-cd-staging.md) — Runs on PR when the backoffice client (or game client) is affected; build, optional Vercel preview, E2E, Lighthouse.
- [CI/CD Production](./ci-cd-production.md) — Runs on push to `main` when backoffice-client (or related) paths change; deploy to Vercel, E2E, Lighthouse.

## References

### Related docs

- [Staging pipelines](../../tech/development/staging-pipelines.md)
- [Production pipelines](../../tech/development/production-pipelines.md)
- [Documentation Home](../../index.md)

### Providers

- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
- [Vercel Next.js Hosting](../../providers/vercel-nextjs-hosting.md)
