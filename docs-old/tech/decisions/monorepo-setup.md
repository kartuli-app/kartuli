---
section: Tech/Decisions
title: Monorepo Setup
date: 2025-10-02
status: Accepted
issue: "#1"
---

# Monorepo Setup with pnpm and Turborepo

**Date**: 2025-10-02 

**Issue**: [#1](https://github.com/kartuli-app/kartuli/issues/1)

## Context

We need to establish a solid foundation for the Kartuli project with proper package management, build system, and development workflow.

## Decision

We will use **pnpm** with **Turborepo** for monorepo management with pnpm for workspace management and dependency resolution, PNPM catalog for version pinning across workspace, auto-install-peers=true in `.npmrc` for seamless peer dependency handling, Turborepo for build orchestration and caching, and Git workflow with conventional commits.

## Consequences

### Positive
✅ **Fast builds** - Turborepo caching and parallel execution  
✅ **Consistent dependencies** - PNPM catalog prevents version drift  
✅ **Clean workspace** - Proper gitignore and npmrc configuration  
✅ **Scalable structure** - Easy to add new packages and apps  

### Negative
⚠️ **Learning curve** - Team needs to understand pnpm + turbo workflow  
⚠️ **Tool complexity** - More configuration files to maintain  

## Implementation

### Current File Structure
```
package.json          # Root workspace configuration
pnpm-workspace.yaml   # Workspace definition
turbo.json           # Build system configuration
.npmrc              # PNPM settings
.nvmrc              # Node version
.gitignore          # Comprehensive ignore patterns
```

### Monorepo Configuration
- **pnpm** is configured for workspace management and dependency resolution
- **Turborepo** handles build orchestration and caching
- **Turbo.json** defines task dependencies and outputs
- **Parallel execution** of tasks across packages is enabled
- **Comprehensive .gitignore** excludes all generated files
