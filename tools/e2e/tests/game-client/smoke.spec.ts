import { expect, test } from '@playwright/test';

test.describe('Game Client Smoke Tests', () => {
  test('app boots and redirects to freestyle page', async ({ page }) => {
    // Set Vercel protection bypass header if available
    const bypassSecret = process.env.VERCEL_PROTECTION_BYPASS_SECRET;
    if (bypassSecret) {
      await page.setExtraHTTPHeaders({
        'x-vercel-protection-bypass': bypassSecret,
      });
    }

    // Navigate to the game client root
    await page.goto('/');

    // Wait for redirect to /app/freestyle
    await page.waitForURL('**/app/freestyle', { timeout: 10000 });

    // Verify we're on the freestyle page by checking for module content
    // The freestyle page should show modules and lessons
    // Use getByRole to be more specific and avoid matching "Personalized to master the alphabet" text
    await expect(page.getByRole('heading', { name: 'Alphabet' })).toBeVisible({
      timeout: 10000,
    });

    // Verify at least one lesson is visible (e.g., "The Five Vowels")
    // Use getByRole to be specific and avoid strict mode violations
    await expect(page.getByRole('heading', { name: 'The Five Vowels' })).toBeVisible();
  });

  test('no critical console errors on first load', async ({ page }) => {
    const consoleErrors: string[] = [];

    // Listen for console events
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Set Vercel protection bypass header if available
    const bypassSecret = process.env.VERCEL_PROTECTION_BYPASS_SECRET;
    if (bypassSecret) {
      await page.setExtraHTTPHeaders({
        'x-vercel-protection-bypass': bypassSecret,
      });
    }

    // Navigate to the game client
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Filter out expected/acceptable errors
    const criticalErrors = consoleErrors.filter((error) => {
      // Ignore authentication/authorization errors (common in preview deployments)
      if (error.includes('401') || error.includes('403')) return false;
      // Ignore provider account errors (common in preview deployments)
      if (error.includes("Provider's accounts list is empty")) return false;
      // Ignore resource loading errors for external services
      if (error.includes('Failed to load resource')) return false;
      // All other errors are considered critical
      return true;
    });

    // Assert no critical console errors occurred
    expect(criticalErrors).toHaveLength(0);
  });
});
