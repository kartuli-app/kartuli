# AI Agent Instructions

## Git Workflow
- Never create commits unless explicitly requested by the user
- Always ask for permission before committing changes
- Use conventional commit format when commits are requested

## Code conventions

### Commit Convention
Always use conventional commit format for all commits:
- Format: `<type>[optional scope]: <description>`
- Types: feat, fix, docs, style, refactor, perf, test, chore
- Examples: `docs: add project overview`, `feat(auth): add social login`

### Code Style
- Use TypeScript for all new code
- Follow Biome configuration for linting and formatting
- Write meaningful variable and function names
- Fix any warnings or errors immediately when they appear

### Next.js Conventions
- Always use `src/` folder pattern (not root `app/`)
- Always include favicon (minimum `icon.svg` in app directory)
- Use TypeScript strict mode
- Include proper metadata in layouts

### Architecture
- Prefer serverless and managed solutions
- Optimize for cost efficiency
- Design for offline-first functionality
- Use PWA best practices

### Testing
- Tests files live next to the file they are testing
- Avoid separate test folder
- Use descriptive test names
- Test both happy path and edge cases

## Documentation System

### Documentation Changes
- All documentation changes trigger automated workflows
- LLM bundle is generated automatically on deployment
- Use proper frontmatter format for navigation integration
- Follow ADR template for decision documents

### Frontmatter Requirements
All documentation files must include:
```yaml
---
section: Tech/Decisions  # Navigation section
title: Document Title   # Display name
date: 2025-01-01       # For chronological sorting (ADRs)
status: Accepted        # ADR status
issue: "#123"          # Related GitHub issue
---
```

### ADR Template
Architecture Decision Records must follow strict format:
- **Context**: Why this decision is needed
- **Decision**: What was decided (single paragraph)
- **Consequences**: Positive and negative impacts
- **Implementation**: Current state of the system

### GitHub Actions
Our workflows handle:
- **Label Management**: Auto-apply, propagate, and sync labels
- **Documentation**: Generate LLM bundle, test, and deploy to GitHub Pages
- **Quality**: Automated linting and testing

### Workflow Names
- `labels-auto-apply-to-issues-from-template.yml`
- `labels-propagate-to-pr-from-linked-issue.yml`
- `labels-sync-available-on-github-from-repo-config.yml`
- `docs-generate-llm-bundle.yml`
- `docs-test-llm-bundle.yml`
- `docs-deploy-main.yml`
