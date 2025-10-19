# Web Docs Client

VitePress-based documentation site for the Kartuli project with automated LLM bundle generation and GitHub Pages deployment.

## Overview

This package contains the complete documentation system for Kartuli, including:

- **VitePress Site**: Static documentation site with dynamic navigation
- **LLM Bundle Generation**: Automated creation of consolidated documentation for AI consumption
- **GitHub Pages Deployment**: Automated deployment with PR previews

## Structure

```
tools/web-docs-client/
├── .vitepress/
│   └── config.mts          # VitePress configuration with dynamic navigation
├── scripts/
│   └── generate-llm-bundle.js  # LLM bundle generation script
├── package.json            # Package configuration
└── README.md              # This file
```

## Features

### Dynamic Navigation
- **File System Scanning**: Automatically discovers documentation files
- **Frontmatter Parsing**: Extracts metadata (section, title, date, status, issue)
- **Chronological Sorting**: ADRs sorted by date, others alphabetically
- **Nested Structure**: Supports hierarchical organization (Tech/Decisions, Tech/Development)

### LLM Bundle Generation
- **Consolidated Documentation**: Single file containing all project documentation
- **Artifact-Based**: Generated files stored as GitHub Actions artifacts (not committed)
- **Automatic Links**: Fixes internal links for proper navigation
- **Fresh Generation**: Created on every deployment

### GitHub Pages Deployment
- **Production Deployment**: Main branch deploys to production GitHub Pages
- **PR Previews**: Pull requests get staging deployments for testing
- **Dependency Management**: Proper workflow dependencies ensure correct build order

## Scripts

### Development
```bash
pnpm dev          # Start VitePress dev server
pnpm dev --host   # Start with network access
```

### Build
```bash
pnpm build        # Build VitePress site
```

### LLM Bundle
```bash
node scripts/generate-llm-bundle.js  # Generate LLM bundle manually
```

## GitHub Actions

### Documentation Workflows
- **`docs-generate-llm-bundle.yml`** - Generates LLM bundle and uploads as artifact
- **`docs-test-llm-bundle.yml`** - Tests LLM bundle generation on PRs
- **`docs-deploy-main.yml`** - Deploys site to GitHub Pages with proper dependencies

### Workflow Dependencies
```
docs-generate-llm-bundle → docs-deploy
docs-test-llm-bundle (PR only)
```

## Configuration

### VitePress Config
The `.vitepress/config.mts` file handles:
- Dynamic navigation generation
- Sidebar structure
- LLM bundle integration
- Build configuration

### Frontmatter Requirements
All documentation files must include:
```yaml
---
section: Tech/Decisions  # Navigation section
title: Document Title   # Display name
date: 2025-01-01       # For chronological sorting (ADRs)
status: Accepted        # ADR status
issue: "#123"          # Related GitHub issue
---
```

## Deployment

### GitHub Pages Setup
1. Go to Repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Save settings

### Deployment Flow
1. **PR Creation**: Tests generation, deploys to staging
2. **PR Merge**: Generates bundle, deploys to production
3. **Manual Trigger**: All workflows support manual execution

## LLM Bundle

The LLM bundle (`kartuli-llm.txt`) provides:
- **Complete Documentation**: All project documentation in one file
- **Structured Format**: Table of contents and organized sections
- **Fixed Links**: Internal links corrected for proper navigation
- **Fresh Content**: Generated on every deployment

### Access
- **From Site**: Click "LLM Bundle" in navigation
- **Direct URL**: `/kartuli-llm.txt` on deployed site
- **Artifact**: Available in GitHub Actions artifacts

## Development

### Adding New Documentation
1. Create markdown file in appropriate directory
2. Add required frontmatter
3. File automatically appears in navigation
4. LLM bundle regenerated on next deployment

### Modifying Navigation
- Edit `.vitepress/config.mts`
- Navigation is generated dynamically
- No manual sidebar configuration needed

### Testing Changes
1. Run `pnpm dev` for local testing
2. Create PR for GitHub Actions testing
3. Check staging deployment for validation

## Troubleshooting

### Build Issues
- Check VitePress configuration in `config.mts`
- Verify frontmatter format in documentation files
- Review GitHub Actions logs for errors

### LLM Bundle Issues
- Test generation script locally: `node scripts/generate-llm-bundle.js`
- Check artifact upload/download in GitHub Actions
- Verify file is included in deployment

### Deployment Issues
- Ensure GitHub Pages is enabled with "GitHub Actions" source
- Check workflow dependencies and permissions
- Review environment settings for deployment
