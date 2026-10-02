---
description: Task graph, cache inputs and outputs, affected selection and cache troubleshooting.
status: implemented
intent: reference
---

# Turborepo

## Role and task graph

Root scripts delegate workspace work to Turbo. `turbo.json` defines behavior; each workspace's `package.json` determines whether a task exists. `build` depends on `^build`, so dependencies build before consumers. `typecheck` likewise follows upstream typechecks. Dev and preview are persistent and uncached.

Storybook's `test` explicitly depends on the UI build and includes UI/Game Client source as inputs. `test:all` means Turbo's workspace test tasks, including Storybook; it is not the root Vitest coverage command.

## Cache contract

Task inputs describe when a previous result is reusable. Outputs describe files restored on a cache hit. The ordinary build outputs include Next, Storybook and VitePress artifacts; `.next/cache` is excluded. Web Docs overrides build inputs to include the lockfile, docs and scripts, excluding the generated source index, and restores `.vitepress/dist/**`.

Changing docs must invalidate the Web Docs build even though source is in a different workspace. The generated `docs/kartuli-llm.txt` and public development copy are not themselves restored by the build's dist-only cache output. Use the explicit generation command when those local intermediates are needed after a cache hit.

Remote caching is enabled, but credentials and team mapping belong to [Remote Build Cache](../../07-platform/03-remote-build-cache.md). Local `.turbo` state is separate from remote cache.

## Commands and diagnosis

```bash
pnpm turbo run build --filter=@kartuli/web-docs-client
pnpm turbo run build --filter=@kartuli/web-docs-client --dry=json
pnpm turbo run build --filter=@kartuli/web-docs-client --force
pnpm run turbo:cache:wipe
```

Inspect the dry-run graph when a workspace is missing. Check its script and `workspace:*` dependency edges, then the filter. Inspect task inputs/outputs when a hit restores stale/missing files. `--force` bypasses result reuse for that run; wiping `.turbo` is local only. Do not put secrets or mutable provider state into cached output.

## Affected selection

`scripts/orchestrator/detect-affected.mjs` and `map-affected-to-workflows.mjs` choose deployment/test workflows; `workflow-targets.json` maps targets. This layer is separate from the task dependency graph. After changing workspace relationships, inspect the affected result and mapping as well as Turbo itself. Root `orchestrator:detect-affected:pr` and `:prod` scripts are read/selection operations, not deployments.

Sources: `turbo.json`, root/workspace manifests, `scripts/orchestrator`. Validate graph changes with the intended target build and full repository validation; do not infer that a successful cached task covered a newly omitted input.
