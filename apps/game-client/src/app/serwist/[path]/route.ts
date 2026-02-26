import { createSerwistRoute } from '@serwist/turbopack';
import { NextResponse } from 'next/server';

const revision =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.GITHUB_SHA ??
  process.env.CI_COMMIT_SHA ??
  crypto.randomUUID();

const serwistRoute = createSerwistRoute({
  additionalPrecacheEntries: [
    { url: '/en', revision },
    { url: '/~offline', revision },
    { url: '/icon.svg', revision },
    { url: '/favicon.ico', revision },
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
