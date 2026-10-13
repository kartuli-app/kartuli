import { parseArgs } from 'node:util';
import { E2eConfigError } from './errors.ts';
import { repoRoot } from './paths.ts';
import {
  type E2eTargetId,
  listE2eTargetIds,
  requireE2eTarget,
  testDirForSuite,
} from './targets.ts';
import { identityUrlForBase, normalizeBaseUrl } from './urls.ts';

export type E2eRunMode = 'managed-local' | 'external';
export type E2eSuite = 'default' | 'production';

export interface E2eCliInput {
  targetId?: string;
  url?: string;
  production: boolean;
  reuseServer: boolean;
  ui: boolean;
  headed: boolean;
  debug: boolean;
  help: boolean;
  playwrightArgs: string[];
}

/**
 * Named origins for one run. Current suites navigate with `app` as Playwright's baseURL.
 * Add another name when a scenario needs a second origin instead of overloading `app`.
 */
export interface E2eRunUrls {
  app: string;
}

export interface ResolvedE2eRun {
  targetId: E2eTargetId;
  mode: E2eRunMode;
  suite: E2eSuite;
  testDir: string;
  urls: E2eRunUrls;
  server: {
    command: string;
    cwd: string;
    readyUrl: string;
    timeoutMs: number;
    reuseExistingServer: boolean;
  } | null;
  playwrightArgs: string[];
}

function stripLeadingSeparators(argv: string[]): string[] {
  const args = [...argv];
  while (args[0] === '--') {
    args.shift();
  }
  return args;
}

export function e2eUsageText(): string {
  return `Usage:
  pnpm e2e <target> [options] [-- <playwright args>]

Targets:
  ${listE2eTargetIds().join('\n  ')}

Options:
  --url <url>       Run against an existing URL. Does not start a local server.
  --production      Run only that target's production-safe suite.
  --reuse-server    Use the target's local server when it is already running and identifies correctly.
  --ui              Open Playwright UI mode.
  --headed          Run the browser headed.
  --debug           Open the Playwright inspector.
  --help            Show this help.

Local, external, UI, headed and debug runs all use this target model.
The selected URL is exposed as the named origin "app" (Playwright baseURL).

Examples:
  pnpm e2e game-client
  pnpm e2e game-client --production
  pnpm e2e game-client --url https://www.kartuli.app --production
  pnpm e2e backoffice-client --headed
  pnpm e2e storybook --ui
  pnpm e2e web-docs-client --reuse-server
  pnpm e2e game-client -- --grep "not-found"`;
}

export function parseE2eCliArgs(argv: string[]): E2eCliInput {
  try {
    const parsed = parseArgs({
      args: stripLeadingSeparators(argv),
      allowPositionals: true,
      strict: true,
      options: {
        url: { type: 'string' },
        production: { type: 'boolean', default: false },
        'reuse-server': { type: 'boolean', default: false },
        ui: { type: 'boolean', default: false },
        headed: { type: 'boolean', default: false },
        debug: { type: 'boolean', default: false },
        help: { type: 'boolean', short: 'h', default: false },
      },
    });
    const [targetId, ...playwrightArgs] = parsed.positionals;
    return {
      targetId,
      url: parsed.values.url,
      production: parsed.values.production,
      reuseServer: parsed.values['reuse-server'],
      ui: parsed.values.ui,
      headed: parsed.values.headed,
      debug: parsed.values.debug,
      help: parsed.values.help,
      playwrightArgs,
    };
  } catch (error) {
    if (error instanceof E2eConfigError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : 'Could not parse arguments.';
    throw new E2eConfigError(`${message}\n\n${e2eUsageText()}`);
  }
}

function browserModeArg(input: E2eCliInput): string | undefined {
  const selected = [
    input.ui ? '--ui' : undefined,
    input.headed ? '--headed' : undefined,
    input.debug ? '--debug' : undefined,
  ].filter((mode): mode is string => mode !== undefined);

  if (selected.length > 1) {
    throw new E2eConfigError(
      `Choose one browser mode. Received ${selected.join(' and ')}. UI, headed and debug are separate runs of the same target.`,
    );
  }
  return selected[0];
}

export function resolveE2eRun(input: E2eCliInput): ResolvedE2eRun {
  if (!input.targetId) {
    throw new E2eConfigError(`Missing E2E target.\n\n${e2eUsageText()}`);
  }
  if (input.url !== undefined && input.reuseServer) {
    throw new E2eConfigError(
      'Pass either --url or --reuse-server, not both. --url runs against an existing server and does not manage a local process.',
    );
  }

  const target = requireE2eTarget(input.targetId);
  const suite: E2eSuite = input.production ? 'production' : 'default';
  const testDir = testDirForSuite(target, input.production);
  const modeArg = browserModeArg(input);
  const playwrightArgs = modeArg ? [modeArg, ...input.playwrightArgs] : [...input.playwrightArgs];

  if (input.url !== undefined) {
    const appUrl = normalizeBaseUrl(input.url);
    return {
      targetId: target.id,
      mode: 'external',
      suite,
      testDir,
      urls: { app: appUrl },
      server: null,
      playwrightArgs,
    };
  }

  return {
    targetId: target.id,
    mode: 'managed-local',
    suite,
    testDir,
    urls: { app: target.localBaseUrl },
    server: {
      command: target.serverCommand,
      cwd: repoRoot,
      readyUrl: identityUrlForBase(target.localBaseUrl),
      timeoutMs: target.serverTimeoutMs,
      reuseExistingServer: false,
    },
    playwrightArgs,
  };
}

export function withServerReuse(run: ResolvedE2eRun, reuseExistingServer: boolean): ResolvedE2eRun {
  if (!run.server) {
    throw new E2eConfigError('External E2E runs do not have a local server to reuse.');
  }
  return {
    ...run,
    server: {
      ...run.server,
      reuseExistingServer,
    },
  };
}

export function describeE2eRun(run: ResolvedE2eRun): string {
  const lines = [
    `E2E target: ${run.targetId}`,
    `Mode: ${run.mode === 'managed-local' ? 'managed local preview' : 'external URL'}`,
    `Suite: ${run.suite} (${run.testDir})`,
    `URL (app): ${run.urls.app}`,
  ];
  if (run.server) {
    lines.push(
      `Server: ${run.server.command}`,
      `Reuse existing server: ${run.server.reuseExistingServer ? 'yes' : 'no'}`,
    );
  } else {
    lines.push('Local server: not started');
  }
  return lines.join('\n');
}
