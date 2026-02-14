---
section: Tools/Web Docs Client
title: Web Docs Client CI/CD Production
type: ci-cd
---

# Web Docs Client CI/CD Production

## Triggers

- Pushes to the main branch affecting docs-related sources.
- Manual workflow dispatch when needed.

## Pipeline Steps

- Install dependencies.
- Generate documentation artifacts as needed.
- Build the docs site.
- Publish to the production hosting target.

## Validation Gates

- Build succeeds.
- Required generation steps succeed.
- Deployment step completes successfully.

## Failure Handling

- Inspect workflow run logs.
- Fix failing stage and re-run the workflow.
- If deployment fails after build success, retry deployment after root cause validation.

## References

### Related Docs

- [Web Docs Client Hub](./index.md)
- [Web Docs Client CI/CD Staging](./ci-cd-staging.md)
- [GitHub Actions CI/CD Provider](../../providers/github-actions-ci-cd.md)
- [GitHub Pages Hosting Provider](../../providers/github-pages-hosting.md)
