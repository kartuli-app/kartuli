---
description: Provider catalog mapping current integrations and evaluating services to stable capabilities.
status: implemented
intent: reference
---

# Services

Service pages own provider-specific configuration; capabilities stay canonical in Platform, Quality, Security and Data & Privacy. “Implemented” here means repository evidence of integration, not verified account settings.

| Provider | Status | Capabilities and evidence |
| --- | --- | --- |
| [GitHub](./01-github.md) | Implemented; external settings unverified | Source, issues/PRs, ownership, Actions, Pages, labels, artifacts; Projects mapping needs verification |
| [Vercel](./02-vercel.md) | Implemented workflow integration; mapping unverified | App hosting/previews/production; separate Turbo remote-cache credentials |
| [SonarCloud](./03-sonarcloud.md) | Current integration reported by repo reference; UI unverified | Static analysis through GitHub App automatic analysis |
| [CodeRabbit](./04-coderabbit.md) | Current review service reported in issue #165; external config unverified | Code-review assistance; no repo config found |
| [Renovate](./05-renovate.md) | Implemented repository policy; installation unverified | Dependency and vulnerability update PRs |
| [Telegram](./06-telegram.md) | Implemented workflow integration; routing unverified | PR, CI failure and deployment notifications |
| [Kroki](./07-kroki.md) | Observed diagram dependency; intentional adoption unverified | Docs diagram rendering; committed timeout response |
| Supabase | Evaluating | Possible backend/data/auth; no adopted integration |
| PostHog | Evaluating | Possible product analytics; broader telemetry undecided |
| Sentry | Evaluating | Possible errors/performance/logging |
| Datadog | Evaluating | Possible logs/metrics/tracing |

Future/evaluating entries are not provider decisions or setup instructions. Do not create fake account/project mappings. Additional tooling can call external endpoints (for example Lighthouse temporary public report storage); review such data flows when adopting or changing tools.

## Verification protocol

Each provider page separates repository evidence from **Manual verification required**. A maintainer should record verification date, the nonsecret account/project identifier, the relevant setting and its canonical location when checking the provider console. Never copy secret values. If source and provider state differ, describe the discrepancy and track the change separately rather than silently claiming either state is enforced.
