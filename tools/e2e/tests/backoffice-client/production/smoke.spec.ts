import { test } from '@playwright/test';
import { applyVercelProtectionBypass } from '../../helpers/apply-vercel-protection-bypass';
import { expectDebugPageStructure } from '../../helpers/expect-debug-page';
import { expectNoCriticalErrors } from '../../helpers/expect-no-critical-errors';

test.describe('Backoffice Client Smoke Tests', () => {
  test('debug page has minimal structure', async ({ page }) => {
    await applyVercelProtectionBypass(page);
    await expectDebugPageStructure(page, {
      path: '/debug',
      heading: /🔧 Debug Info/,
      appLabel: 'App: @kartuli/backoffice-client',
      testId: 'backoffice-debug',
    });
  });

  test('no critical console errors on first load', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });
});
