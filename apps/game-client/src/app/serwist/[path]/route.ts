import fs from 'node:fs';
import path from 'node:path';
import { createSerwistRoute } from '@serwist/turbopack';
import { NextResponse } from 'next/server';

const revision =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.CI_COMMIT_SHA ||
  crypto.randomUUID();

/** Discover font files emitted by Next (e.g. next/font) so we precache them. Needed because on first load the SW is not controlling the page yet, so the font request never goes through the SW and is not runtime-cached; precaching ensures the font is available offline after install. */
function getFontPrecacheEntries(): Array<{ url: string; revision: null }> {
  try {
    const mediaDir = path.join(process.cwd(), '.next', 'static', 'media');
    if (!fs.existsSync(mediaDir)) return [];
    const files = fs.readdirSync(mediaDir);
    return files
      .filter((f) => f.endsWith('.woff2'))
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
