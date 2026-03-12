---
section: Tech/Development
title: Tailwind Styles Setup
description: Tailwind ownership, token overrides, source scanning, and test strategy in the monorepo.
---

# Tailwind Styles Setup

## Purpose

This project uses one Tailwind compilation pipeline per consumer target (game app, backoffice app, Storybook). Shared packages provide token contracts and component source, while consumers compile the final CSS.

## Ownership model

| Workspace | Owns Tailwind compile | Tailwind dependency | PostCSS config |
| --- | --- | --- | --- |
| `apps/game-client` | Yes | Yes | Yes |
| `apps/backoffice-client` | Yes | Yes | Yes |
| `tools/storybook` | Yes (Vite plugin) | Yes | No (`@tailwindcss/vite` path) |
| `packages/tailwind-config` | No (token contract only) | No | No |
| `packages/ui` | No (source components only) | No | No |

## Import order in consumers

In consumer entry CSS:

1. `@import "tailwindcss";`
2. `@import "@kartuli/tailwind-config";`
3. consumer theme overrides (for example `@import "./theme.css";`)
4. `@source` paths for local source + `packages/ui/src`

This keeps one compile pipeline per consumer and prevents duplicate base/theme/utilities output.

### Why `@import` and `@source` look different

- `@import` is a CSS/module import step. It resolves package names through workspace/node package resolution, so `@import "@kartuli/tailwind-config";` is correct.
- `@source` is Tailwind's class scanner directive. It should point at concrete filesystem locations that Tailwind can crawl directly.
- Because of that, prefer package names in `@import` and real relative/absolute paths in `@source`.
- Avoid TypeScript path aliases in `@source` directives; they are not guaranteed to be resolved during scanning.

## Token contract and override behavior

The shared token contract defines semantic defaults in `@theme`, for example:

- `--color-ink`
- `--color-canvas`
- `--color-brand`
- `--color-brand-muted`

A consumer can override only one token and keep fallback defaults for the others:

```css
:root {
  --color-brand: oklch(72.114% 0.179 155.2);
}
```

In that case, `--color-brand` uses the consumer value and `--color-brand-muted` keeps the shared default.

## Source scanning

Use deterministic filesystem paths in `@source` directives. Do not rely on TypeScript path aliases in CSS scanning directives.

Recommended pattern:

- app entry CSS scans its local `src` subtree
- app entry CSS also scans `packages/ui/src`
- Storybook CSS scans `.storybook` and `packages/ui/src`

## Test strategy

Integration tests compile real consumer entry CSS with Tailwind and assert generated output:

- UI-only arbitrary utility is present (`bg-[rebeccapurple]`)
- shared token defaults are present
- app-specific override is present only where expected

This is implemented with Vitest and CSS output assertions to keep tests deterministic in CI.

## Validation checklist

- `pnpm --filter @kartuli/game-client test`
- `pnpm --filter @kartuli/backoffice-client test`
- `pnpm --filter @kartuli/storybook build`
- visually confirm Storybook theme switch still updates token-based styles

