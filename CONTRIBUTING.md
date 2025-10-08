# Contributing to Kartuli

Thank you for your interest in contributing to Kartuli! We're building an innovative language learning platform, and we welcome contributions of all kinds.

## Quick Start

1. **Find or create an issue** - Browse [existing issues](../../issues) or create a new one
2. **Fork and clone** - Fork the repository and clone it locally
3. **Create a branch** - Use GitHub's "Create a branch" feature from the issue
4. **Make your changes** - Follow our [development conventions](/docs/07-technology/01-shared/03-development-conventions.md)
5. **Submit a PR** - Create a pull request linking to the issue
6. **Review and merge** - Address feedback and get your changes merged!

## Development Workflow

### 1. Create or Find an Issue
All work starts with an issue. Use our [issue template](../../issues/new/choose) to ensure you include all necessary information.

### 2. Create a Branch
The easiest way is to click **"Create a branch"** in the issue's sidebar. This automatically links your branch to the issue.

### 3. Follow Conventions
- **Commits**: Use [conventional commit format](/docs/07-technology/01-shared/03-development-conventions.md#conventional-commits)
  - Examples: `feat(game-client): add login`, `fix(ui): button alignment`
- **Code Style**: Follow our [code style guidelines](/docs/07-technology/01-shared/03-development-conventions.md#code-style)
- **Testing**: Write tests for your changes (80% coverage minimum)

### 4. Create a Pull Request
- Use our [PR template](../../compare)
- Title must follow conventional commit format
- Link to the issue using `Closes #123` in the description
- Labels will auto-propagate from the issue

### 5. Review Process
- Address review feedback promptly
- Keep commits clean and logical
- Update documentation if needed

## Documentation

### Project Documentation
Our documentation lives in `/docs/` with a numbered folder structure:

- `01-mission-vision/` - Project mission and vision
- `02-business-strategy/` - Business model and strategy
- `03-glossary/` - Key terms and definitions
- `04-roadmap/` - Project phases and milestones
- `05-learning-system/` - Learning system architecture
- `06-product/` - Product experience and design
- `07-technology/` - Technical implementation details

See [/docs/README.md](/docs/README.md) for the complete structure.

### Updating Documentation

#### When to Update Docs
- **Architecture changes** → Update relevant technology docs
- **User experience changes** → Update product docs
- **New features** → Update roadmap and relevant sections
- **API or data model changes** → Update learning system docs

#### How to Update Docs

⚠️ **Important**: When adding, removing, or renaming documents in nested folders (e.g., `/docs/07-technology/01-shared/`), update README files at **EVERY level** of the hierarchy:
- Immediate folder's `README.md`
- Parent folder's `README.md` (if nested)
- Root `/docs/README.md` (if adding new top-level sections)

**Steps**:
1. Create/modify document with zero-padded numbering: `XX-document-name.md`
2. Update the immediate folder's `README.md` with the new/updated link
3. Update the parent folder's `README.md` if the document is in a nested folder
4. Update any cross-references in other documents (for renames/deletes)
5. Verify all links work from root to the document

See [Documentation Hierarchy Maintenance](/docs/07-technology/01-shared/03-development-conventions.md#documentation-hierarchy-maintenance) for detailed examples and scenarios.

## Technical Details

For detailed technical information, see:

- **[Development Conventions](/docs/07-technology/01-shared/03-development-conventions.md)** - Conventional commits, code style, testing
- **[GitHub Workflow](/docs/07-technology/01-shared/04-github-workflow.md)** - Issues, PRs, labels, versioning, automation
- **[Infrastructure](/docs/07-technology/01-shared/02-infrastructure.md)** - Tech stack and services
- **[Architecture](/docs/07-technology/02-game-client/01-application-architecture.md)** - Application architecture

## Getting Help

- **Questions?** Open a [discussion](../../discussions)
- **Bug?** Create an [issue](../../issues/new/choose)
- **Need guidance?** Look for issues labeled [`good first issue`](../../labels/good%20first%20issue)

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to learn and build something great together.

---

**Happy Contributing! 🎉**
