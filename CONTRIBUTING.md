# Contributing to Kartuli

Welcome! Please read our documentation:

## Core Guidelines
- [Code Conventions](./docs/tech/development/code-conventions.md) - Commit format, code style, architecture, testing
- [GitHub Workflow](./docs/tech/development/github-workflow.md) - Issues, PRs, labels, templates, automation
- [AI-Assisted Workflow](./docs/tech/development/ai-assisted-workflow.md) - Complete workflow using AI assistance

## Documentation System
- [Documentation Management](./docs/tech/decisions/documentation-management.md) - How our docs system works
- [Web Docs Client README](./tools/web-docs-client/README.md) - Technical details of the documentation site

## Quick Start
1. **Create Issue**: Use our issue template with proper labels
2. **Create Branch**: GitHub can auto-create from issue
3. **Implement**: Follow code conventions and test your changes
4. **Create PR**: Link to issue using `Closes #123`
5. **Review & Merge**: Labels auto-propagate, workflows handle deployment

## Documentation Changes
- All documentation changes trigger automated workflows
- LLM bundle is generated automatically on deployment
- Use proper frontmatter format for navigation integration
- Follow ADR template for decision documents

## Collaboration and security

- [GitHub Repo Management](docs/providers/github-repo-management.md) — How we handle contributors (fork vs direct collaborator), workflow and secrets security, and protecting the `.github/` folder.

## GitHub Actions
Our workflows handle:
- **Label Management**: Auto-apply, propagate, and sync labels
- **Documentation**: Generate LLM bundle, test, and deploy to GitHub Pages
- **Quality**: Automated linting and testing

See [GitHub Workflow](./docs/tech/development/github-workflow.md) for detailed information. For pipeline structure (staging orchestrator, production workflows per app/tool), see [Staging pipelines](./docs/tech/development/staging-pipelines.md), [Production pipelines](./docs/tech/development/production-pipelines.md), and [Pipeline overview](./docs/tech/architecture/pipeline-overview.md). Full list of repository secrets: [GitHub Actions CI/CD — Secrets](./docs/providers/github-actions-ci-cd.md#secrets).