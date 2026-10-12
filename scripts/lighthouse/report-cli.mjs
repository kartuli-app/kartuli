import { appendFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildLighthouseSummary } from './report.mjs';

function parseArguments(args) {
  const options = {};
  for (const argument of args) {
    const separator = argument.indexOf('=');
    if (!argument.startsWith('--') || separator === -1) {
      throw new Error(`Unsupported argument: ${argument}`);
    }
    options[argument.slice(2, separator)] = argument.slice(separator + 1);
  }
  return options;
}

function cleanOutputValue(value) {
  return value?.replace(/[\r\n]/g, '') ?? '';
}

try {
  const options = parseArguments(process.argv.slice(2));
  if (!Object.hasOwn(options, 'requested-url') || !options.output) {
    throw new Error(
      'Usage: report-cli.mjs --requested-url=<url> --audit-outcome=<outcome> --output=<path> [--results-dir=<path>]',
    );
  }

  const result = buildLighthouseSummary({
    resultsDirectory: resolve(options['results-dir'] ?? '.lighthouseci'),
    requestedUrl: options['requested-url'],
    auditOutcome: options['audit-outcome'] ?? 'unknown',
  });
  const outputPath = resolve(options.output);
  writeFileSync(outputPath, `${result.markdown}\n`, 'utf8');

  // GitHub Actions defines this file contract outside Turbo's task environment.
  const githubOutput = process.env.GITHUB_OUTPUT;
  if (githubOutput) {
    const outputs = [
      `status=${result.status}`,
      `report_url=${cleanOutputValue(result.reportUrl)}`,
      `requested_url=${cleanOutputValue(result.requestedUrl)}`,
      `final_url=${cleanOutputValue(result.finalUrl)}`,
    ];
    appendFileSync(githubOutput, `${outputs.join('\n')}\n`, 'utf8');
  }

  process.stdout.write(`Lighthouse summary status: ${result.status}\n`);
  process.stdout.write(`Requested audit URL: ${result.requestedUrl ?? 'unavailable'}\n`);
  process.stdout.write(`Final audited URL: ${result.finalUrl ?? 'unavailable'}\n`);
  process.stdout.write(`Summary written to ${outputPath}\n`);
  if (result.status !== 'success') process.exitCode = 1;
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Unable to create Lighthouse summary: ${message}\n`);
  process.exitCode = 1;
}
