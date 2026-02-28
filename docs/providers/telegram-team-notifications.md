---
section: Providers
title: Telegram Team Notifications
type: provider
description: How we send CI/CD and PR notifications to a Telegram group via a bot and topic-based channels.
---

# Telegram Team Notifications

## Overview

We use a Telegram bot to post notifications to a **team group**. The group uses **topics** (forum-style threads) so the team can separate deployments, PRs, and CI failures. Notifications are sent from GitHub Actions via a shared composite action; message content is built in each workflow.

This doc covers setup, topics, workflows, and secrets. For the full list of repository secrets (including Telegram), see [GitHub Actions CI/CD — Secrets](./github-actions-ci-cd.md#secrets).

## Capability

- **Single bot:** One bot token sends to one group. Topics are selected via `message_thread_id` so each notification type has its own thread.
- **Phase 1 (current):** All notifications are sent from GitHub Actions (workflows and composite action). No webhooks or app routes yet.
- **Phase 2 (future):** PostHog, Sentry, or a Next.js API route could call the same “send message” contract (e.g. serverless endpoint that forwards to the Telegram API) for alerts or community messages.

## Current usage

### Topics

| Topic | Purpose | When messages are sent |
|-------|---------|-------------------------|
| **Deployments – Preview** | Vercel preview deploys from PRs | One message per matrix job when staging Next.js workflow deploys to Vercel (`deploy_target == 'vercel'`). |
| **Deployments – Production** | Production deploys | One message per successful production deploy (game-client, backoffice-client, web-docs-client). |
| **PRs** | Pull request lifecycle | PR opened, closed (without merge), reopened, merged, approved. |
| **CI Failures – Preview** | Staging / PR check failures | When a check suite completes with `conclusion: failure` on a **non-main** branch. |
| **CI Failures – Production** | Main-branch check failures and production workflow failures | When a check suite fails on **main**, or when any of the three production workflows (game-client, backoffice-client, web-docs-client) completes with failure on `main`. |

### Workflows and action

- **Composite action:** [`.github/actions/telegram-send-message/`](https://github.com/kartuli-app/kartuli/blob/main/.github/actions/telegram-send-message/action.yml) — Sends a pre-built message to the Telegram Bot API. Callers pass `telegram_bot_token`, `chat_id`, `message`, and optionally `message_thread_id` (topic). No formatting inside the action.
- **Staging (preview):** [staging-w-app-nextjs.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/staging-w-app-nextjs.yml) — Adds a “Notify Telegram – Deployments Preview” step when `deploy_target == 'vercel'`. Orchestrator passes Telegram secrets into the reusable workflow.
- **Production:** [production-w-app-game-client.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/production-w-app-game-client.yml), [production-w-app-backoffice-client.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/production-w-app-backoffice-client.yml), [production-w-tool-web-docs-client.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/production-w-tool-web-docs-client.yml) — Each adds a “Notify Telegram – Deployments Production” step at the end of the deploy job on success. The web-docs workflow’s deploy job checks out the repo so the local Telegram action is available.
- **PR notifications:** [notification-pr.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/notification-pr.yml) — Triggered by `pull_request` (opened, closed, reopened) and `pull_request_review` (submitted). Sends to the PRs topic for opened, closed, reopened, merged, and approved events.
- **CI failure notifications:** [notification-ci-failure.yml](https://github.com/kartuli-app/kartuli/blob/main/.github/workflows/notification-ci-failure.yml) — Two triggers: (1) **check_suite: completed** — when `conclusion == 'failure'`, one job routes to Preview vs Production topic by `head_branch`. (2) **workflow_run** — when any of the three production workflows completes with failure on `main`, a second job sends to the CI Failures – Production topic (workflow name, run URL). Both jobs check out the repo before calling the Telegram action. **Note:** `check_suite` only triggers when the workflow file is on the default branch (main).

### Message content (built at call site)

- **Preview deploy:** Who (actor or PR author), app name, preview URL, Lighthouse report link, PR link.
- **Production deploy:** Who (`github.actor`), app/target, production URL, run link.
- **PRs:** Event-specific (e.g. “PR opened: &lt;title&gt;”, author/approver/merger, link).
- **CI failures (check_suite):** Repo, branch, commit/run URL, optional PR link.
- **CI failures (production workflow):** Workflow name, repo, run URL.

## Secrets

All Telegram-related values are stored as [repository secrets](https://github.com/kartuli-app/kartuli/settings/secrets/actions). Names and usage are listed in [GitHub Actions CI/CD — Secrets](./github-actions-ci-cd.md#secrets). This section describes **where to obtain** each value.

| Secret | Where to get it |
|--------|-----------------|
| **KARTULIAPP_TEAM_BOT_TOKEN** | Create a bot via [@BotFather](https://t.me/BotFather) in Telegram. Use “/newbot”, follow the prompts, then copy the token. Add the bot to the group as a member (with permission to send messages). |
| **KARTULIAPP_TEAM_GROUP_CHAT_ID** | Add the bot to the group, then send a message in the group. Call `https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates` and find `chat.id` for the group (usually a negative number, e.g. `-1001234567890`). |
| **KARTULIAPP_TEAM_TOPIC_PREVIEW_DEPLOYMENTS_ID** | In the group, enable topics (Group → Edit → Topics). Create a topic (e.g. “Deployments – Preview”). The topic id is the thread id; you can get it from `getUpdates` when posting in that topic, or from Telegram client APIs (e.g. `message_thread_id` in the message object). Must be numeric. |
| **KARTULIAPP_TEAM_TOPIC_PRODUCTION_DEPLOYMENTS_ID** | Same as above; create a “Deployments – Production” topic and use its numeric id. |
| **KARTULIAPP_TEAM_TOPIC_PRS_ID** | Topic for PR notifications; numeric topic id. |
| **KARTULIAPP_TEAM_TOPIC_CI_FAILURES_PREVIEW_ID** | Topic for CI failures on non-main branches; numeric topic id. |
| **KARTULIAPP_TEAM_TOPIC_CI_FAILURES_PRODUCTION_ID** | Topic for CI failures on main; numeric topic id. |

**Rotation:** Update the secret in GitHub Settings when a token or topic changes. No code change needed unless you add or rename topics.

## References

### Related docs

- [GitHub Actions CI/CD](./github-actions-ci-cd.md) — Workflows and full secrets list.
- [GitHub Repo Management](./github-repo-management.md) — Who can trigger workflows and access secrets.

### Telegram

- [Telegram Bot API — sendMessage](https://core.telegram.org/bots/api#sendmessage) — `chat_id`, `text`, `message_thread_id` (optional).
