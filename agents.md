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
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful variable and function names

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
