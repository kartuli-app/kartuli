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

## Sender contract and failure handling

The composite action accepts a prebuilt message; callers own its wording and event conditions. It uses `jq` to build JSON, optionally attaches a numeric `message_thread_id`, calls the Bot API with `curl -fsS`, then requires `.ok == true` in the response.

An empty token causes a successful skip, so a green sender step does not prove delivery. A nonnumeric topic ID fails before sending. Missing chat permissions, invalid bot credentials and API errors must be distinguished from workflow conditions that never invoked the sender.

To investigate, inspect the calling workflow's event/condition, the sender's skip/error state and the intended secret names. Verify destination and bot permissions through the provider with an authorized maintainer. Never log the request URL containing the token or send a test notification to an unknown destination. Rotation and membership changes must be coordinated with the verified owner.
