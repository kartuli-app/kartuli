---
description: Informational Lighthouse CI configuration, output surfaces and report diagnosis.
status: implemented
intent: reference
---

# Web Quality and Lighthouse

## What the audit covers

`lighthouserc.json` configures one mobile-emulated Lighthouse run at 375×667, device scale factor 2,
150 ms round-trip latency, 1638.4 Kbps throughput and 4× CPU slowdown. It records performance,
accessibility, best practices and SEO without assertions or minimum scores. The single run is useful
lab evidence, not a stable benchmark or release gate: provider variance, page state and Lighthouse's
simulated environment can move the result.

CI audits explicit public routes instead of relying on root redirects:

| App | Audited path |
| --- | --- |
| Game Client | `/en/explore/alphabet` |
| Backoffice | `/en` |

The same path is used for local, Vercel-preview and production targets. Backoffice auditing remains
limited to its public landing page; authenticated or private surfaces are out of scope.

## Local execution

Start a production-like app server first. Game Client preview serves on port 3000 and Backoffice
preview serves on port 3001:

```bash
pnpm run c:preview:game-client
```

In another terminal, run the audit and render the same structured Markdown used by CI:

```bash
pnpm run lighthouse --collect.url=http://localhost:3000/en/explore/alphabet
pnpm run lighthouse:summary \
  --requested-url=http://localhost:3000/en/explore/alphabet \
  --audit-outcome=success \
  --output=lighthouse-summary.md
```

For Backoffice, use `pnpm run c:preview:backoffice-client`, port 3001 and `/en`.

Use the repository-pinned Node and pnpm versions. Lighthouse needs a usable Chrome/Chromium runtime;
installing JavaScript dependencies alone may not provide the browser or its system libraries.
Generated local artifacts live under `.lighthouseci/` and are ignored.

The reporter reads `lhr-*.json` for the requested/final URLs and metrics, then resolves the uploaded
report from `links.json`. Its Markdown includes rounded category percentages plus LCP in seconds, CLS,
TBT in milliseconds and the temporary report link. A valid LHR, every required metric and a matching
upload link are all required for a complete result. Missing or malformed data produces an explicit
infrastructure/reporting failure and a nonzero exit without inventing values.

## CI flow and output surfaces

Staging audits the shared local server or Vercel preview in the existing app job. Lighthouse and its
summary step are tolerated informational steps: failure does not suppress Playwright, but failed
execution or parsing uploads `.lighthouseci/` diagnostics. The existing per-app/per-target PR comment
is always updated with the readable report or explicit failure state and retains the preview link.
Staging does not duplicate Lighthouse output in the Actions job summary.

Each production app performs deployment, production E2E and release notification in its core job. A
separate `Lighthouse audit (informational)` job runs afterward with
[job-level `continue-on-error`](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idcontinue-on-error)
and writes its readable report or failure state only to the production Actions summary. That boundary
preserves failed-job evidence without blocking a successful deployment workflow or notification.

[Temporary public storage](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md#target)
remains appropriate only for these public routes. Reports are link-public, short-lived and hosted in
Google Cloud Platform. They can contain screenshots, DOM snippets and request URLs, so do not audit
private, authenticated or user-specific content with this target.

## Failure diagnosis

1. Confirm the requested and final URLs identify the intended app, environment and explicit path.
2. Inspect the Lighthouse execution before interpreting a reporter failure; browser, navigation and
   upload failures are infrastructure evidence, not performance results.
3. Check `.lighthouseci/lhr-*.json` for the metric source and `links.json` for the final-URL report
   mapping. An empty mapping is a failed result even if LHCI itself exited successfully.
4. Open the report for audit details; do not infer a product regression from a single lab run.
5. Reproduce against the same production-like build and mobile settings, using multiple runs when
   investigating variance.

Lighthouse accessibility is an automated sample, not a conformance statement. Axe browser tests and
manual keyboard/screen-reader checks remain required where relevant. SEO audits do not establish a
complete content or indexing policy. No repository-wide Web Vitals budget, bundle-size budget or
longitudinal performance store is currently configured.

See [Accessibility](./02-accessibility.md), [E2E and production smoke](./01-testing/03-e2e-smoke.md),
[Deployment](../07-platform/02-deployment.md) and [Data & Privacy](../09-data-and-privacy/index.md).
