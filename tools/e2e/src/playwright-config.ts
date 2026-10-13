import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { repoRoot } from './paths.ts';
import { selectionFromEnv } from './runner-env.ts';
import { getE2eTarget } from './targets.ts';
import { identityUrlForBase } from './urls.ts';

function isCi(env: Record<string, string | undefined>): boolean {
  return env.CI === 'true' || env.CI === '1';
}

export function createPlaywrightConfig(
  env: Record<string, string | undefined>,
): PlaywrightTestConfig {
  const selection = selectionFromEnv(env);
  const target = getE2eTarget(selection.targetId);
  const ci = isCi(env);
  const htmlReport = {
    open: ci ? ('never' as const) : ('on-failure' as const),
    outputFolder: 'playwright-report',
  };

  return {
    testDir: selection.testDir,
    fullyParallel: true,
    forbidOnly: ci,
    retries: ci ? 1 : 0,
    workers: ci ? 1 : undefined,
    reporter: ci ? [['github'], ['html', htmlReport]] : [['list'], ['html', htmlReport]],
    outputDir: 'test-results',
    globalSetup: './src/global-setup.ts',
    timeout: 30_000,
    expect: {
      timeout: 5_000,
    },
    use: {
      baseURL: selection.appUrl,
      trace: 'retain-on-failure-and-retries',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    },
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
    ],
    webServer:
      selection.mode === 'managed-local'
        ? {
            command: target.serverCommand,
            cwd: repoRoot,
            url: identityUrlForBase(selection.appUrl),
            reuseExistingServer: selection.reuseServer,
            timeout: target.serverTimeoutMs,
            stdout: 'pipe',
            stderr: 'pipe',
          }
        : undefined,
  };
}
