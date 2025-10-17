---
section: Tech/Development
title: Code Conventions
---

# Code conventions

## Commit Convention
Always use conventional commit format for all commits:
- Format: `<type>[optional scope]: <description>`
- Types: feat, fix, docs, style, refactor, perf, test, chore
- Examples: `docs: add project overview`, `feat(auth): add social login`

## Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful variable and function names

## Architecture
- Prefer serverless and managed solutions
- Optimize for cost efficiency
- Design for offline-first functionality
- Use PWA best practices

## Testing
- Tests files live next to the file they are testing
- Avoid separate test folder
- Use descriptive test names
- Test both happy path and edge cases

## Documentation
- All documentation changes trigger automated workflows
- LLM bundle is generated automatically on deployment
- Use proper frontmatter format for navigation integration
- Follow ADR template for decision documents