### GitHub Workflow

This document describes how we use GitHub for collaboration, issue tracking, and release management.

## Issues and Pull Requests

### Creating Issues

All work should start with a GitHub issue. Use our issue template to ensure consistency:

1. Navigate to **Issues** → **New Issue**
2. Select **Feature or Task** template
3. Fill out all required sections:
   - **Type**: Select one (feat, chore, fix, docs, test)
   - **Scope**: Select applicable scope(s) (game-client, backoffice-client, ui, storybook, e2e, global)
   - **Description**: Clearly describe what needs to be done
   - **Acceptance Criteria**: List specific conditions for completion
4. Optionally add:
   - **Size**: Estimate effort (small/medium/large)
   - **Priority**: Set priority level (high/medium/low)
   - **Extra Tags**: Mark as `good-first-issue` or `help-wanted` if appropriate

### Creating Pull Requests

#### From an Issue (Recommended)
The recommended approach is to create a PR directly from an issue:

1. Navigate to the issue
2. Click **"Create a branch"** in the right sidebar (or **"Development"** section)
3. This creates a linked branch and helps GitHub auto-link the PR to the issue

#### Manual PR Creation
If creating a PR manually:

1. Create your feature branch locally
2. Make your changes following our coding standards
3. Push your branch to GitHub
4. Create a pull request using our PR template
5. **Important**: Link to the issue using keywords in the PR description:
   - `Closes #123` - Closes the issue when PR is merged
   - `Fixes #456` - Same as `Closes`
   - `Resolves #789` - Same as `Closes`

#### PR Title Format
PR titles **must** follow conventional commit format for proper changelog generation.

See [Development Conventions](03-development-conventions.md#conventional-commits) for the complete specification.

**Quick examples**:
- `feat(game-client): add user authentication system`
- `fix(ui): resolve button alignment on mobile`
- `docs: update contributing guidelines`
- `chore(e2e): upgrade Playwright to v1.40`

### Label Propagation

When you create a PR from an issue or link it properly using keywords (`Closes #123`), our automation will:
- Automatically copy labels from the issue to the PR
- This helps maintain consistent labeling across issues and PRs

## Labels Structure

Our repository uses a structured labeling system to organize and categorize work.

### Scope Labels (Blue - `#0075ca`)
Define which part of the monorepo is affected:

- `scope:game-client` - Game client application
- `scope:backoffice-client` - Backoffice client application
- `scope:ui` - UI package
- `scope:storybook` - Storybook tool
- `scope:e2e` - E2E testing
- `scope:global` - Shared packages or general repository tasks

### Type Labels (Green - `#28a745`)
Aligned with conventional commit types:

- `type:feat` - New feature
- `type:chore` - Infrastructure, setup tasks, non-feature work
- `type:fix` - Bug fix
- `type:docs` - Documentation changes
- `type:test` - Testing-related changes

### Priority Labels (Red/Orange/Yellow)
Indicate urgency and importance:

- `priority:high` (Red - `#d73a4a`) - Urgent, blocking issues
- `priority:medium` (Orange - `#ff9800`) - Important, should be addressed soon
- `priority:low` (Yellow - `#ffd700`) - Nice to have, can wait

### Size Labels (Purple - `#9c27b0`)
Estimate the effort required:

- `size:small` - Quick fix, minor change (< 2 hours)
- `size:medium` - Moderate effort (2-8 hours)
- `size:large` - Significant work (> 8 hours)

### Extra Labels
Special purpose labels:

- `good-first-issue` (Purple - `#7057ff`) - Suitable for newcomers
- `help-wanted` (Teal - `#008672`) - Community help is appreciated

### Applying Labels

**On Issues**: Apply labels when creating or updating issues. Required labels are Type and Scope.

**On PRs**: Labels are automatically propagated from linked issues. You can also add labels manually if needed.

## Linking Issues and PRs

### Automatic Linking
GitHub supports several methods to link PRs to issues:

1. **Using the GitHub UI**: Click "Create a branch" or "Development" section on an issue
2. **Using keywords in PR description**: `Closes #123`, `Fixes #456`, `Resolves #789`
3. **Using the PR sidebar**: Select linked issues in the "Development" section

### Closing Issues Automatically
When you use keywords like `Closes #123` in your PR description, GitHub will:
- Link the PR to issue #123
- Automatically close issue #123 when the PR is merged
- Add a reference in the issue timeline

### Multiple Issues
If your PR addresses multiple issues:
```
Closes #123
Closes #456
Fixes #789
```

## Versioning and Milestones

### Monorepo Versioning Strategy

Kartuli uses a monorepo structure with internal package dependencies. Our versioning approach:

- **Packages** (`/packages/*`): Consumed internally by apps and tools
- **Apps** (`/apps/*`): Consumer-facing applications (game-client, backoffice-client)
- **Tools** (`/tools/*`): Development and testing tools (storybook, e2e)

### Internal Versioning
- Packages are versioned internally but not published to npm
- Apps consume packages via workspace references
- Builds and deployments are triggered when package dependencies change
- We track versions in `package.json` files for dependency management

### Milestones for Release Planning
We use GitHub Milestones to track releases and feature sets:

1. **Creating Milestones**: Milestones represent planned releases or feature groups
2. **Assigning Issues**: Add issues to milestones during planning
3. **Tracking Progress**: Milestones show completion percentage
4. **Release Notes**: When a milestone is complete, we use it to generate release notes

### Conventional Commits for Changelog
We use conventional commit format to automatically generate changelogs:
- `feat:` - New features appear in release notes
- `fix:` - Bug fixes appear in release notes
- `chore:`, `docs:`, `test:` - Usually excluded from user-facing changelog

See [Development Conventions](03-development-conventions.md#conventional-commits) for complete commit format specification.

## GitHub Actions

### Syncing Labels to GitHub

Labels are defined in `.github/labels.yml`. To sync them with GitHub:

1. Navigate to **Actions** tab
2. Select **"Sync Labels"** workflow
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait for completion (usually < 30 seconds)

**When to sync**:
- After adding new labels to `.github/labels.yml`
- After modifying label names, colors, or descriptions
- When setting up a new repository

**Note**: The sync action uses `delete-other-labels: false`, meaning it won't delete labels created manually in GitHub.

### Automatic Label Propagation

The **"Propagate Labels from Issue to PR"** workflow runs automatically when:
- A new pull request is created
- The PR description contains issue keywords (`Closes #123`, `Fixes #456`, etc.)

This workflow:
1. Extracts the linked issue number from the PR description
2. Fetches labels from that issue
3. Applies the same labels to the PR

No manual action required - it runs automatically!

## Templates

### Issue Template
Located at `.github/ISSUE_TEMPLATE/feature_or_task.md`

Single comprehensive template for all issues (features, bugs, tasks, documentation).

**Required fields**:
- Type (feat, chore, fix, docs, test)
- Scope (game-client, backoffice-client, ui, storybook, e2e, global)
- Description
- Acceptance Criteria

**Optional fields**:
- Size estimate
- Priority level
- Extra tags (good-first-issue, help-wanted)
- Notes and references

### Pull Request Template
Located at `.github/pull_request_template.md`

Standard template for all pull requests.

**Required sections**:
- Description
- Linked issues (using `Closes #` keywords)
- Type selection
- Scope selection

**Optional sections**:
- Screenshots
- Preview links
- Testing notes

**Important**: PR title must follow conventional commit format.

