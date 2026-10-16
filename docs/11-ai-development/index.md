---
description: Agent context hierarchy, coding workflow and documentation-update requirements.
status: implemented
intent: runbook
---

# AI Development

AI-assisted work uses a short bootstrap and canonical documentation rather than separate architecture narratives in every agent file.

## Context strategy

1. Read `AGENTS.md` and applicable agent-specific bootstrap (`CLAUDE.md`), plus any scoped instructions.
2. Use <a href="/kartuli/assets/kartuli-llm.txt" target="_blank" rel="noopener">kartuli-llm.txt</a> to discover relevant canonical pages. It is a links-only index: fetch the selected pages.
3. Use canonical docs for intent, boundaries and status.
4. Inspect source/config for current implementation details and reconcile discrepancies explicitly.

If live docs are unavailable or describe an older revision, read `docs/` in the working checkout and generate its index locally. Do not infer implemented behavior from a planned spec. Tool-specific files under `.agents/` and `.cursor/` supplement the bootstrap; they do not own shared architecture.

## Coding and documentation workflow

Read the complete issue and repository instructions before changing files. Use pnpm and the pinned Node runtime. Before Next.js implementation work, read relevant installed docs under `apps/game-client/node_modules/next/dist/docs` as required by `AGENTS.md`.

Locate the concept's [canonical owner](../12-project/01-documentation/index.md), implement the scoped change and update that documentation in the same PR. Preserve fast-path agent rules while linking long-form explanations. Never turn a future provider candidate into an implemented claim. Report external settings as manual-verification items until verified.

Before substantial visual UI implementation, read the relevant
[Design System](../04-design-system/index.md) guides and inspect the existing vocabulary. Compose from
current semantic roles, spacing/radius primitives and shared components first; extend a token layer only
when a real requirement justifies its raw value, independent meaning or stable component ownership.
Finish Storybook/route review with an explicit
[Design System compliance pass](../04-design-system/index.md#compliance-checklist) before the final
validation and commit. `docs/04-design-system` remains the architectural source of truth.

The expected UI workflow is:

```text
product requirement
→ inspect existing Design System vocabulary
→ compose using existing roles and components
→ extend only when real need exists
→ Storybook and route review
→ Design System compliance check
→ validate
→ commit
```

Run `pnpm run validate:all` for all changes. For documentation changes also build Web Docs and inspect the generated index and links. Report blockers rather than claiming completion. Commit only when the user explicitly requests it; use Conventional Commits. The user's request to deliver a PR authorizes the commits needed for that PR, but not a merge.

See [Project workflow](../12-project/02-workflow.md) for PR mechanics and [Testing](../06-quality/01-testing/index.md) for the actual validation layers.
