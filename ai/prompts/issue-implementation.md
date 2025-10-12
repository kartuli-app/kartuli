# Issue Implementation Prompt

I want you to implement a GitHub issue. Follow this workflow:

## 0. Read Project Documentation
Start by reading `README.md` and follow relevant links from there to understand:
- Project overview and mission
- Code conventions and standards
- GitHub workflow and processes
- Any other documentation referenced that's relevant to this issue

## 1. Review the Issue
- Read the issue from: [ISSUE_URL]
- Understand the requirements, acceptance criteria, and file changes needed
- Ask clarifying questions if anything is unclear

## 2. Find and Switch to Linked Branch
- Look for a branch already linked to this issue (in GitHub "Development" section or issue description)
- If you find a linked branch:
  - Tell me the branch name
  - Fetch latest: `git fetch`
  - Switch to it: `git checkout {branch-name}`
  - Pull latest: `git pull origin {branch-name}`
- If no linked branch exists:
  - Tell me no branch is linked to this issue
  - Wait for my instructions

## 3. Implement Changes
- Create/modify all files as specified in the issue
- Follow all conventions from project documentation
- Install dependencies if needed
- Test that everything works

## 4. Verify & Report
- Run: `git status` to show what changed
- Test commands mentioned in acceptance criteria
- Run linting/formatting if applicable
- Report any issues or blockers

## 5. Wait for My Review
- DO NOT commit automatically (per project rules)
- I will review the changes and decide when to commit
- When I'm ready, proceed to Step 6

## 6. Commit, Push & Generate PR Content (when approved)

### 6a. Propose Commit Message
- Generate commit message using conventional commit format from the issue title
- Format: `{type}({scope}): {description}`
- Present to user and wait for confirmation/edits

### 6b. Commit & Push (after user confirms)
- Stage all changes: `git add .`
- Commit with approved message
- Push branch to remote: `git push origin {branch-name}`

### 6c. Generate PR Content
- Read and use template from `.github/pull_request_template.md`
- Fill out all required sections:
  - Description of changes
  - Linked issues using `Closes #` format
  - Check appropriate Type and Scope boxes
  - Add testing notes
  - Complete other applicable sections
- Provide formatted markdown for user to copy/paste into GitHub PR UI

## 7. Bot Feedback Loop (if applicable)

**This step may repeat multiple times as automated bots review each commit.**

### For each bot review cycle:

**7a. Review Bot Suggestions**
- Review bot feedback with user
- Discuss pros/cons of each suggestion
- Consider project stage and context
- Get approval for changes to implement

**7b. Determine Change Significance**

**If implementation differs from original issue:**
- Determine if it's a minor technical refinement or major change
- For **minor changes** (technical decisions, tooling configs):
  - Document in PR description under "Changes from Original Issue" section
  - Explain reasoning clearly
- For **major changes** (core requirements, features):
  - Comment on the original issue explaining the change
  - Optionally update issue description/acceptance criteria

**7c. Implement Approved Changes**
- Make changes on the same branch (still working on same issue)
- Propose commit message describing the refinements
- Wait for user confirmation

**7d. Generate Updated PR Description Section**
- Provide updated "Changes from Original Issue" section that includes ALL changes across ALL review cycles
- Organize by review cycle (First Review, Second Review, etc.)
- Include all changes from previous cycles plus new changes
- Present formatted markdown
- **Ask for confirmation:** "Add this to the PR description to track differences?"

**7e. Commit and Push**
- After user confirms both commit message and PR description update
- Commit changes: `git add . && git commit -m "{message}"`
- Push to remote: `git push origin {branch-name}`

**7f. Repeat**
- Wait for next bot review cycle
- Return to step 7a if more feedback arrives
- Continue until no more changes needed
