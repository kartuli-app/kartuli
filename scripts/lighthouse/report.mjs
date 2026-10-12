import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const CATEGORY_DEFINITIONS = [
  ['performance', 'Performance'],
  ['accessibility', 'Accessibility'],
  ['best-practices', 'Best Practices'],
  ['seo', 'SEO'],
];

const METRIC_DEFINITIONS = [
  ['largest-contentful-paint', 'LCP', formatSeconds],
  ['cumulative-layout-shift', 'CLS', formatCls],
  ['total-blocking-time', 'TBT', formatMilliseconds],
];

export function formatCategoryScore(score) {
  if (!Number.isFinite(score) || score < 0 || score > 1) {
    throw new TypeError('Category score must be a number between 0 and 1.');
  }
  return String(Math.round(score * 100));
}

export function formatSeconds(milliseconds) {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) {
    throw new TypeError('Millisecond value must be a non-negative number.');
  }
  return `${(milliseconds / 1000).toFixed(1)} s`;
}

export function formatMilliseconds(milliseconds) {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) {
    throw new TypeError('Millisecond value must be a non-negative number.');
  }
  return `${Math.round(milliseconds)} ms`;
}

export function formatCls(value) {
  if (!Number.isFinite(value) || value < 0) {
    throw new TypeError('CLS must be a non-negative number.');
  }
  return value.toFixed(2);
}

function parseUrl(value, label) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new TypeError(`${label} is missing.`);
  }
  try {
    return new URL(value).href;
  } catch {
    throw new TypeError(`${label} is not a valid URL.`);
  }
}

function readJson(path, label) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`${label} could not be read: ${detail}`);
  }
}

function readSingleLhr(resultsDirectory) {
  let files;
  try {
    files = readdirSync(resultsDirectory).filter((file) => /^lhr-\d+\.json$/.test(file));
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Lighthouse results directory could not be read: ${detail}`);
  }

  if (files.length !== 1) {
    throw new Error(`Expected exactly one Lighthouse JSON result, found ${files.length}.`);
  }
  return readJson(join(resultsDirectory, files[0]), 'Lighthouse JSON result');
}

function extractRows(lhr) {
  const rows = [];
  for (const [key, label] of CATEGORY_DEFINITIONS) {
    const score = lhr?.categories?.[key]?.score;
    rows.push([label, formatCategoryScore(score)]);
  }
  for (const [key, label, formatter] of METRIC_DEFINITIONS) {
    const value = lhr?.audits?.[key]?.numericValue;
    rows.push([label, formatter(value)]);
  }
  return rows;
}

function readReportUrl(resultsDirectory, finalUrl) {
  const links = readJson(join(resultsDirectory, 'links.json'), 'Lighthouse report URL map');
  if (links === null || typeof links !== 'object' || Array.isArray(links)) {
    throw new TypeError('Lighthouse report URL map must be an object.');
  }
  return parseUrl(links[finalUrl], 'Full Lighthouse report URL');
}

function renderMetricTable(rows) {
  return [
    '| Metric | Result |',
    '| --- | ---: |',
    ...rows.map(([label, value]) => `| ${label} | ${value} |`),
  ].join('\n');
}

function renderSuccessfulSummary({ requestedUrl, finalUrl, rows, reportUrl }) {
  return `### Lighthouse

Scores are informational diagnostic results, not pass/fail thresholds.

**Audit/reporting status:** Complete.

Requested URL: <${requestedUrl}><br>
Final audited URL: <${finalUrl}>

${renderMetricTable(rows)}

[Full Lighthouse report](${reportUrl})`;
}

function renderFailedSummary({ requestedUrl, finalUrl, rows, reportUrl, messages }) {
  const requestedLine = requestedUrl
    ? `Requested URL: <${requestedUrl}>`
    : 'Requested URL: unavailable';
  const finalLine = finalUrl
    ? `Final audited URL: <${finalUrl}>`
    : 'Final audited URL: unavailable';
  const availableResults = rows.length > 0 ? `\n\n${renderMetricTable(rows)}` : '';
  const reportLine = reportUrl
    ? `\n\n[Full Lighthouse report](${reportUrl})`
    : '\n\nFull Lighthouse report: unavailable';

  return `### Lighthouse

**Audit/reporting status:** Incomplete. Lighthouse did not produce a complete usable report.

${requestedLine}<br>
${finalLine}

Details: ${messages.join(' ')}${availableResults}${reportLine}`;
}

export function buildLighthouseSummary({ resultsDirectory, requestedUrl, auditOutcome }) {
  const messages = [];
  let normalizedRequestedUrl;
  let finalUrl;
  let rows = [];
  let reportUrl;

  try {
    normalizedRequestedUrl = parseUrl(requestedUrl, 'Requested audit URL');
  } catch (error) {
    messages.push(error.message);
  }

  if (auditOutcome !== 'success') {
    messages.push(`LHCI execution outcome was ${auditOutcome || 'unknown'}.`);
  }

  let lhr;
  try {
    lhr = readSingleLhr(resultsDirectory);
    const lhrRequestedUrl = parseUrl(lhr.requestedUrl, 'Lighthouse requested URL');
    if (normalizedRequestedUrl && lhrRequestedUrl !== normalizedRequestedUrl) {
      messages.push(
        `Lighthouse requested ${lhrRequestedUrl}, which does not match ${normalizedRequestedUrl}.`,
      );
    }
    finalUrl = parseUrl(
      lhr.finalUrl ?? lhr.finalDisplayedUrl ?? lhr.mainDocumentUrl,
      'Final audited URL',
    );
    rows = extractRows(lhr);
  } catch (error) {
    messages.push(error.message);
  }

  if (finalUrl) {
    try {
      reportUrl = readReportUrl(resultsDirectory, finalUrl);
    } catch (error) {
      messages.push(error.message);
    }
  }

  const status = messages.length === 0 ? 'success' : 'failure';
  const summary = {
    status,
    requestedUrl: normalizedRequestedUrl,
    finalUrl,
    reportUrl,
    rows,
  };

  return {
    ...summary,
    markdown:
      status === 'success'
        ? renderSuccessfulSummary(summary)
        : renderFailedSummary({ ...summary, messages }),
  };
}
