import { enResources } from '@game-client/i18n/resources/resources-en';
import { expect, test } from '@playwright/test';
import { expectNoCriticalErrors } from '../../helpers/expect-no-critical-errors';

const learnHeading = enResources.learn.heading;

test.describe('Game Client Smoke Tests', () => {
  test('no critical console errors on first load', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });

  test('home placeholder and direct route loads work', async ({ page }) => {
    await page.goto('/en');

    await expect(page.getByRole('heading', { name: 'Kartuli is in cleanup mode' })).toBeVisible();

    await page.goto('/en/learn');
    await expect(page.getByRole('heading', { name: learnHeading })).toBeVisible();
  });
});
