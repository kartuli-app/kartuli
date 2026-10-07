---
description: Provider catalog mapping current integrations and evaluating services to stable capabilities.
status: implemented
intent: reference
---

# Services

Service pages own provider-specific configuration; capabilities stay canonical in Platform, Quality, Security and Data & Privacy. Each guide distinguishes repository configuration, dated observations from the GitHub connector (2026-10-06), and provider settings still requiring verification.

| Provider | Status | Capabilities and evidence |
| --- | --- | --- |
| [GitHub](./01-github.md) | Repository metadata and active main ruleset verified | Squash-only merge, required Sonar check, Actions/Pages and label operations; Projects/team settings remain external |
| [Vercel](./02-vercel.md) | Project links and ignored Git deployments observed | Two app projects, separate Git/Actions deployment paths and remote-cache credentials |
| [SonarQube Cloud](./03-sonarcloud.md) | PR gate report and GitHub enforcement verified | Automatic analysis described by source; effective provider exclusions/profile still unverified |
| [CodeRabbit](./04-coderabbit.md) | Earlier review and later skipped status observed | Organization UI review configuration for that run; no repository YAML |
| [Renovate](./05-renovate.md) | Dashboard #28 and update PRs verified | Catalog/schema discovery, grouped policy and blocked-update recovery |
| [Telegram](./06-telegram.md) | Implemented workflow integration; routing unverified | PR, CI failure and deployment notifications |
| [Kroki](./07-kroki.md) | Request/cache implementation and failed assets inspected | Public renderer; two HTML errors and an SVG error banner; policy and repair remain open |
| Supabase | Evaluating | Possible backend/data/auth; no adopted integration |
| PostHog | Evaluating | Possible product analytics; broader telemetry undecided |
| Sentry | Evaluating | Possible errors/performance/logging |
| Datadog | Evaluating | Possible logs/metrics/tracing |

Future/evaluating entries are not provider decisions or setup instructions. Do not create fake account/project mappings. Additional tooling can call external endpoints (for example Lighthouse temporary public report storage); review such data flows when adopting or changing tools.

## Verification protocol

Each provider page identifies its source, verification date and remaining external settings. A maintainer should record the nonsecret account/project identifier, relevant setting and canonical location when checking the provider console. Never copy secret values. GitHub status descriptions and review commit ranges matter: a green status can represent a skipped review or ignored deployment. If source and provider state differ, describe the discrepancy and track the change separately.
