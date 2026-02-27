import fs from 'node:fs';
import path from 'node:path';
import { createSerwistRoute } from '@serwist/turbopack';
import { NextResponse } from 'next/server';

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

/** Font file extensions emitted by Next (next/font) or other sources. Next typically emits only .woff2; we include others so any format the build outputs is precached. The CSS @font-face tells each browser which format to request; we precache whatever exists so all browsers work offline. */
const FONT_EXTENSIONS = ['.woff2', '.woff', '.ttf', '.otf'];

/** Discover font files in .next/static/media so we precache them. Needed because on first load the SW is not controlling the page yet, so the font request never goes through the SW; precaching ensures fonts are available offline after install. */
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

const fontEntries = getFontPrecacheEntries();

const serwistRoute = createSerwistRoute({
  additionalPrecacheEntries: [
    { url: '/en', revision },
    { url: '/~offline', revision },
    { url: '/icon.svg', revision },
    { url: '/favicon.ico', revision },
    ...fontEntries,
  ],
  swSrc: 'src/app/sw.ts',
  useNativeEsbuild: true,
});

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;
export const generateStaticParams = serwistRoute.generateStaticParams;

// In development, do not serve a real SW (per plan: dev disabled).
export async function GET(request: Request, context: { params: Promise<{ path: string }> }) {
  if (process.env.NODE_ENV === 'development') {
    return new NextResponse(null, { status: 404 });
  }
  return serwistRoute.GET(request, context);
}
