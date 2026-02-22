import type { Page } from '@playwright/test';

/**
 * If VERCEL_PROTECTION_BYPASS_SECRET is set, add the header so requests can hit
 * Vercel deployment-protected preview URLs. No-op when the env var is unset (e.g. local).
 */
export async function applyVercelProtectionBypass(page: Page): Promise<void> {
  const bypassSecret = process.env.VERCEL_PROTECTION_BYPASS_SECRET;
  if (bypassSecret) {
    await page.setExtraHTTPHeaders({
      'x-vercel-protection-bypass': bypassSecret,
    });
  }
}
