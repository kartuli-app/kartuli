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

2. **Checkboxes already marked [x]** for:
   - Type (select one): type:feat, type:chore, type:fix, type:docs, type:test
   - Scope (one or more): scope:game-client, scope:backoffice-client, scope:ui, scope:storybook, scope:e2e, scope:global
   - Size (optional): size:small, size:medium, size:large
   - Priority (optional): priority:high, priority:medium, priority:low
   - Extra tags (optional): good-first-issue, help-wanted

3. **Description / Context** - Clear explanation with background

4. **Acceptance Criteria** in checkbox format: `- [ ] Criteria here`

5. **Notes / References** (if relevant)

**Important:** Generate the complete markdown ready to copy/paste into GitHub. I should only need to review and paste - no manual editing of checkboxes or formatting.
