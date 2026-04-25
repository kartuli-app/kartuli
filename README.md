# Kartuli

## Live documentation website

:open_book: [Documentation website](https://kartuli-app.github.io/kartuli/)

Georgian language learning platform

## Prerequisites

- Node.js and pnpm (see repo root `package.json`: `engines.node` and `packageManager` for pinned versions; use `.nvmrc` and Corepack).

We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage node versions.

```bash
# check your runtime versions are the expected ones
node -v 
pnpm -v
```

## Quick Start

```bash
# run from the root of the repository
pnpm install # Install dependencies
pnpm c:dev:game-client # Run the game client dev server
```