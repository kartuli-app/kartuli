# Kartuli

## Live documentation website

:open_book: [Documentation website](https://kartuli-app.github.io/kartuli/)

:mag: [SonarQube Cloud overall summary](https://sonarcloud.io/summary/overall?id=kartuli-app_kartuli&branch=main)

Georgian language learning platform

## Prerequisites

- Node.js 24 and pnpm (root `package.json` declares the supported Node major and exact pnpm version;
  `.nvmrc` pins the tested Node release for local and CI use).

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
