---
description: Notification secret names, event routing and manual bot/chat verification.
status: implemented
intent: reference
---

# Telegram

`.github/actions/telegram-send-message/action.yml` is the reusable sender. [Platform](../07-platform/index.md) owns notification capability scope.

| GitHub secret | Purpose / callers |
| --- | --- |
| `KARTULIAPP_TEAM_BOT_TOKEN` | Bot authentication for all senders |
| `KARTULIAPP_TEAM_GROUP_CHAT_ID` | Destination group |
| `KARTULIAPP_TEAM_TOPIC_PRS_ID` | `notification-pr.yml` |
| `KARTULIAPP_TEAM_TOPIC_CI_FAILURES_STAGING_ID` | Staging failure routing in `notification-ci-failure.yml` |
| `KARTULIAPP_TEAM_TOPIC_CI_FAILURES_PRODUCTION_ID` | Production failure routing in `notification-ci-failure.yml` |
| `KARTULIAPP_TEAM_TOPIC_PREVIEW_DEPLOYMENTS_ID` | App preview success notifications |
| `KARTULIAPP_TEAM_TOPIC_PRODUCTION_DEPLOYMENTS_ID` | App/docs production notifications |

Messages include workflow/PR/deployment links and actor/target information. Never document token values or expose private chat identifiers merely to explain routing.

## Manual verification required

Verify bot ownership, group/topic mapping, membership/access, send permissions, delivery and credential rotation. Confirm intended recipients and retention in Telegram; YAML only proves which secret names are referenced.
