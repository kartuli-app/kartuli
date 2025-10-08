### Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for all commit messages and PR titles.

#### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, no logic change)
- `refactor` - Code refactoring (no feature change or bug fix)
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Infrastructure, tooling, dependencies, non-feature work

#### Scopes

Scopes identify which part of the monorepo is affected:

- `game-client` - Game client application
- `backoffice-client` - Backoffice client application
- `ui` - UI package
- `storybook` - Storybook tool
- `e2e` - E2E testing
- No scope - For global changes affecting multiple parts or the entire repository

#### Examples

**With scope:**
```
feat(game-client): add user authentication system
fix(ui): resolve button alignment on mobile
docs(storybook): update component documentation
chore(e2e): upgrade Playwright to v1.40
test(ui): add unit tests for Button component
```

**Without scope (global changes):**
```
feat: add monorepo structure
docs: update README
chore: configure ESLint for workspace
```

**With body and footer:**
```
feat(game-client): add offline sync capability

Implements delta merging for progress data when coming back online.
Uses last-write-wins strategy with timestamp comparison.

Closes #123
```

#### Rules

1. **Type and description are required**
2. **Scope is optional but recommended**
3. **Use lowercase** for type and scope
4. **Use present tense** in description ("add" not "added")
5. **No period** at the end of description
6. **Keep description under 72 characters**
7. **PR titles must follow this format** for changelog generation

### Code Style

#### General Principles

- Use TypeScript for all new code
- Follow the ESLint configuration
- Use Prettier for code formatting (configuration in workspace)
- Write meaningful variable and function names
- Prefer functional programming patterns where appropriate

#### Testing

- Test files live next to the file they are testing (no separate test folders)
- Maintain test coverage above 80%
- Use descriptive test names that explain the scenario
- Test both happy path and edge cases
- Use the test utilities from `@kartuli/test-utils`

#### File Naming

- Components: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`, `apiClient.ts`)
- Tests: Same name with `.test` or `.spec` suffix (e.g., `Button.test.tsx`)
- Constants: UPPER_SNAKE_CASE in dedicated files (e.g., `API_ENDPOINTS.ts`)

#### Import Order

1. External dependencies (React, third-party libs)
2. Internal packages (from workspace)
3. Relative imports from parent directories
4. Relative imports from same directory
5. Type imports (if not inlined)

Example:
```typescript
import { useState } from 'react';
import { Button } from '@kartuli/ui';
import { formatDate } from '../../utils/formatDate';
import { UserCard } from './UserCard';
import type { User } from './types';
```

### Documentation Hierarchy Maintenance

Our documentation uses a nested structure with README files at multiple levels. **It is critical** to update all relevant READMEs when adding, removing, or updating documentation files.

#### README Hierarchy

```
/docs/
├── README.md                           (Root - lists all major sections)
├── 07-technology/
│   ├── README.md                       (Parent - lists all technology docs)
│   └── 01-shared/
│       ├── README.md                   (Folder - lists shared tech docs)
│       ├── 01-guiding-decisions.md
│       ├── 02-infrastructure.md
│       ├── 03-development-conventions.md
│       └── 04-github-workflow.md
```

#### When Adding a Document

**Example**: Adding `/docs/07-technology/01-shared/05-deployment.md`

1. ✅ Create the document with proper numbering
2. ✅ Update `/docs/07-technology/01-shared/README.md` - Add link in the folder's README
3. ✅ Update `/docs/07-technology/README.md` - Add link in the parent README
4. ✅ Update `/docs/README.md` - Only if adding a new top-level section
5. ✅ Verify links work from root to the new document

#### When Renaming a Document

**Example**: Renaming `04-github-workflow.md` to `04-collaboration-workflow.md`

1. ✅ Rename the file
2. ✅ Update link in `/docs/07-technology/01-shared/README.md`
3. ✅ Update link in `/docs/07-technology/README.md`
4. ✅ Search for cross-references in other documents and update them
5. ✅ Verify all links still work

#### When Deleting a Document

**Example**: Removing `/docs/07-technology/01-shared/04-github-workflow.md`

1. ✅ Delete the file
2. ✅ Remove link from `/docs/07-technology/01-shared/README.md`
3. ✅ Remove link from `/docs/07-technology/README.md`
4. ✅ Search for cross-references in other documents
5. ✅ Remove or update those cross-references
6. ✅ Verify no broken links remain

#### When Reordering Documents

**Example**: Swapping order of two documents in a folder

1. ✅ Rename files to new numbers (e.g., `03-*.md` ↔ `04-*.md`)
2. ✅ Update all affected README.md files with new order
3. ✅ Update any cross-references that mention document numbers
4. ✅ Maintain logical flow within the folder

#### Quick Checklist

For **any** documentation change, always verify:

- [ ] Immediate folder's `README.md` updated
- [ ] Parent folder's `README.md` updated (if nested)
- [ ] Root `/docs/README.md` updated (if needed)
- [ ] Cross-references in other docs updated (for renames/deletes)
- [ ] All links tested from root to leaf
- [ ] Zero-padded numbering maintained (01, 02, 03...)
- [ ] Logical order preserved

#### Why This Matters

Breaking documentation links frustrates contributors and makes the project harder to navigate. By maintaining the README hierarchy at all levels, we ensure:

- **Discoverability**: Documentation is easy to find
- **Navigation**: Clear paths from root to any document
- **Reliability**: No broken links
- **Professional**: Well-organized, maintained project
