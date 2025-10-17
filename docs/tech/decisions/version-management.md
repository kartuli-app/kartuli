---
section: Tech/Decisions
title: Version Management
date: 2025-10-01
status: Accepted
issue: "#1"
---

# Version Management with PNPM Catalog

**Date**: 2025-10-01 
 
**Issue**: [#1](https://github.com/rocescoca/kartuli/issues/1)

## Context

We need to maintain consistent dependency versions across the monorepo to prevent version conflicts and ensure reproducible builds.

## Decision

We will use **PNPM catalog** for centralized version management with pinned versions for all shared dependencies, workspace dependencies using catalog references, and peer dependency auto-install via `.npmrc` configuration.

## Consequences

### Positive
✅ **Version consistency** - All packages use same dependency versions  
✅ **Easy updates** - Single place to update versions across workspace  
✅ **Reproducible builds** - Consistent dependency resolution  
✅ **Conflict prevention** - No version mismatches between packages  

### Negative
⚠️ **Centralized control** - All version updates go through root package.json  
⚠️ **Catalog maintenance** - Need to keep catalog up to date  

## Implementation

### Current Catalog Configuration
The root `package.json` contains the PNPM catalog with pinned versions:
```json
{
  "pnpm": {
    "catalog": {
      "typescript": "^5.0.0",
      "react": "^18.0.0",
      "next": "^14.0.0",
      "vitest": "^1.0.0",
      "@testing-library/react": "^14.0.0"
    }
  }
}
```

### Package Dependency Pattern
All packages use catalog references for shared dependencies:
```json
{
  "dependencies": {
    "react": "catalog:",
    "typescript": "catalog:"
  }
}
```

### Configuration Files
- **PNPM catalog** is maintained in root `package.json` for all shared dependencies
- **Workspace dependencies** consistently use catalog references
- **Peer dependency auto-install** is configured via `.npmrc` settings
