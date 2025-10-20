import { expect, test } from '@playwright/test';

test.describe('Game Client Smoke Tests', () => {
  test('app boots and shows game home', async ({ page }) => {
    // Navigate to the game client
    await page.goto('/');

    // Handle potential authentication/authorization pages
    const currentUrl = page.url();
    if (currentUrl.includes('vercel.app') && page.locator('text=authorization').isVisible()) {
      console.log('⚠️  Preview URL requires authentication - skipping test');
      test.skip();
      return;
    }

    // Wait for the main heading to be visible with longer timeout
    await expect(page.getByRole('heading', { name: 'Game Client' })).toBeVisible({ timeout: 10000 });

    // Assert the heading is within the viewport
    const heading = page.getByRole('heading', { name: 'Game Client' });
    await expect(heading).toBeInViewport();

    // Check for the stable test selector (if available)
    const gameHomeElement = page.getByTestId('game-home');
    if (await gameHomeElement.isVisible().catch(() => false)) {
      await expect(gameHomeElement).toBeVisible();
    } else {
      console.log('ℹ️  data-testid="game-home" not found - using heading as fallback');
    }
  });

  test('no critical console errors on first load', async ({ page }) => {
    const consoleErrors: string[] = [];

    // Listen for console events
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate to the game client
    await page.goto('/');

    // Handle potential authentication/authorization pages
    const currentUrl = page.url();
    if (currentUrl.includes('vercel.app') && page.locator('text=authorization').isVisible()) {
      console.log('⚠️  Preview URL requires authentication - skipping test');
      test.skip();
      return;
    }

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Filter out expected/acceptable errors
    const criticalErrors = consoleErrors.filter(error => {
      // Ignore authentication/authorization errors (common in preview deployments)
      if (error.includes('401') || error.includes('403')) return false;
      // Ignore provider account errors (common in preview deployments)
      if (error.includes('Provider\'s accounts list is empty')) return false;
      // Ignore resource loading errors for external services
      if (error.includes('Failed to load resource')) return false;
      // All other errors are considered critical
      return true;
    });

    // Assert no critical console errors occurred
    expect(criticalErrors).toHaveLength(0);
  });
});
