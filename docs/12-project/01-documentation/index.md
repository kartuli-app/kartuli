---
description: Canonical documentation boundaries, ownership rules and the twelve-section information architecture.
status: implemented
intent: architecture
---

# Documentation Architecture

The live VitePress site and generated `kartuli-llm.txt` are discovery surfaces for humans and agents. Source lives in `docs/`. Organize by stable capabilities first; provider changes should not force capability pages to move.

| Section | Canonical responsibility |
| --- | --- |
| [Apps](../../01-apps/index.md) | Independently deployed user/operator surfaces; app product, architecture and app-specific operations |
| [Packages](../../02-packages/index.md) | Imported workspace libraries: responsibility, exports, consumers, dependency boundaries |
| [Tools](../../03-tools/index.md) | Repository-maintained executables for building, testing, inspecting, documenting or operating |
| [Design System](../../04-design-system/index.md) | Shared visual/interaction contract; tokens, typography, theming, components and patterns |
| [Engineering](../../05-engineering/index.md) | Monorepo architecture, shared code, technologies and libraries |
| [Quality](../../06-quality/index.md) | Testing, accessibility, review, static analysis, performance and web quality |
| [Platform](../../07-platform/index.md) | Environments, CI, deployment, hosting, cache, observability, notifications and dependency operations |
| [Security](../../08-security/index.md) | Trust boundaries, authentication, authorization, secrets and vulnerability handling |
| [Data & Privacy](../../09-data-and-privacy/index.md) | Storage, identifiers, analytics policy, telemetry payloads, consent and retention |
| [Services](../../10-services/index.md) | External provider setup, account/project mapping, secrets by name and integration constraints |
| [AI Development](../../11-ai-development/index.md) | Agent context hierarchy, instruction entry points and coding/validation workflow |
| [Project](../index.md) | Documentation rules, contributing, Git/issue/project workflow, ownership and decisions |

An **app** is deployed because learners/operators use it. A **package** is imported by workspace code. A **tool** is executed to help develop or operate Kartuli. A hosted docs site can still be a tool. The Design System describes the contract; package docs describe its implementation/export boundary.

## One canonical owner

Choose one page per concept and link to it elsewhere. For example, Quality owns accessibility requirements, Storybook owns its implementation, Design System links to the requirements. Platform owns hosting/deployment/cache; Vercel owns provider mapping. Data & Privacy owns analytics taxonomy; a future PostHog page would own its setup. Security owns authentication; a future Supabase page would not replace that architecture.

Keep app-specific product behavior in Apps. Git technical usage belongs in Engineering; branch/review conventions belong in Project. Source references are implementation evidence, not substitute copies of canonical prose.

## Growth and maintenance

Each top-level area has an `index.md` hub. Add detailed pages when there is useful verified content, not merely a candidate heading. Library entries graduate to dedicated pages when they establish architectural boundaries or recurring Kartuli conventions. Future providers stay in the service catalog until adopted.

Every implementation PR that changes documented behavior updates its canonical page and affected links in the same PR, or explicitly explains why documentation is unaffected. Keep bootstrap agent files concise. Preserve URLs when possible; when moving a page, update all links and account for published links before removing it.

See [Writing Guide](./01-writing-guide.md) for metadata/status rules and [Web Docs Client](../../03-tools/03-web-docs-client.md) for generation/validation.
