import { test } from '@playwright/test';
import { expectDebugPageStructure } from '../../helpers/expect-debug-page';
import { expectNoCriticalErrors } from '../../helpers/expect-no-critical-errors';

test.describe('Backoffice Client Smoke Tests', () => {
  test('debug page has minimal structure', async ({ page }) => {
    await expectDebugPageStructure(page, {
      path: '/debug',
      heading: /🔧 Debug Info/,
      appLabel: 'App: @kartuli/backoffice-client',
    });
  });

  test('no critical console errors on first load', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });
});
