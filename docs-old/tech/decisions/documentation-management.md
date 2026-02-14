---
section: Tech/Decisions
title: Documentation Management
date: 2025-10-07
status: Accepted
issue: "#4"
---

# Documentation Management with VitePress

**Date**: 2025-10-07

**Issue**: [#4](https://github.com/kartuli-app/kartuli/issues/4)

## Context

We need a comprehensive documentation system that can scale with the project and provide easy maintenance and navigation.

## Decision

We will use **VitePress** with dynamic navigation generation based on frontmatter metadata for our documentation system.

### Core Technologies
- **VitePress** for static site generation
- **GitHub Pages** hosting (planned)
- **Local search** with VitePress built-in search
- **Frontmatter-driven** navigation with `section` and `title` fields
- **Dynamic sidebar generation** from file system scanning
- **Chronological ADR ordering** by date metadata

## Consequences

### Positive
✅ **Maintainable** - Frontmatter drives navigation automatically  
✅ **Scalable** - Easy to add new documents and sections  
✅ **Searchable** - Built-in local search functionality  
✅ **Version controlled** - Documentation lives with code  

### Negative
⚠️ **Build complexity** - Dynamic navigation requires custom config  
⚠️ **Frontmatter dependency** - All files need proper metadata  

## Implementation

### Current File Structure
```
docs/
  tech/decisions/         # Architecture Decision Records (sorted by date in sidebar)
    version-management.md
    monorepo-setup.md
    code-quality.md
    core-tech-stack.md
    testing-strategy.md
    design-system.md
    documentation-management.md
  tech/development/       # Development guides and conventions
    ai-assisted-workflow.md
    code-conventions.md
    github-workflow.md
  product/                # Product documentation
    project-overview.md
  stack-and-providers.md
  index.md               # Homepage
  kartuli-llm.txt        # Generated LLM bundle
```

### Navigation System Implementation
The VitePress configuration uses file system scanning with recursive directory traversal, frontmatter parsing for section, title, and date extraction, and automatic sidebar and navbar generation with chronological sorting where items are sorted by date and navigation links to the oldest item first.

### GitHub Actions Integration
The documentation system includes automated workflows for generation and deployment:

- **`docs-deploy-main.yml`** - Main workflow that:
  - Generates LLM documentation bundle
  - Builds VitePress site with proper base URL configuration
  - Deploys to GitHub Pages at `/kartuli/`
  - Copies LLM bundle to assets folder for static serving
- **Label management workflows** - Automated label management for issues and PRs

### LLM Bundle Generation
- **Shared Processor**: `docs-processor.js` utility consolidates all documentation processing logic
- **Centralized Link Fixing**: Configuration-driven link replacement system
- **Automatic Processing**: Frontmatter removal and content processing
- **Static Asset**: LLM bundle served as `/kartuli/assets/kartuli-llm.txt`

### ADR Template Standard
All decision documents follow this standardized template format with frontmatter metadata and consistent section structure for maintainability and consistency across the documentation system.
