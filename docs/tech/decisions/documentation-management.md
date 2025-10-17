---
section: Tech/Decisions
title: Documentation Management
date: 2025-10-07
status: Accepted
issue: "#4"
---

# Documentation Management with VitePress

**Date**: 2025-10-07

**Issue**: [#4](https://github.com/rocescoca/kartuli/issues/4)

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
  product/                # Product documentation
  ai-assisted-workflow.md
  code-conventions.md
  github-workflow.md
  project-overview.md
  stack-and-providers.md
```

### Navigation System Implementation
The VitePress configuration uses file system scanning with recursive directory traversal, frontmatter parsing for section, title, and date extraction, and automatic sidebar and navbar generation with chronological sorting where items are sorted by date and navigation links to the oldest item first.

### GitHub Actions Integration
The documentation system includes automated workflows for generation and deployment:

- **`docs-generate-llm-bundle.yml`** - Generates LLM documentation bundle as artifact
- **`docs-test-llm-bundle.yml`** - Tests LLM bundle generation on PRs
- **`docs-deploy.yml`** - Deploys VitePress site to GitHub Pages with LLM bundle

### ADR Template Standard
All decision documents follow this standardized template format with frontmatter metadata and consistent section structure for maintainability and consistency across the documentation system.
