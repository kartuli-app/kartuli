---
section: Providers
title: GitHub Repo Management
description: How we manage contributors, collaboration model, and protection of repository secrets and workflows.
type: provider
---

# GitHub Repo Management

## Overview

This doc describes how we run the Kartuli repository with respect to contributors, fork vs direct collaboration, GitHub Actions security, and protection of sensitive paths (e.g. workflows and secrets). It aligns with how many open source projects handle trust and secrets.

## Capability

- **Fork-based contributions:** Anyone can fork the repo and open a PR into our repo without being added as a collaborator.
- **Branch protection:** Require pull requests and reviews before merging to the default branch.
- **CODEOWNERS:** Require review from code owners for specific paths (e.g. `.github/`).
- **Secrets:** Repository secrets are available only to workflows that run in this repo; they are not exposed to forks or in logs.

## Current usage

- We expect **most contributors to use the fork-based model:** they do not get write access; they fork, push to their fork, and open a PR into our repo.
- **Direct collaborators** (write access) are only people we trust; we may use CODEOWNERS and branch protection so that changes to `.github/` cannot be merged without a code owner’s approval.
- Staging and deployment workflows run in our repo and use our secrets; preview URLs can be protected (e.g. Vercel Deployment Protection) so only CI and maintainers can open them.

## Collaboration model: fork vs direct collaborator

### PRs from a fork (outside contributors)

- **Workflows that run:** Only workflows that exist on the **default branch** of the **base repository** (our repo) run. The workflow files in the fork (or in the PR head) are **not** used.
- **Secrets:** GitHub **does not pass** repository secrets to workflows triggered by a `pull_request` from a fork. So even though our workflow runs and may checkout the PR’s code (e.g. `turbo run build`), the job does not receive our Actions secrets — they are never available to fork PR runs. Contributors cannot exfiltrate secrets because the secrets are not there. (See: [GitHub — Fork pull request workflows](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).)
- **Contributors:** When we merge a PR from a fork, the author appears as a contributor (Contributors tab, contribution graph). They do not need to be added as collaborators.

### PRs from a branch in our repo (direct collaborators)

- **Workflows that run:** For the `pull_request` event, the workflow that runs can be the one from the **PR branch**. So a direct collaborator can push a branch that modifies a workflow; when they open the PR, that modified workflow runs in our repo with access to our secrets.
- **Risk:** A malicious collaborator could add a step that exfiltrates secrets (e.g. send them to an external URL). We would see the change in the PR diff, but the workflow would already have run. CODEOWNERS and branch protection prevent them from **merging** that change; they do not prevent that one run.
- **Conclusion:** Write access implies trust. To avoid any chance of workflow-based secret exfiltration, we do not give write access to untrusted people; they contribute via fork only.

### Summary

| Contribution style   | Who runs workflows?        | Do they get repo secrets? | Can they exfiltrate secrets? | Show as contributors when merged? |
|----------------------|----------------------------|----------------------------|------------------------------|------------------------------------|
| Fork → PR            | Our repo (default branch)  | No (GitHub does not pass secrets to fork PR workflows) | No | Yes |
| Same-repo branch → PR| Our repo (PR branch)       | Yes                        | Yes (one run when PR is opened) | Yes |

**Bottom line:** If we do not give write access and contributors always use forks, we are safe from secret exfiltration via Actions. GitHub’s behavior (no secrets for fork PRs) is the protection.

## Protecting sensitive paths (e.g. `.github/`)

We can ensure that changes under `.github/` (workflows, actions, CODEOWNERS) cannot be merged without a trusted reviewer’s approval.

### CODEOWNERS

- **File:** `.github/CODEOWNERS` (or a `CODEOWNERS` file at the repository root).
- **Purpose:** Map paths to users or teams that “own” them. When a PR touches those paths, GitHub requests a review from those owners.
- **Example:** To require your review for everything under `.github/`:
  - Add a line: `.github/ @your-username`
- CODEOWNERS does not block pushes or block the PR by itself; it ties **required reviews** to those paths when combined with branch protection.

### Branch protection (default branch)

On **Settings → Branches → Add rule** (or edit the rule for the default branch):

1. **Require a pull request before merging** — No direct pushes; all changes go through a PR.
2. **Require approvals** (e.g. 1) — At least one reviewer must approve.
3. **Require review from Code Owners** — When a PR touches paths listed in CODEOWNERS (e.g. `.github/`), one of the code owners must approve. If you are the only owner for `.github/`, only you can approve those PRs.

Result: Direct collaborators can still push a branch that changes `.github/` and open a PR, but they **cannot merge** that PR until a code owner approves. They cannot get a malicious workflow into the default branch without that approval. (They could still trigger one run with a malicious workflow from their branch; the only way to avoid that entirely is to not give them write access and use the fork-only model.)

## Limits and cost

- Repository collaboration, CODEOWNERS, and branch protection are **free** for public repositories on GitHub. See [GitHub Pricing](https://github.com/pricing) and [About branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/managing-a-branch-protection-rule).

## Operations

- **Adding contributors:** Do not add people as collaborators unless you trust them with write access. Prefer the fork-based model so that only workflows from the default branch run for their PRs.
- **Changing CODEOWNERS or branch protection:** Apply changes via a PR; use the same review and merge process. Ensure at least one code owner is always available to review `.github/` changes.
- **Secrets and workflows:** See [GitHub Actions CI/CD](./github-actions-ci-cd.md) for where secrets live and how workflows use them.

## Optional next steps

These are optional settings and files. None are required for security as long as we use the fork-only model; they improve safety and clarity when we add collaborators or want stricter control.

### Branch protection (default branch)

- **What:** In **Settings → Branches**, add or edit a branch protection rule for the default branch (e.g. `main`). Enable: *Require a pull request before merging*, *Require approvals* (e.g. 1). Optionally enable *Require review from Code Owners* once CODEOWNERS is in place.
- **When:** As soon as we want to enforce that no one (including ourselves) merges without a PR and review. Useful from day one if we want a single main branch that always goes through PRs.
- **Why:** Prevents direct pushes to the default branch and ensures every change is reviewed. If we later add a collaborator, they cannot merge without approval.

### CODEOWNERS

- **What:** Add a file `.github/CODEOWNERS` (or `CODEOWNERS` at the repo root) that maps paths to users or teams, e.g. `.github/ @your-username`. Then, in the branch protection rule, enable *Require review from Code Owners*.
- **When:** When we want to require our (or a trusted owner’s) review for specific paths — especially `.github/` (workflows, actions). Do this before or when we add direct collaborators so that no one can merge changes to workflows without a code owner’s approval.
- **Why:** Ensures that changes under `.github/` cannot be merged without a code owner’s review. It does not prevent a collaborator from triggering one workflow run with malicious code from their branch; it prevents that code from landing on the default branch. Combined with “no write access for untrusted people,” CODEOWNERS is an extra safeguard when we do grant write access.

### Fork pull request workflows (Actions)

- **What:** In **Settings → Actions → General**, find the option that controls whether workflows run for pull requests from forks (wording may vary, e.g. “Fork pull request workflows from outside collaborators”). Choose either to **run** workflows from fork PRs (default) or to **not run** them.
- **When:** When we want to decide how fork PRs behave. If we leave the default (run workflows), fork PRs will trigger our workflows but without secrets — jobs that need secrets will fail. If we disable running workflows from fork PRs, fork PRs will not run any workflows.
- **Why:** Running from fork PRs (default) gives contributors CI feedback (e.g. lint, typecheck, or any job that does not need secrets); jobs that require secrets will fail, which is expected. Disabling runs from fork PRs avoids those failures and saves Actions minutes, but fork contributors get no CI checks until we merge and run on the default branch. Choose based on whether we want fork PRs to get partial CI or no CI.

## References

### Related Docs

- [Contributing (root)](https://github.com/kartuli-app/kartuli/blob/main/CONTRIBUTING.md) — Links to code conventions, GitHub workflow, and documentation.
- [GitHub Actions CI/CD](./github-actions-ci-cd.md) — How we use Actions and secrets.

### Providers

- [GitHub Actions CI/CD](./github-actions-ci-cd.md)
