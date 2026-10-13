import { E2eConfigError } from './errors.ts';
import type { ResolvedE2eRun } from './resolve-run.ts';
import {
  type E2eTargetId,
  listE2eTargetIds,
  requireE2eTarget,
  testDirForSuite,
} from './targets.ts';
import { normalizeBaseUrl } from './urls.ts';

export const E2E_ENV = {
  target: 'KARTULI_E2E_TARGET',
  mode: 'KARTULI_E2E_MODE',
  suite: 'KARTULI_E2E_SUITE',
  appUrl: 'KARTULI_E2E_URL_APP',
  reuseServer: 'KARTULI_E2E_REUSE_SERVER',
} as const;

export interface RunnerSelection {
  targetId: E2eTargetId;
  mode: ResolvedE2eRun['mode'];
  suite: ResolvedE2eRun['suite'];
  appUrl: string;
  reuseServer: boolean;
  testDir: string;
}

function readRequired(env: Record<string, string | undefined>, key: string): string {
  const value = env[key];
  if (!value) {
    throw new E2eConfigError(
      `Playwright was started without an E2E target selection (${key} is missing). Run \`pnpm e2e <target>\` from the repository root. Targets: ${listE2eTargetIds().join(', ')}.`,
    );
  }
  return value;
}

export function selectionFromRun(run: ResolvedE2eRun): RunnerSelection {
  return {
    targetId: run.targetId,
    mode: run.mode,
    suite: run.suite,
    appUrl: run.urls.app,
    reuseServer: run.server?.reuseExistingServer ?? false,
    testDir: run.testDir,
  };
}

export function selectionToEnv(selection: RunnerSelection): Record<string, string> {
  return {
    [E2E_ENV.target]: selection.targetId,
    [E2E_ENV.mode]: selection.mode,
    [E2E_ENV.suite]: selection.suite,
    [E2E_ENV.appUrl]: selection.appUrl,
    [E2E_ENV.reuseServer]: selection.reuseServer ? '1' : '0',
  };
}

export function selectionFromEnv(env: Record<string, string | undefined>): RunnerSelection {
  const target = requireE2eTarget(readRequired(env, E2E_ENV.target));
  const mode = readRequired(env, E2E_ENV.mode);
  const suite = readRequired(env, E2E_ENV.suite);
  const appUrl = normalizeBaseUrl(readRequired(env, E2E_ENV.appUrl));
  const reuseServer = env[E2E_ENV.reuseServer] === '1';

  if (mode !== 'managed-local' && mode !== 'external') {
    throw new E2eConfigError(
      `Invalid E2E mode "${mode}". Expected managed-local or external. Run \`pnpm e2e <target>\`.`,
    );
  }
  if (suite !== 'default' && suite !== 'production') {
    throw new E2eConfigError(`Invalid E2E suite "${suite}". Expected default or production.`);
  }
  if (mode === 'external' && reuseServer) {
    throw new E2eConfigError(
      'External URLs do not start or reuse a local server. Remove the reuse option.',
    );
  }
  if (mode === 'managed-local' && appUrl !== target.localBaseUrl) {
    throw new E2eConfigError(
      `Managed local runs must use ${target.localBaseUrl} for ${target.id}. Pass --url to point at a different server.`,
    );
  }

  return {
    targetId: target.id,
    mode,
    suite,
    appUrl,
    reuseServer,
    testDir: testDirForSuite(target, suite === 'production'),
  };
}
