/**
 * Serwist route: builds and serves the service worker at /serwist/[path] (e.g. /serwist/sw.js).
 *
 * At build time this route:
 * - Compiles the SW source (service-worker.ts) with esbuild
 * - Injects the precache manifest (URLs + revisions) from additionalPrecacheEntries
 * - Serves the compiled SW script when requested
 *
 * In development we return 404 so no SW is registered and local changes are always visible.
 */

import { createSerwistRoute } from '@serwist/turbopack';
import { NextResponse } from 'next/server';
import { getAdditionalPrecacheEntries } from '../../../domains/service-worker/get-aditional-precache-entries';
import { SERVICE_WORKER_SOURCE_URL } from '../../../domains/service-worker/service-worker-source-url';

const serwistRoute = createSerwistRoute({
  /** Shell pages, offline fallback, icons, and fonts to cache when the SW installs. */
  additionalPrecacheEntries: getAdditionalPrecacheEntries(),
  /** Path to the SW source file (compiled at build time). */
  swSrc: SERVICE_WORKER_SOURCE_URL,
  useNativeEsbuild: true,
});

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;
export const generateStaticParams = serwistRoute.generateStaticParams;

/** Serve the compiled SW script, or 404 in development so the app runs without a SW. */
export async function GET(request: Request, context: { params: Promise<{ path: string }> }) {
  if (process.env.NODE_ENV === 'development') {
    return new NextResponse(
      JSON.stringify({
        message: 'Service worker is not available in development',
      }),
      { status: 404 },
    );
  }
  return serwistRoute.GET(request, context);
}
