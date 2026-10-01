---
description: Repository-maintained software for development, testing, documentation and inspection.
status: implemented
intent: reference
---

# Tools

Tools execute to help build, inspect, test or operate Kartuli, even when their output is hosted.

| Tool | Responsibility | Source |
| --- | --- | --- |
| [Storybook](./01-storybook.md) | Component previews, interaction and browser accessibility tests | `tools/storybook` |
| [E2E Runner](./02-e2e-runner.md) | Playwright page and production smoke suites | `tools/e2e` |
| [Web Docs Client](./03-web-docs-client.md) | VitePress site and agent documentation index | `tools/web-docs-client` |
| [Diagram Generator](./04-diagram-generator.md) | Dependency-cruiser and Graphviz dependency views | `tools/diagram-generator` |

Validation policy belongs to [Quality](../06-quality/index.md); docs writing policy belongs to [Project → Documentation](../12-project/01-documentation/index.md).
