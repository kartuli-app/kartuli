import { expect, test } from '@playwright/test';
import { expectNoCriticalErrors } from '../../helpers/expect-no-critical-errors';

test.describe('Backoffice Client Smoke Tests', () => {
  test('home page has minimal structure', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('backoffice-home')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'kartuli.app' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Backoffice' })).toBeVisible();
  });

  test('no critical console errors on first load', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });
});
