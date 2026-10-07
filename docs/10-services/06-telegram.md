---
description: Telegram notification event matrix, sender contract, delivery evidence and failure diagnosis.
status: implemented
intent: reference
---

# Telegram

GitHub Actions sends team notifications through
`.github/actions/telegram-send-message/action.yml`. Callers build plain-text messages and select a
group/topic; the composite action sends them through the Telegram Bot API.
[Platform](../07-platform/index.md) owns the notification capability.

## Destinations and credentials

| Secret | Purpose |
| --- | --- |
| `KARTULIAPP_TEAM_BOT_TOKEN` | Bot authentication shared by senders |
| `KARTULIAPP_TEAM_GROUP_CHAT_ID` | Destination group |
| `KARTULIAPP_TEAM_TOPIC_PRS_ID` | PR lifecycle and approvals |
| `KARTULIAPP_TEAM_TOPIC_CI_FAILURES_STAGING_ID` | Failed check suites on branches other than main |
| `KARTULIAPP_TEAM_TOPIC_CI_FAILURES_PRODUCTION_ID` | Main check failures and production workflow failures |
| `KARTULIAPP_TEAM_TOPIC_PREVIEW_DEPLOYMENTS_ID` | Vercel preview notification |
| `KARTULIAPP_TEAM_TOPIC_PRODUCTION_DEPLOYMENTS_ID` | App/docs production and docs post-deploy failure messages |

The source names the routing keys, not their effective destinations. Bot ownership, group membership,
topic mapping, send permission and retention require Telegram-side verification. Token values and
private chat IDs are not needed in documentation.

## Events and notification timing

| Caller | Sends when | Meaning and limits |
| --- | --- | --- |
| `notification-pr.yml` | PR opened, closed, reopened; submitted review with state approved | A merge is handled as a closed event with merged flag; comments/changes-requested reviews do not send |
| `notification-ci-failure.yml`, check-suite job | Completed suite has conclusion failure | Main routes to production; other branches to staging; message links the commit and first associated PR |
| Same workflow, production job | One of the three named production workflows completes with failure on main | Links the failed workflow run |
| `staging-w-app-nextjs.yml` | Vercel deployment and preceding Lighthouse/report steps succeed | Sent before E2E; preview notification does not imply E2E passed |
| Production app workflows | Deploy, production E2E and Lighthouse succeed | Sent at the end of successful app validation |
| Production docs workflow | Pages deployment succeeds | Sent before propagation wait and browser E2E |
| Production docs failure handler | A preceding deploy-job step fails | Wording says post-deploy E2E failed, but the broad `failure()` condition can include setup, propagation or notification failures |

The CI-failure workflow exposes manual dispatch but both jobs require their specific event names,
so a manual run is not a delivery test. Check-suite and production-workflow notifications can overlap;
the workflow explicitly records possible duplicate production alerts. The docs failure handler adds
another possible notification for the same release.

## Sender contract

Inputs are `telegram_bot_token`, `chat_id`, `message` and optional `message_thread_id`.
The action:

1. Exits successfully with a skip message if the token is empty.
2. Uses `jq` to encode chat/text as JSON, preserving quotes and newlines.
3. Rejects a nonnumeric, nonempty thread ID; an empty thread omits topic routing.
4. POSTs to the bot's `sendMessage` endpoint using `curl -fsS`.
5. Requires the response's `.ok` to be true.

No parse mode, retry/backoff loop or delivery-receipt storage is configured. A nonzero sender result
can fail the calling job. API acceptance does not establish that a human read the notification.

## Evidence and investigation

The GitHub connector observed
[run 37441752811](https://github.com/kartuli-app/kartuli/actions/runs/37441752811) on **2026-10-06**:
a check-suite-triggered CI-notification run was skipped. That observation proves event/condition
processing, not a Telegram send. No real test message was sent during this audit.

For an expected message:

1. Find the PR/deployment/failure event and the matching caller from the table.
2. Open its GitHub run and inspect the job/step condition, including skipped steps.
3. Check for the explicit empty-token skip before treating a green step as delivery evidence.
4. Distinguish topic-validation failure, HTTP failure and a Telegram response with `.ok != true`.
5. Have the destination owner verify bot membership and the expected topic.
6. If an authorized delivery test is needed, coordinate the destination and inspect the actual message.

Use `gh run view RUN_ID` and the job log for read-only investigation. Avoid printing request URLs:
the Bot API URL contains the token. Rotation means updating the shared bot secret and verifying the
callers with the owner; the repository does not implement an automated rotation procedure.
