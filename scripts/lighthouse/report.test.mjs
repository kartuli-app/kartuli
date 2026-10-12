import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  buildLighthouseSummary,
  formatCategoryScore,
  formatCls,
  formatMilliseconds,
  formatSeconds,
} from './report.mjs';

const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const REQUESTED_URL = 'https://example.com/en/explore/alphabet';

function createResultsDirectory({
  lhrChanges,
  links = { [REQUESTED_URL]: 'https://reports.example/lh' },
} = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'kartuli-lighthouse-'));
  const fixturePath = join(SCRIPT_DIRECTORY, 'fixtures/lhr.json');
  const lhrPath = join(directory, 'lhr-1.json');
  cpSync(fixturePath, lhrPath);
  if (lhrChanges) {
    const lhr = JSON.parse(readFileSync(lhrPath, 'utf8'));
    lhrChanges(lhr);
    writeFileSync(lhrPath, JSON.stringify(lhr), 'utf8');
  }
  writeFileSync(join(directory, 'links.json'), JSON.stringify(links), 'utf8');
  return directory;
}

test('formats Lighthouse scores and metrics for humans', () => {
  assert.equal(formatCategoryScore(0.786), '79');
  assert.equal(formatCategoryScore(1), '100');
  assert.equal(formatSeconds(2749.2), '2.7 s');
  assert.equal(formatSeconds(0), '0.0 s');
  assert.equal(formatCls(0.0123), '0.01');
  assert.equal(formatCls(0), '0.00');
  assert.equal(formatMilliseconds(119.6), '120 ms');
});

test('builds a complete informational Markdown summary', () => {
  const result = buildLighthouseSummary({
    resultsDirectory: createResultsDirectory(),
    requestedUrl: REQUESTED_URL,
    auditOutcome: 'success',
  });

  assert.equal(result.status, 'success');
  assert.equal(result.finalUrl, REQUESTED_URL);
  assert.equal(result.reportUrl, 'https://reports.example/lh');
  assert.match(result.markdown, /\| Performance \| 79 \|/);
  assert.match(result.markdown, /\| LCP \| 2\.7 s \|/);
  assert.match(result.markdown, /Scores are informational diagnostic results/);
  assert.match(result.markdown, /Audit\/reporting status.*Complete/);
  assert.doesNotMatch(result.markdown, /assertion failed|minScore|[✅❌]/i);
});

test('handles a redirect and does not require optional finalDisplayedUrl', () => {
  const finalUrl = 'https://example.com/en';
  const result = buildLighthouseSummary({
    resultsDirectory: createResultsDirectory({
      lhrChanges: (lhr) => {
        delete lhr.finalDisplayedUrl;
        lhr.finalUrl = finalUrl;
      },
      links: { [finalUrl]: 'https://reports.example/redirect' },
    }),
    requestedUrl: REQUESTED_URL,
    auditOutcome: 'success',
  });

  assert.equal(result.status, 'success');
  assert.equal(result.finalUrl, finalUrl);
  assert.match(result.markdown, new RegExp(`Requested URL: <${REQUESTED_URL}>`));
  assert.match(result.markdown, new RegExp(`Final audited URL: <${finalUrl}>`));
});

test('reports an absent uploaded report link as an infrastructure failure', () => {
  const result = buildLighthouseSummary({
    resultsDirectory: createResultsDirectory({ links: {} }),
    requestedUrl: REQUESTED_URL,
    auditOutcome: 'success',
  });

  assert.equal(result.status, 'failure');
  assert.match(result.markdown, /Full Lighthouse report URL is missing/);
  assert.match(result.markdown, /Full Lighthouse report: unavailable/);
  assert.match(result.markdown, /\| Performance \| 79 \|/);
});

test('reports malformed and incomplete LHR data without inventing values', () => {
  const malformedDirectory = createResultsDirectory();
  writeFileSync(join(malformedDirectory, 'lhr-1.json'), '{broken', 'utf8');
  const malformed = buildLighthouseSummary({
    resultsDirectory: malformedDirectory,
    requestedUrl: REQUESTED_URL,
    auditOutcome: 'failure',
  });
  assert.equal(malformed.status, 'failure');
  assert.match(malformed.markdown, /could not be read/);
  assert.doesNotMatch(malformed.markdown, /\| Performance \|/);

  const incomplete = buildLighthouseSummary({
    resultsDirectory: createResultsDirectory({
      lhrChanges: (lhr) => {
        delete lhr.categories.accessibility;
      },
    }),
    requestedUrl: REQUESTED_URL,
    auditOutcome: 'success',
  });
  assert.equal(incomplete.status, 'failure');
  assert.match(incomplete.markdown, /Category score must be a number/);
  assert.doesNotMatch(incomplete.markdown, /\| Accessibility \|/);
});

test('active Lighthouse configuration contains no assertions or score thresholds', () => {
  const config = JSON.parse(
    readFileSync(resolve(SCRIPT_DIRECTORY, '../../lighthouserc.json'), 'utf8'),
  );
  assert.equal(Object.hasOwn(config.ci, 'assert'), false);
  assert.doesNotMatch(JSON.stringify(config), /LIGHTHOUSE_ASSERT_LEVEL|minScore|categories:/);
});

test('CLI publishes GitHub outputs and exits nonzero for incomplete reporting', () => {
  const resultsDirectory = createResultsDirectory({ links: {} });
  const markdownPath = join(resultsDirectory, 'summary.md');
  const githubOutputPath = join(resultsDirectory, 'github-output.txt');
  const cliPath = join(SCRIPT_DIRECTORY, 'report-cli.mjs');
  const execution = spawnSync(
    process.execPath,
    [
      cliPath,
      `--results-dir=${resultsDirectory}`,
      `--requested-url=${REQUESTED_URL}`,
      '--audit-outcome=success',
      `--output=${markdownPath}`,
    ],
    { env: { ...process.env, GITHUB_OUTPUT: githubOutputPath }, encoding: 'utf8' },
  );

  assert.equal(execution.status, 1);
  assert.match(readFileSync(markdownPath, 'utf8'), /Audit\/reporting status.*Incomplete/);
  const githubOutput = readFileSync(githubOutputPath, 'utf8');
  assert.match(githubOutput, /^status=failure$/m);
  assert.match(githubOutput, new RegExp(`^requested_url=${REQUESTED_URL}$`, 'm'));
  assert.match(githubOutput, new RegExp(`^final_url=${REQUESTED_URL}$`, 'm'));
  assert.match(githubOutput, /^report_url=$/m);
});
