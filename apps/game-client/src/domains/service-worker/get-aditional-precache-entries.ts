/**
 * Build-time list of URLs the service worker should precache when it installs.
 * Used by the Serwist route to build the SW manifest.
 *
 * Revision behaviour:
 * - For stable URLs (/, /en, /ru, /~offline, /icon.svg, /favicon.ico) we set a revision. The SW uses it
 *   to know when to re-fetch: when the manifest changes (new deploy), revision changes, so we
 *   update the cache and avoid serving stale content at the same URL.
 * - For fonts we use revision: null. Next emits hashed filenames (e.g. .../media/font-abc123.woff2),
 *   so the URL itself changes per build. Cache is keyed by URL; no extra revision needed.
 *
 * Shell locales (/, /en, /ru, …) come from supportedLngs so adding a new language only requires
 * updating that list; precache and SW fetch logic stay in sync.
 */

import fs from 'node:fs';
import path from 'node:path';
import { supportedLngs } from '../i18n/supported-locales';

/** Revision string for cache invalidation: package version + short git SHA (or random if no SHA). New build => new revision => SW re-fetches these URLs. */
function getRevision() {
  const sha =
    process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || process.env.CI_COMMIT_SHA || '';
  const shortSha =
    sha.length >= 8
      ? sha.substring(0, 8)
      : sha || crypto.randomUUID().replaceAll('-', '').substring(0, 8);
  const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')) as {
    version: string;
  };
  const revision = pkg.version ? `${pkg.version}-${shortSha}` : shortSha;
  return revision;
}

/** Font file extensions emitted by Next (next/font) or other sources. We precache all so any format the build outputs is available offline. */
const FONT_EXTENSIONS = ['.woff2', '.woff', '.ttf', '.otf'];

/**
 * Find font files in .next/static/media and return precache entries.
 * We use revision: null because Next gives each font a unique URL (hash in filename). The URL is
 * the cache key; when the build changes, the font URL changes, so we don't need a revision.
 * Precaching is needed because on first load the SW may not control the page yet, so font requests
 * might not go through the SW; putting them in the manifest guarantees they're available offline.
 */
function getFontPrecacheEntries(): Array<{ url: string; revision: null }> {
  try {
    const mediaDir = path.join(process.cwd(), '.next', 'static', 'media');
    if (!fs.existsSync(mediaDir)) return [];
    const files = fs.readdirSync(mediaDir);
    return files
      .filter((f) => FONT_EXTENSIONS.some((ext) => f.endsWith(ext)))
      .map((f) => ({ url: `/_next/static/media/${f}`, revision: null }));
  } catch {
    return [];
  }
}

/**
 * All URLs to precache: app shell, offline fallback, icons, and discovered fonts.
 * The four entries below use a revision so that on each deploy the SW re-fetches them and we
 * don't serve stale content (same URL, new body). Font entries use revision: null (URL is enough).
 *
 * Why these need a revision:
 * - /: Root shell. Served offline so the app loads and I18nShell can redirect to preferred locale from localStorage.
 * - /:lang (from supportedLngs): App shell per locale. Served for /:lang and /:lang/* offline.
 * - /~offline: Offline fallback page.
 * - /icon.svg, /favicon.ico: Same URLs; revision so icon/favicon updates are picked up after deploy.
 */
export const getAdditionalPrecacheEntries = () => {
  const revision = getRevision();
  const fontEntries = getFontPrecacheEntries();
  const shellLocaleEntries = supportedLngs.map((lang) => ({ url: `/${lang}`, revision }));
  return [
    { url: '/', revision },
    ...shellLocaleEntries,
    { url: '/~offline', revision },
    { url: '/icon.svg', revision },
    { url: '/favicon.ico', revision },
    ...fontEntries,
  ];
};
