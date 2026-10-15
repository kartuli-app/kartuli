---
description: Token scale, shell breakpoints, content width and responsive validation.
status: implemented
intent: reference
---

# Layout, Spacing and Radius

## Current dimensions

Primitive spacing is explicitly defined, not a uniform arithmetic scale: values 0–5 are 0, 4, 8, 12, 16 and 20 pixels, while spacing 6 is 64 pixels. Radius values include 0, 8, 16, 24 pixels and a full radius. Consult the stylesheet before interpreting a numeric suffix.

Use Kartuli spacing and radius utilities such as `gap-p-spacing-2`, `p-p-spacing-4` and
`rounded-p-radius-2` when the system already has the required design value. Generic or arbitrary values
remain appropriate when no token is equivalent and the value is justified. Structural utilities such
as flex/grid, positioning, alignment, overflow and growth do not need design tokens.

Component dimensions include compact/expanded rails (6rem/14rem), app-bar height (5rem), mobile dock height (5rem), and mobile/desktop dock-item dimensions. [Tokens](./01-tokens.md) explains how these become utilities.

## Shared shell conventions

`@kartuli/ui` owns the implemented shell geometry. `AppShell` offsets content beneath a fixed app bar.
With start-rail content, it reserves compact rail space at `md`, expanded space at `xl` and mobile dock
bottom padding below `md`. The end-rail layout has a `2xl` adjustment. `ShellRail`, `AppBar`, `Dock` and
`DockItem` use the corresponding component dimensions and semantic shell roles.

`ContentContainer` uses full width, `max-w-5xl`, automatic horizontal margins and primitive padding that
changes at `sm`. Keep the shell's reserved geometry synchronized with the actual rail/dock components
when changing dimensions. Applications compose these primitives with their own navigation, title,
identity and decorative content; the current geometry is a shared contract but is not a requirement
for unrelated future layouts.

Game Client and Backoffice are active consumers of this geometry. Backoffice supplies a Home/About dock
through the start-rail slot, so it receives the same mobile bottom clearance and tablet/desktop offsets
without app-specific breakpoints or dimensions.

## Changing layout

Use structure utilities for flex/grid/positioning and tokens for shared dimensions. Check widths around each active breakpoint, not only common device presets. Verify that fixed UI does not cover content or focused controls and that long localized labels do not force overflow.

Sources: `packages/design-system/primitives.css`, `components.css` and
`packages/ui/src/components/layout`. Backoffice reuse keeps operator composition app-local rather than
moving Game Client product content into shared UI.
