---
description: Separate Storybook and documentation build pipelines, aliases and content generation.
status: implemented
intent: reference
---

# Vite and VitePress

## Two uses

Storybook uses the React/Vite framework with `@tailwindcss/vite`. Web Docs uses VitePress 1.6.4, Vue and Vue server rendering. These are different pipelines with their own dependency resolution; the workspace Vite catalog version should not be assumed to be VitePress's bundled version.

## Storybook integration

`.storybook/main.ts` discovers UI and Game Client stories, configures `react-docgen`, merges source aliases, defines selected environment values, forces automatic JSX through Oxc and prebundles recurring imports such as Next links, i18n and icon modules. `vitest.config.ts` maintains corresponding aliases/optimization entries for browser tests.

When changing aliases or transforms, verify both `c:build:storybook` and browser tests. Do not remove existing array-form aliases while adding your own. Docgen behavior is described in [Storybook](../../03-tools/01-storybook.md).

## Documentation integration

VitePress reads Markdown from `docs/`, configuration from `tools/web-docs-client/.vitepress/config.mts`, and static assets from the tool's public directory. Its `/kartuli/` base must agree with local links and published URLs. Directory hubs drive the navigation; H1 headings supply page labels. Source filenames remain stable even when labels become friendlier.

The index generator runs before dev/build and creates a public text asset. The production build copies/checks it in dist. [Web Docs Client](../../03-tools/03-web-docs-client.md) documents the full command lifecycle and local debugging. Vue is a docs renderer dependency, not a second product UI framework.

## Upgrade boundaries

Upgrade the relevant pipeline deliberately: test the docs renderer, plugin and index delivery for VitePress; test component transformation, docgen and browser execution for Storybook. Do not assume one passing pipeline validates the other. Existing Kroki rendering remains an external docs-build dependency with known failure assets.
