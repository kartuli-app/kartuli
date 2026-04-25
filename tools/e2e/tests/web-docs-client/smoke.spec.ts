import { expect, type Page, test } from '@playwright/test';
import { expectNoCriticalErrors } from '../helpers/expect-no-critical-errors';

type HeaderNavLink = {
  text: string;
  href: string;
  target: string | null;
};

function isSkippableHref(href: string): boolean {
  return (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('javascript:')
  );
}

async function getHeaderNavLinks(page: Page): Promise<HeaderNavLink[]> {
  const nav = page.locator('header nav').first();
  await expect(nav).toBeVisible({ timeout: 10000 });

  return nav.locator('a[href]').evaluateAll((anchors) => {
    const isVisible = (element: Element): boolean => {
      const asHtml = element as HTMLElement;
      const style = globalThis.getComputedStyle(asHtml);
      return (
        style.visibility !== 'hidden' && style.display !== 'none' && asHtml.offsetParent !== null
      );
    };

    return anchors
      .filter((anchor) => {
        const href = anchor.getAttribute('href');
        return Boolean(href) && isVisible(anchor);
      })
      .map((anchor) => ({
        text: anchor.textContent?.trim() ?? '',
        href: anchor.getAttribute('href') ?? '',
        target: anchor.getAttribute('target'),
      }));
  });
}

test.describe('Web Docs Client Smoke Tests', () => {
  test('loads without critical console errors', async ({ page }) => {
    await expectNoCriticalErrors(page);
  });

  test('all header nav links resolve and load without critical errors', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const links = await getHeaderNavLinks(page);
    expect(links.length).toBeGreaterThan(0);

    const seen = new Set<string>();
    const uniqueLinks = links.filter((link) => {
      if (isSkippableHref(link.href)) {
        return false;
      }
      if (seen.has(link.href)) {
        return false;
      }
      seen.add(link.href);
      return true;
    });

    expect(uniqueLinks.length).toBeGreaterThan(0);

    for (const link of uniqueLinks) {
      await test.step(`header link: ${link.text || link.href}`, async () => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        const nav = page.locator('header nav').first();
        await expect(nav).toBeVisible({ timeout: 10000 });

        const locator = nav.locator(`a[href="${link.href}"]`).first();
        await expect(locator).toBeVisible({ timeout: 10000 });

        const currentUrl = page.url();
        const expectedUrl = new URL(link.href, currentUrl);
        const isSameTab = link.target !== '_blank';

        if (isSameTab) {
          const navigation = page
            .waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 })
            .catch(() => null);
          await locator.click();
          const response = await navigation;
          if (response) {
            expect(response.status()).toBeLessThan(400);
          }

          await expect(page).toHaveURL((url) => {
            return (
              url.origin === expectedUrl.origin &&
              url.pathname === expectedUrl.pathname &&
              url.search === expectedUrl.search
            );
          });

          await page.waitForLoadState('networkidle');
          await expectNoCriticalErrors(page, {
            path: `${expectedUrl.pathname}${expectedUrl.search}`,
          });
        } else {
          const popupPromise = page.context().waitForEvent('page', { timeout: 10000 });
          await locator.click();
          const popup = await popupPromise;
          await popup.waitForLoadState('domcontentloaded');
          expect(popup.url()).toContain(expectedUrl.href);
          await popup.close();
        }
      });
    }
  });

  test('llms.txt is present in header nav and has expected structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const nav = page.locator('header nav').first();
    await expect(nav).toBeVisible({ timeout: 10000 });

    const llmsLink = nav.getByRole('link', { name: 'llms.txt' }).first();
    await expect(llmsLink).toBeVisible({ timeout: 10000 });

    const llmsHref = await llmsLink.getAttribute('href');
    expect(llmsHref).toBeTruthy();

    const navigation = page
      .waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 })
      .catch(() => null);
    await llmsLink.click();
    const response = await navigation;
    if (response) {
      expect(response.status()).toBeLessThan(400);
    }

    const llmsUrl = new URL(llmsHref ?? '', page.url()).toString();
    await expect(page).toHaveURL(
      (url) => url.pathname.endsWith('.txt') || url.pathname.includes('/assets/'),
    );

    const llmsResponse = await page.request.get(llmsUrl);
    expect(llmsResponse.ok()).toBeTruthy();

    const contentType = llmsResponse.headers()['content-type'] ?? '';
    expect(contentType).toContain('text/plain');

    const text = (await llmsResponse.text()).trim();
    expect(text.length).toBeGreaterThan(200);

    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    expect(lines.length).toBeGreaterThan(10);
    expect(text).toMatch(/kartuli/i);
    expect(text).toMatch(/https?:\/\//i);
  });
});
