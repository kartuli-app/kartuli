---
section: Tech/Decisions
title: Code Quality
date: 2025-10-03
status: Accepted
issue: "#1"
---

# Code Quality with Biome

**Date**: 2025-10-03

**Issue**: [#1](https://github.com/rocescoca/kartuli/issues/1)

## Context

We need consistent code quality across the monorepo with linting and formatting standards that integrate well with our development workflow.

## Decision

We will use **Biome** as our single tool for both linting and formatting:

### Code Quality Tools
- **Biome** for linting and formatting
- **No ESLint or Prettier** - Biome replaces both
- **Pre-commit hooks** (planned) for automatic formatting

### Configuration
- **biome.json** configuration file
- **File exclusions** for generated files and dependencies
- **Consistent rules** across all packages and apps

## Consequences

### Positive
✅ **Single tool** - No configuration conflicts between linters  
✅ **Fast execution** - Biome is significantly faster than ESLint + Prettier  
✅ **Consistent formatting** - Unified code style across workspace  
✅ **Easy maintenance** - Single configuration file  

### Negative
⚠️ **Learning curve** - Team needs to adapt to Biome rules  
⚠️ **Ecosystem compatibility** - Some ESLint plugins not available  

## Implementation

### Current Biome Configuration
The `biome.json` configuration file is set up with:
```json
{
  "files": {
    "ignoreUnknown": false,
    "includes": ["**", "!**/node_modules", "!**/dist", "!**/.vitepress/cache"]
  },
  "formatter": { "enabled": true },
  "linter": { "enabled": true }
}
```

### Workflow Integration Status
- **IDE integration** - Biome extension is configured for editors
- **CI/CD integration** - Automated linting runs in GitHub Actions
- **Pre-commit hooks** - Planned for automatic formatting on commit
