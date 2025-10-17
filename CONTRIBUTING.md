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

## GitHub Actions
Our workflows handle:
- **Label Management**: Auto-apply, propagate, and sync labels
- **Documentation**: Generate LLM bundle, test, and deploy to GitHub Pages
- **Quality**: Automated linting and testing

See [GitHub Workflow](./docs/tech/development/github-workflow.md) for detailed information.