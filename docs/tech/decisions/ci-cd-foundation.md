---
section: Tech/Decisions
title: CI/CD Foundation and Basic Validation
date: 2025-01-27
status: Accepted
issue: "#9"
---

# CI/CD Foundation and Basic Validation

## Context

As the Kartuli project moves beyond the skeleton milestone, we need to establish automated quality checks and validation processes. The project is a monorepo with multiple packages and applications, requiring a robust CI/CD pipeline that can:

- Validate code quality across all packages
- Ensure type safety throughout the codebase
- Run tests consistently
- Provide feedback on pull requests
- Prepare for future deployment automation

Currently, the project has basic scripts for linting and testing, but lacks:
- TypeScript type checking automation
- GitHub Actions workflows for CI
- Automated validation on pull requests
- Foundation for future deployment pipelines

## Decision

We will implement a basic CI/CD foundation with the following components:

### 1. TypeScript Type Checking
- Add `typecheck` scripts to all packages with TypeScript files
- Configure Turbo to run type checking with proper dependency ordering
- Include type checking in the CI pipeline

### 2. GitHub Actions Workflow
- Create a preview workflow that triggers on pull requests to main
- Implement sequential validation: typecheck → lint → test
- Use Node.js 20 with pnpm caching for optimal performance
- Run validation across all packages in the monorepo

### 3. Package Configuration
- Add typecheck scripts to:
  - `apps/game-client` (Next.js app)
  - `apps/backoffice-client` (Next.js app)  
  - `packages/ui` (React components)
  - `tools/storybook` (Storybook tool)
- Exclude packages without TypeScript files:
  - `packages/theme` (CSS only)
  - `tools/web-docs-client` (JavaScript only)

### 4. Turbo Configuration
- Configure typecheck task with proper dependency ordering
- Enable caching for improved performance
- Define appropriate input patterns for cache invalidation

## Consequences

### Positive
- **Automated Quality Gates**: Every PR will be validated for type safety, linting, and tests
- **Early Error Detection**: Type errors caught before merge, reducing production issues
- **Consistent Environment**: All developers work with the same validation standards
- **Foundation for Deployment**: Establishes patterns for future deployment automation
- **Performance**: Turbo caching reduces CI execution time
- **Developer Experience**: Clear feedback on code quality issues

### Negative
- **Initial Setup Complexity**: Requires configuration across multiple files
- **CI Execution Time**: Additional validation steps increase PR feedback time
- **Maintenance Overhead**: Need to maintain and update CI configurations
- **Dependency on External Services**: Relies on GitHub Actions availability

### Risks
- **False Positives**: CI failures due to environment differences
- **Configuration Drift**: CI and local environments may diverge over time
- **Performance Degradation**: Large monorepos may experience slower CI execution

## Implementation

### Current State
The following has been implemented:

1. **Root Package Configuration**
   - Added `typecheck` script to root `package.json`
   - Configured to run across all packages via Turbo

2. **Package-Level Scripts**
   - Added `typecheck: "tsc --noEmit"` to all TypeScript packages
   - Fixed TypeScript configuration issues with jest-dom types
   - Excluded non-TypeScript packages appropriately

3. **Turbo Configuration**
   - Added typecheck task with dependency ordering
   - Enabled caching with appropriate input patterns
   - Configured to run in parallel where possible

4. **GitHub Actions Workflows**
   - Created `.github/workflows/app-deploy-pr.yml` for PR validation and preview deployments
   - Configured for pull request validation and Vercel preview deployments
   - Sequential execution: typecheck → lint → test → build → deploy
   - Node.js 20 with pnpm caching
   - Leverages Vercel's native GitHub integration for automatic preview cleanup

5. **Validation**
   - All packages pass typecheck validation
   - All packages pass linting validation  
   - All tests pass successfully
   - GitHub Actions workflow ready for testing

4. **Production Deployment Workflow**
   - Created `.github/workflows/app-deploy-main.yml`
   - Configured for automated production deployments on main branch pushes
   - Uses Vercel Action for deployment with proper authentication
   - Path filtering ensures only game-client related changes trigger deployments
   - Includes build step before deployment for validation

5. **Vercel Integration**
   - Configured GitHub Actions secrets for Vercel authentication
   - Set up automated deployments to production environment
   - Custom domain `kartuli.app` configured and working
   - Manual deployment pipeline replaced with automated workflow
   - **✅ DEPLOYMENT SUCCESSFUL**: Production deployment working in ~2 minutes
   - **✅ RESOLVED**: Fixed Root Directory configuration conflicts
   - **✅ VERIFIED**: GitHub Actions → Vercel deployment pipeline operational

6. **Preview Deployments for Pull Requests**
   - Enhanced `app-deploy-pr.yml` workflow to include Vercel preview deployments
   - Each PR gets a unique preview URL for testing changes before merge
   - Automatic PR comments with preview URLs for easy access
   - Preview deployments automatically cleaned up by Vercel's native GitHub integration
   - Same validation pipeline (typecheck → lint → test → build → deploy) for consistency

7. **Remote Caching with Turborepo**
   - Enabled Turborepo remote caching for faster CI/CD builds
   - Build artifacts are shared between local development and CI environments
   - Significantly reduces build times in CI by reusing cached artifacts from local runs
   - Cache sharing ensures consistent builds between local and CI environments
   - Performance optimization reduces CI compute time and costs

### Next Steps
This foundation enables future CI/CD enhancements:
- E2E testing integration
- Performance monitoring
- Error tracking setup

The implementation follows the principle of starting simple and building incrementally, ensuring a solid foundation for the project's growing CI/CD needs.

---

**Migration Status**: Successfully migrated to `kartuli-app` organization. Documentation deployment pipeline verified and working at `https://kartuli-app.github.io/kartuli/` - January 19, 2025.
