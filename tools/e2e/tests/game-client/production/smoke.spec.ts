import { expect, test } from '@playwright/test';
import { expectNoCriticalErrors } from '../../helpers/expect-no-critical-errors';
import { getFirstLessonFixtureEn } from '../../helpers/first-lesson-fixture';

const { firstLessonTitleEn } = await getFirstLessonFixtureEn();

test.describe('Game Client Smoke Tests', () => {
  test('no critical console errors on first load', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });

  test('clicking a home letter item keeps user on home', async ({ page }) => {
    await page.goto('/en');

    await expect(page.getByRole('heading', { name: /გამარჯობა /i })).toBeVisible();

    const firstLessonCard = page.locator('div').filter({
      has: page.getByText(firstLessonTitleEn, { exact: true }),
    });
    const letterItemButton = firstLessonCard.getByRole('button').first();

    await expect(letterItemButton).toBeVisible();
    await letterItemButton.click();

    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(page.getByRole('link', { name: /Back/i })).toHaveCount(0);
  });
});
