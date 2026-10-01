---
description: Agent context hierarchy, coding workflow and documentation-update requirements.
status: implemented
intent: runbook
---

# AI Development

AI-assisted work uses a short bootstrap and canonical documentation rather than separate architecture narratives in every agent file.

## Context strategy

1. Read `AGENTS.md` and applicable agent-specific bootstrap (`CLAUDE.md`), plus any scoped instructions.
2. Use [kartuli-llm.txt](/assets/kartuli-llm.txt) to discover relevant canonical pages. It is a links-only index: fetch the selected pages.
3. Use canonical docs for intent, boundaries and status.
4. Inspect source/config for current implementation details and reconcile discrepancies explicitly.

If live docs are unavailable or describe an older revision, read `docs/` in the working checkout and generate its index locally. Do not infer implemented behavior from a planned spec. Tool-specific files under `.agents/` and `.cursor/` supplement the bootstrap; they do not own shared architecture.

## Coding and documentation workflow

Read the complete issue and repository instructions before changing files. Use pnpm and the pinned Node runtime. Before Next.js implementation work, read relevant installed docs under `apps/game-client/node_modules/next/dist/docs` as required by `AGENTS.md`.

Locate the concept's [canonical owner](../12-project/01-documentation/index.md), implement the scoped change and update that documentation in the same PR. Preserve fast-path agent rules while linking long-form explanations. Never turn a future provider candidate into an implemented claim. Report external settings as manual-verification items until verified.

Run `pnpm run validate:all` for all changes. For documentation changes also build Web Docs and inspect the generated index and links. Report blockers rather than claiming completion. Commit only when the user explicitly requests it; use Conventional Commits. The user's request to deliver a PR authorizes the commits needed for that PR, but not a merge.

See [Project workflow](../12-project/02-workflow.md) for PR mechanics and [Testing](../06-quality/01-testing.md) for the actual validation layers.
