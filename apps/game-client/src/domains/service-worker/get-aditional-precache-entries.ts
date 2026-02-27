/**
 * Build-time list of URLs the service worker should precache when it installs.
 * Used by the Serwist route to build the SW manifest. Each entry has a revision so the SW
 * knows when to update the cache (revision changes = new deploy).
 */

import fs from 'node:fs';
import path from 'node:path';

/** Revision string for cache invalidation: package version + short git SHA (or random if no SHA). */
function getRevision() {
  const sha =
    process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || process.env.CI_COMMIT_SHA || '';
  const shortSha =
    sha.length >= 8
      ? sha.substring(0, 8)
      : sha || crypto.randomUUID().replace(/-/g, '').substring(0, 8);
  const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')) as {
    version: string;
  };
  const revision = pkg.version ? `${pkg.version}-${shortSha}` : shortSha;
  return revision;
}

/** Font file extensions emitted by Next (next/font) or other sources. We precache all so any format the build outputs is available offline. */
const FONT_EXTENSIONS = ['.woff2', '.woff', '.ttf', '.otf'];

/** Find font files in .next/static/media and return precache entries. On first load the SW is not controlling the page yet, so font requests may not go through the SW; precaching guarantees fonts work offline after install. */
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

/** All URLs to precache: app shell, offline fallback, icons, and discovered fonts. */
export const getAdditionalPrecacheEntries = () => {
  const revision = getRevision();
  const fontEntries = getFontPrecacheEntries();
  return [
    { url: '/en', revision },
    { url: '/~offline', revision },
    { url: '/icon.svg', revision },
    { url: '/favicon.ico', revision },
    ...fontEntries,
  ];
};
