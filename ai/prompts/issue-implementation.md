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
- **ALWAYS run the complete verification suite:**
  * `pnpm lint` (or project's lint command)
  * `pnpm test` (or project's test command)
  * `pnpm dev` (or project's dev command)
  * `pnpm build` (or project's build command)
- **If you see ANY warnings or errors in command output:**
  * Fix them immediately before reporting
  * Explain what the warning/error was and why you fixed it
  * Re-run the FULL verification suite again to confirm it's resolved
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
  * Try multiple search strategies if needed:
    1. Use glob: `**/.github/pull_request_template.md`
    2. List `.github/` directory directly
    3. Try case variations (PULL_REQUEST_TEMPLATE.md)
  * If truly not found after thorough search, ask user for location
- Fill out all required sections:
  - Description of changes
  - Linked issues using `Closes #` format
  - Check appropriate Type and Scope boxes
  - Add testing notes
  - Complete other applicable sections
- Provide formatted markdown for user to copy/paste into GitHub PR UI

### 6d. Wait for PR Creation and Initial Bot Feedback
- Provide the PR creation link (e.g., `https://github.com/{owner}/{repo}/pull/new/{branch-name}`)
- Say: "The PR is ready! After you create it, I'll wait here for bot feedback. Once the bot comments, share the PR link with me so I can review the suggestions."
- Wait for user to provide PR link with bot feedback
- Proceed to Step 7 when feedback is available

## 7. Bot Feedback Loop (if applicable)

**This step may repeat multiple times as automated bots review each commit.**

### For each bot review cycle:

**7a. Review Bot Suggestions**
- User will share PR link with bot feedback
- Review each suggestion with user
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
- **ALWAYS run the complete verification suite after changes:**
  * `pnpm lint` (or project's lint command)
  * `pnpm test` (or project's test command)
  * `pnpm dev` (or project's dev command)
  * `pnpm build` (or project's build command)
- Fix any issues discovered during implementation
- Re-run verification suite after fixes

**7d. Offer to Generate PR Response Comment**
- After implementation is complete and verified
- Ask: "Would you like me to generate a formatted response comment for the bot feedback?"
- If yes, provide markdown-only output (no intro/outro) with this format:
  ```markdown
  ## Response to Bot Suggestions
  
  [Brief intro thanking bot and stating what was applied]
  
  ---
  
  ### ✅/❌/⏸️ Suggestion #N: [Title]
  
  **Bot's suggestion:** [What bot suggested]
  
  **Our decision (Kartuli team):** [Applied/Rejected/Deferred]
  
  **Reasoning:** [Team's reasoning]
  
  **AI opinion (Claude):** [Your external perspective on the decision]
  
  ---
  
  **Summary:** [One-line summary of what was applied/rejected/deferred]
  ```
- User will copy/paste this into PR comments

**7e. Commit and Push**
- Propose commit message describing the changes
- Wait for user confirmation
- After user confirms commit message
- Commit changes: `git add . && git commit -m "{message}"`
- Push to remote: `git push origin {branch-name}`

**7f. Repeat**
- Wait for next bot review cycle
- Return to step 7a if more feedback arrives
- Continue until no more changes needed