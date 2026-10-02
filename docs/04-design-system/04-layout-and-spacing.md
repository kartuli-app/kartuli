---
description: Token scale, shell breakpoints, content width and responsive validation.
status: implemented
intent: reference
---

# Layout, Spacing and Radius

## Current dimensions

Primitive spacing is explicitly defined, not a uniform arithmetic scale: values 0–5 are 0, 4, 8, 12, 16 and 20 pixels, while spacing 6 is 64 pixels. Radius values include 0, 8, 16, 24 pixels and a full radius. Consult the stylesheet before interpreting a numeric suffix.

Component dimensions include compact/expanded rails (6rem/14rem), app-bar height (5rem), mobile dock height (5rem), and mobile/desktop dock-item dimensions. [Tokens](./01-tokens.md) explains how these become utilities.

## Game Client shell conventions

`AppShell` offsets content beneath a fixed app bar. With start-rail content, it reserves compact rail space at `md`, expanded space at `xl` and mobile dock bottom padding below `md`. The end-rail layout has a `2xl` adjustment. These are current app conventions, not a universal requirement for every future app.

`ContentContainer` uses full width, `max-w-5xl`, automatic horizontal margins and primitive padding that changes at `sm`. Keep the shell's reserved geometry synchronized with the actual rail/dock components when changing dimensions.

## Changing layout

Use structure utilities for flex/grid/positioning and tokens for shared dimensions. Check widths around each active breakpoint, not only common device presets. Verify that fixed UI does not cover content or focused controls and that long localized labels do not force overflow.

Source: shared stylesheet and `apps/game-client/src/ui/components/layout/shell`. A shared responsive pattern should be documented here when adopted by multiple surfaces; do not copy Game Client shell assumptions into Backoffice without evaluating its operator workflow.
