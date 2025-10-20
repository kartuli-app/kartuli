import { expect, test } from '@playwright/test';

test.describe('Game Client Smoke Tests', () => {
  test('app boots and shows game home', async ({ page }) => {
    // Navigate to the game client
    await page.goto('/');

    // Wait for the main heading to be visible
    await expect(page.getByRole('heading', { name: 'Game Client' })).toBeVisible();

    // Assert the heading is within the viewport
    const heading = page.getByRole('heading', { name: 'Game Client' });
    await expect(heading).toBeInViewport();

    // Check for the stable test selector
    await expect(page.getByTestId('game-home')).toBeVisible();
  });

  test('no console errors on first load', async ({ page }) => {
    const consoleErrors: string[] = [];

    // Listen for console events
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate to the game client
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Assert no console errors occurred
    expect(consoleErrors).toHaveLength(0);
  });
});
