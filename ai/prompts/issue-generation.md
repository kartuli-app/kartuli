# Issue Generation Prompt

## Phase 1: Idea Exploration

I have an idea for the Kartuli project. I've attached the project documentation for context.

My idea: [DESCRIBE YOUR IDEA HERE]

Let's discuss and refine this idea. Help me think through:
- What exactly needs to be built
- Why it's valuable for the project
- What defines "done" (acceptance criteria)
- Any constraints or considerations
- Estimated complexity and priority

Let's have a conversation until we're both satisfied with the refined idea.

---

## Phase 2: Format as GitHub Issue

Now that we've refined the idea, format it as a complete GitHub issue following the template at `.github/ISSUE_TEMPLATE/feature_or_task.md`.

Generate the complete markdown with:

1. **Title** in conventional commit format: `<type>(<scope>): <description>`
   - Types: feat, chore, fix, docs, test
   - Scopes: game-client, backoffice-client, ui, storybook, e2e, global

2. **Label Selection Checkboxes** - Mark selected labels with `[x]`, leave others unchecked `[ ]`:
   
   **Type** (select exactly one):
   - [ ] `type:feat` - New feature
   - [ ] `type:chore` - Infrastructure, setup tasks, non-feature work
   - [ ] `type:fix` - Bug fix
   - [ ] `type:docs` - Documentation changes
   - [ ] `type:test` - Testing-related changes
   
   **Scope** (select one or more):
   - [ ] `scope:game-client` - Game client application
   - [ ] `scope:backoffice-client` - Backoffice client application
   - [ ] `scope:ui` - UI package
   - [ ] `scope:storybook` - Storybook tool
   - [ ] `scope:global` - Shared packages or general repository tasks
   - [ ] `scope:e2e` - E2E testing
   
   **Size** (optional, select one):
   - [ ] `size:small` - Small task or change
   - [ ] `size:medium` - Medium-sized task or change
   - [ ] `size:large` - Large task or change
   
   **Priority** (optional, select one):
   - [ ] `priority:high` - High priority
   - [ ] `priority:medium` - Medium priority
   - [ ] `priority:low` - Low priority
   
   **Extra Tags** (optional):
   - [ ] `good-first-issue` - Good for newcomers
   - [ ] `help-wanted` - Extra attention is needed
   
   **CRITICAL:** Use the EXACT checkbox format shown above. Mark selected items with `[x]` and unselected with `[ ]`.
   Example for a chore affecting ui and storybook:
   ```markdown
   - [x] `type:chore`
   - [ ] `type:feat`
   - [x] `scope:ui`
   - [x] `scope:storybook`
   ```

3. **Description / Context** - Clear explanation with background

4. **Acceptance Criteria** in checkbox format: `- [ ] Criteria here`

5. **Notes / References** (if relevant)

**Important:** Generate the complete markdown ready to copy/paste into GitHub. I should only need to review and paste - no manual editing of checkboxes or formatting.

**Validation checklist before generating:**
- ✅ All selected labels use `- [x]` format (dash, space, square brackets with lowercase x)
- ✅ All unselected labels use `- [ ]` format (dash, space, empty square brackets)
- ✅ Labels are wrapped in backticks: `` `type:feat` ``
- ✅ NO asterisk bullets (`*`) - only dash bullets (`-`)
- ✅ At least one Type and one Scope are selected
- ✅ Acceptance criteria use `- [ ]` format (unchecked, to be checked during implementation)
