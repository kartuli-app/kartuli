import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { E2eConfigError } from './errors.ts';
import { assertIdentifiedTarget, decideLocalServer, probeTargetIdentity } from './identity.ts';
import { e2ePackageRoot } from './paths.ts';
import {
  describeE2eRun,
  type E2eCliInput,
  e2eUsageText,
  parseE2eCliArgs,
  type ResolvedE2eRun,
  resolveE2eRun,
  withServerReuse,
} from './resolve-run.ts';
import { selectionFromRun, selectionToEnv } from './runner-env.ts';

function writeStdout(message: string): void {
  process.stdout.write(`${message}\n`);
}

const LOCAL_PROBE_TIMEOUT_MS = 3_000;
const EXTERNAL_PROBE_TIMEOUT_MS = 10_000;

async function prepareRun(input: E2eCliInput): Promise<ResolvedE2eRun> {
  const run = resolveE2eRun(input);
  if (run.mode === 'external') {
    const probe = await probeTargetIdentity(run.urls.app, fetch, EXTERNAL_PROBE_TIMEOUT_MS);
    assertIdentifiedTarget(probe, run.targetId, run.urls.app);
    return run;
  }

  const probe = await probeTargetIdentity(run.urls.app, fetch, LOCAL_PROBE_TIMEOUT_MS);
  const decision = decideLocalServer(probe, run.targetId, run.urls.app, input.reuseServer);
  return withServerReuse(run, decision === 'reuse');
}

function runPlaywright(run: ResolvedE2eRun): Promise<void> {
  const child = spawn('pnpm', ['exec', 'playwright', 'test', run.testDir, ...run.playwrightArgs], {
    cwd: e2ePackageRoot,
    env: {
      ...process.env,
      ...selectionToEnv(selectionFromRun(run)),
    },
    stdio: 'inherit',
  });

  return new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', (code, signal) => {
      if (signal) {
        process.exitCode = 1;
        resolve();
        return;
      }
      process.exitCode = code ?? 1;
      resolve();
    });
  });
}

export async function runE2eCli(argv: string[]): Promise<void> {
  const input = parseE2eCliArgs(argv);
  if (input.help) {
    writeStdout(e2eUsageText());
    return;
  }

  const run = await prepareRun(input);
  writeStdout(describeE2eRun(run));
  await runPlaywright(run);
}

async function main(): Promise<void> {
  try {
    await runE2eCli(process.argv.slice(2));
  } catch (error) {
    if (error instanceof E2eConfigError) {
      console.error(error.message);
      process.exitCode = 1;
      return;
    }
    throw error;
  }
}

function isCliEntry(): boolean {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }
  return import.meta.url === pathToFileURL(entry).href;
}

if (isCliEntry()) {
  void main();
}
