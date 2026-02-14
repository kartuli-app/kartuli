---
section: Tech/Development
title: Code Conventions
---

# Code conventions

## Commit Convention

Always use conventional commit format for all commits:

### Format
```
<type>[optional scope]: <description>
```

### Supported Types
- **feat**: New feature
- **fix**: Bug fix  
- **chore**: Infrastructure, setup tasks, non-feature work
- **docs**: Documentation changes
- **test**: Testing-related changes
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **style**: Code style changes (formatting, etc.)
- **ci**: CI/CD changes

### Scope Examples
Use scopes to indicate which part of the monorepo is affected:
- `game-client` - Game client application
- `backoffice-client` - Backoffice client application  
- `ui` - UI package
- `storybook` - Storybook tool
- `e2e` - E2E testing
- `global` - Shared packages or general repository tasks

### Examples
```bash
feat(game-client): add user authentication
fix(ui): resolve button alignment on mobile
docs: update contributing guidelines
chore(e2e): upgrade Playwright to v1.40
test: add unit tests for auth module
refactor(ui): extract common button component
perf(game-client): optimize image loading
style: fix code formatting
ci: add automated dependency updates
```

### Enforcement
- **Local**: Git hooks validate commit messages automatically
- **CI**: PR titles must follow the same format
- **Specification**: [Conventional Commits](https://www.conventionalcommits.org/)

## Code Style
- Use TypeScript for all new code
- Follow Biome configuration for linting and formatting
- Write meaningful variable and function names
- Fix any warnings or errors immediately when they appear

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
- LLM bundle is generated automatically using shared `docs-processor.js` utility
- VitePress builds with proper base URL configuration for GitHub Pages
- Use proper frontmatter format for navigation integration
- Follow ADR template for decision documents
- Link fixes are centralized in the shared processor for maintainability