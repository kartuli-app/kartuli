---
description: Lighthouse CI configuration, staging versus production enforcement and report diagnosis.
status: implemented
intent: reference
---

# Web Quality and Lighthouse

## What the audit covers

`lighthouserc.json` configures one mobile-emulated Lighthouse run at 375×667, device scale factor 2,
150 ms round-trip latency, 1638.4 Kbps throughput and 4× CPU slowdown. It asserts minimum scores of
0.9 for performance, accessibility, best practices and SEO. The assertion level comes from
`LIGHTHOUSE_ASSERT_LEVEL` rather than being hardcoded in the file.

The reusable staging app workflow sets the level to `warn` for both local and Vercel-preview targets.
The two production app workflows set it to `error`, so a sub-threshold production audit fails the job.
One run is useful smoke evidence but is not a stable performance benchmark; network/provider variance
and page state can move the score.

## Local execution

Start a production-like app server first. App preview scripts build and serve on port 3000:

```bash
pnpm run c:preview:game-client
```

In another terminal, run:

```bash
LIGHTHOUSE_ASSERT_LEVEL=error pnpm exec lhci autorun --collect.url=http://localhost:3000
```

Use the repository-pinned Node and pnpm versions. Lighthouse needs a usable Chrome/Chromium runtime;
installing JavaScript dependencies alone may not provide the browser or its system libraries. The root
`pnpm run lighthouse` command invokes the same `lhci autorun` but does not supply a URL or assertion
level, so use the explicit form when reproducing CI.

Expected output identifies the audited URL, category scores and assertion result. Generated local
artifacts live under `.lighthouseci/` and are ignored. CI also extracts a temporary public report URL
from command output and writes it to the job summary/PR comment.

## CI flow and data handling

Staging audits the local server and the Vercel preview separately. Production deploys first, then audits
the configured public URL. A green deployment followed by a red Lighthouse step is not a successful
release-validation run.

Reports upload to Lighthouse CI's `temporary-public-storage`. Do not audit pages containing private
operator or user data unless that publication behavior has been reviewed. Production workflows retain
`.lighthouseci/` artifacts for seven days on failure; provider-side retention for the temporary public
report requires external verification.

## Failure diagnosis

1. Confirm the logged URL is nonempty and belongs to the intended app/environment.
2. Separate navigation/server failures from score failures; inspect the first Lighthouse error.
3. Open the report and identify the failing category/audit rather than optimizing only the aggregate.
4. Reproduce against the same production-like build and mobile settings.
5. For a variable score, compare multiple local runs before claiming a deterministic regression.
6. Verify the actual workflow result; a posted report link is not proof every job step passed.

Lighthouse accessibility is an automated sample, not a conformance statement. Axe browser tests and
manual keyboard/screen-reader checks remain required where relevant. SEO audits do not establish a
complete content or indexing policy. No repository-wide Web Vitals budget, bundle-size budget or
longitudinal performance store is currently configured.

See [Accessibility](./02-accessibility.md), [E2E and production smoke](./01-testing/03-e2e-smoke.md),
[Deployment](../07-platform/02-deployment.md) and [Data & Privacy](../09-data-and-privacy/index.md).
