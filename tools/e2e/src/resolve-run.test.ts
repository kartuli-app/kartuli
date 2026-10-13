import { describe, expect, it } from 'vitest';
import { E2eConfigError } from './errors.ts';
import { repoRoot } from './paths.ts';
import { createPlaywrightConfig } from './playwright-config.ts';
import {
  describeE2eRun,
  e2eUsageText,
  parseE2eCliArgs,
  resolveE2eRun,
  withServerReuse,
} from './resolve-run.ts';
import { selectionFromEnv, selectionFromRun, selectionToEnv } from './runner-env.ts';
import { E2E_IDENTITY_FILE, listE2eTargetIds } from './targets.ts';

function cli(argv: string[]) {
  return resolveE2eRun(parseE2eCliArgs(argv));
}

describe('parseE2eCliArgs', () => {
  it('reads a target, mode flags and playwright args after --', () => {
    const input = parseE2eCliArgs(['game-client', '--headed', '--', '--grep', 'not-found']);
    expect(input).toMatchObject({
      targetId: 'game-client',
      headed: true,
      ui: false,
      debug: false,
      production: false,
      playwrightArgs: ['--grep', 'not-found'],
    });
  });

  it('strips a leading separator inserted by pnpm', () => {
    const input = parseE2eCliArgs(['--', 'storybook', '--ui']);
    expect(input.targetId).toBe('storybook');
    expect(input.ui).toBe(true);
  });

  it('rejects unknown options with usage', () => {
    expect(() => parseE2eCliArgs(['game-client', '--nope'])).toThrow(E2eConfigError);
    expect(() => parseE2eCliArgs(['game-client', '--nope'])).toThrow(/Usage:/);
  });
});

describe('resolveE2eRun', () => {
  it('defines a managed local run for every current target', () => {
    const runs = listE2eTargetIds().map((targetId) => cli([targetId]));
    expect(
      runs.map((run) => [run.targetId, run.urls.app, run.testDir, run.server?.command]),
    ).toEqual([
      [
        'game-client',
        'http://localhost:3000',
        'tests/game-client',
        'pnpm --filter @kartuli/game-client run preview',
      ],
      [
        'backoffice-client',
        'http://localhost:3001',
        'tests/backoffice-client',
        'pnpm --filter @kartuli/backoffice-client run preview',
      ],
      [
        'storybook',
        'http://localhost:6006',
        'tests/storybook',
        'pnpm --filter @kartuli/storybook run build && pnpm --filter @kartuli/storybook run preview',
      ],
      [
        'web-docs-client',
        'http://localhost:4173/kartuli',
        'tests/web-docs-client',
        'pnpm --filter @kartuli/web-docs-client run preview',
      ],
    ]);

    for (const run of runs) {
      expect(run.mode).toBe('managed-local');
      expect(run.server?.cwd).toBe(repoRoot);
      expect(run.server?.reuseExistingServer).toBe(false);
      expect(run.server?.readyUrl).toContain(E2E_IDENTITY_FILE);
    }
  });

  it('uses an external URL without a local server', () => {
    const run = cli([
      'game-client',
      '--url',
      'https://www.kartuli.app/',
      '--production',
      '--debug',
    ]);
    expect(run.mode).toBe('external');
    expect(run.server).toBeNull();
    expect(run.suite).toBe('production');
    expect(run.testDir).toBe('tests/game-client/production');
    expect(run.urls.app).toBe('https://www.kartuli.app');
    expect(run.playwrightArgs).toEqual(['--debug']);
    expect(describeE2eRun(run)).toContain('Local server: not started');
  });

  it('keeps web docs production on the whole suite and its base path', () => {
    const run = cli([
      'web-docs-client',
      '--url',
      'https://kartuli-app.github.io/kartuli/',
      '--production',
    ]);
    expect(run.testDir).toBe('tests/web-docs-client');
    expect(run.urls.app).toBe('https://kartuli-app.github.io/kartuli/');
    expect(new URL('./', run.urls.app).href).toBe('https://kartuli-app.github.io/kartuli/');
  });

  it('fails fast on unknown targets, missing targets and invalid mode combinations', () => {
    expect(() => cli(['not-a-target'])).toThrow(/Unknown E2E target/);
    expect(() => cli([])).toThrow(/Missing E2E target/);
    expect(() => cli(['storybook', '--production'])).toThrow(/no production-safe suite/);
    expect(() => cli(['game-client', '--url', 'https://example.com', '--reuse-server'])).toThrow(
      /not both/,
    );
    expect(() => cli(['game-client', '--ui', '--headed'])).toThrow(/one browser mode/);
    expect(() => cli(['game-client', '--url', 'notaurl'])).toThrow(E2eConfigError);
  });

  it('mentions every target in help text', () => {
    const usage = e2eUsageText();
    for (const targetId of listE2eTargetIds()) {
      expect(usage).toContain(targetId);
    }
  });
});

describe('playwright config from a resolved run', () => {
  it('starts the matching server for a managed run and omits it for an external URL', () => {
    const managed = withServerReuse(cli(['backoffice-client']), true);
    const managedConfig = createPlaywrightConfig({
      ...selectionToEnv(selectionFromRun(managed)),
    });
    expect(managedConfig.use?.baseURL).toBe('http://localhost:3001');
    expect(managedConfig.testDir).toBe('tests/backoffice-client');
    expect(managedConfig.webServer).toMatchObject({
      command: 'pnpm --filter @kartuli/backoffice-client run preview',
      reuseExistingServer: true,
      url: `http://localhost:3001/${E2E_IDENTITY_FILE}`,
    });
    expect(managedConfig.retries).toBe(0);

    const external = cli(['game-client', '--url', 'https://preview.example', '--production']);
    const ciConfig = createPlaywrightConfig({
      ...selectionToEnv(selectionFromRun(external)),
      CI: 'true',
    });
    expect(ciConfig.webServer).toBeUndefined();
    expect(ciConfig.testDir).toBe('tests/game-client/production');
    expect(ciConfig.retries).toBe(1);
    expect(ciConfig.workers).toBe(1);
    expect(ciConfig.reporter).toEqual([
      ['github'],
      ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ]);
    expect(ciConfig.use).toMatchObject({
      baseURL: 'https://preview.example',
      trace: 'retain-on-failure-and-retries',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    });
  });

  it('rejects a direct Playwright invocation that did not select a target', () => {
    expect(() => createPlaywrightConfig({})).toThrow(/pnpm e2e <target>/);
    expect(() =>
      selectionFromEnv({
        KARTULI_E2E_TARGET: 'storybook',
        KARTULI_E2E_MODE: 'external',
        KARTULI_E2E_SUITE: 'production',
        KARTULI_E2E_URL_APP: 'http://localhost:6006',
        KARTULI_E2E_REUSE_SERVER: '1',
      }),
    ).toThrow(/do not start or reuse/);
  });
});
