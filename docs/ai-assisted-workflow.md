# AI-Assisted Workflow

Complete workflow for contributing to Kartuli using AI assistance, from idea to merged PR.

---

## Overview

The workflow has 4 phases:
1. **Refinement: Idea → Issue** - Refine idea into GitHub issue
2. **Implementation: Issue → PR** - Implement the issue
3. **Integration: PR → Main** - Review and merge
4. **Cleanup** - Post-merge housekeeping

Each phase can be done manually or with AI assistance.

---

## Refinement: Idea → Issue

### Manual
1. Think through requirements
2. Define acceptance criteria
3. Create issue using GitHub template
4. Check `[x]` label boxes
5. Labels auto-apply via GitHub Action

### With AI
1. **Generate project docs:** `node generate-docs-for-llm.ts`
2. **Use the prompt:** [`/ai/prompts/issue-generation.md`](/ai/prompts/issue-generation.md)
   - **Phase 1:** Attach docs to AI (ChatGPT, Claude, etc.), paste prompt, discuss idea
   - **Phase 2:** Ask AI to format as GitHub issue - AI generates complete markdown with labels already checked `[x]`
3. **Create issue on GitHub**
   - Review AI-generated markdown
   - Copy/paste into GitHub issue template
   - Labels auto-apply via GitHub Action

**Result:** Issue created in project board (Backlog status)

---

## Implementation: Issue → PR

### Create Branch

**Option A:** GitHub auto-create (recommended)
- Click "Create a branch" in issue sidebar
- Auto-linked to issue
- Share issue URL with AI to find branch

**Option B:** Manual creation
- Create branch following naming convention
- Link PR to issue using `Closes #X`

### Implement

**Use the prompt:** [`/ai/prompts/issue-implementation.md`](/ai/prompts/issue-implementation.md)

With Cursor or similar AI agent:
1. Paste prompt + issue URL
2. AI finds linked branch and switches to it
3. AI guides through: docs → implement → test → commit → PR
4. Confirm at decision points (commit message, PR updates)
5. Copy PR content AI generates

**Result:** PR created, labels auto-propagate from issue

### Handle Bot Feedback Loop

Automated code review bots (like Qodo) may provide suggestions. This can loop multiple times:

**For each review cycle:**
1. **Share PR link** with AI agent after it's created
2. **Review suggestions** - AI helps analyze each bot suggestion
3. **Discuss & decide** - Determine what to implement/reject/defer
4. **Implement approved changes:**
   - AI makes changes on same branch
   - Test and verify changes work
   - AI offers to generate formatted response comment for the bot
   - You confirm, AI provides markdown to copy/paste to PR
   - AI proposes commit message
   - You confirm, AI commits and pushes
5. **Wait for next bot review** and repeat

**Bot response format** (AI generates this for you):
- Lists each suggestion with team decision (✅ Applied / ❌ Rejected / ⏸️ Deferred)
- Includes team's reasoning for each decision
- Provides external AI perspective on the decisions made

---

## Integration: PR → Main

1. Review PR yourself
2. Address any human feedback
3. Merge when ready

**Result:** Issue + PR auto-close and move to "Done"

---

## Cleanup

```bash
git checkout main
git pull origin main
git branch -d {branch-name}
```

---

## Project Board Tracking

| Status | When | How |
|--------|------|-----|
| Backlog | Issue created | Auto |
| Ready | Spec complete | Manual |
| In Progress | PR opened | Auto (maybe - test this) |
| Done | PR merged | Auto |

---

## Quick Reference

- **Generate docs:** `node generate-docs-for-llm.ts`
- **Issue prompt:** [`/ai/prompts/issue-generation.md`](/ai/prompts/issue-generation.md)
- **Implementation prompt:** [`/ai/prompts/issue-implementation.md`](/ai/prompts/issue-implementation.md)
- **Conventions:** [Code](./code-conventions.md) | [GitHub](./github-workflow.md)
