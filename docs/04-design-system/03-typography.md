---
description: Default and Georgian font variables, app font loading and preview consistency.
status: implemented
intent: reference
---

# Typography and Fonts

## Current implementation

Game Client `src/root-layout/root-layout.tsx` loads Manrope through `next/font/google` and Mersad from `public/fonts/mersad.ttf` through `next/font/local`. Their variables are `--font-default-family` and `--font-georgian-family`. Shared Tailwind mappings expose `font-default` and `font-georgian` through `--font-default` and `--font-georgian`.

Font loading belongs to each rendering surface; the shared stylesheet maps variables but does not fetch font files. Check Backoffice and Storybook styles separately before assuming they load the same families, weights or variable names.

## Using and changing typography

Use the Georgian font role where Georgian script needs it and the default role for general UI text. When changing fonts, inspect Georgian glyph coverage, mixed-script strings, transliteration marks, long Russian labels and wrapping in compact controls. A matching font-family string is not evidence the actual font loaded.

Update the app loader/source and associated style integration together. If variable names change, update shared theme mappings and preview setup. Do not commit generated Next font artifacts.

## Verification and troubleshooting

Inspect network/font loading and computed styles in an app and Storybook. Test both locales, narrow layouts, headings, study content and icon/button alignment. A restricted build environment can fail while downloading a Google font; distinguish that network prerequisite from a CSS bug.

Use a production build to exercise `next/font`, and use Storybook to verify its separately declared
font faces/variables:

```bash
pnpm run c:build:game-client
pnpm run c:build:storybook
pnpm --filter @kartuli/storybook run test
```

Game Client receives hashed/generated font assets from Next; Storybook loads Manrope from Google Fonts
at runtime and Mersad from the Game Client public directory. A Storybook preview can therefore fall back
even when the Next production build is correct. Check the browser network panel and computed
`font-family`, not only the class name.

The repository does not yet define a complete independently versioned typography scale or all semantic text styles. Preserve existing usage while recording new shared decisions here rather than silently introducing a second scale inside a feature.
