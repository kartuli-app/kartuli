---
section: Providers
title: GitHub Pages Hosting
type: provider
description: How GitHub Pages hosts the documentation site and deployment constraints.
---

# GitHub Pages Hosting

## Overview

GitHub Pages hosts our built docs site for public access. This doc covers capability, usage, limits, and operations.

## Capability

- Serves static sites from repository or from workflow-uploaded artifacts.
- Custom domain and HTTPS. Public access.

## Current usage

- Production hosting for: Web Docs Client (docs site and LLM bundle at `/kartuli/`).

## Limits and cost

- For **public repositories**, GitHub Pages is **free**. See [GitHub Pricing](https://github.com/pricing).
- GitHub publishes limits on site size (e.g. 1 GB per site) and deployment frequency. Our current docs site is well within these; if the site or deploy frequency grows, check the pricing page for current numbers.

## Operations

- Keep publishing path and base URL aligned with deployment target (e.g. `/kartuli/`).
- Coordinate deployment workflow changes with hosting configuration (e.g. Pages source set to GitHub Actions).

## References

### Related Docs

- [Web Docs Client Hub](../tools/web-docs-client/index.md)
- [Web Docs Client CI/CD Production](../tools/web-docs-client/ci-cd-production.md)
- [Web Docs Client CI/CD Staging](../tools/web-docs-client/ci-cd-staging.md)
- [GitHub Pricing](https://github.com/pricing)

### Providers

- [GitHub Actions CI/CD](./github-actions-ci-cd.md)
