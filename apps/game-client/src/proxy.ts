import {
  getPathSuffixForBareLocaleRewrite,
  getPreferredSupportedLocale,
  PREFERRED_LOCALE_KEY,
  supportedLocales,
} from '@game-client/i18n';
import { ROUTE_LOCALE_HEADER, ROUTE_PATHNAME_HEADER } from '@game-client/navigation/route-headers';
import { type NextRequest, NextResponse } from 'next/server';
import { logger } from './logging/dev-logger';

export function getPreferredLocaleFromAcceptLanguageHeader(
  request: NextRequest,
): string | undefined {
  return request.headers.get('Accept-Language')?.split(',')[0]?.split('-')[0].toLowerCase();
}

export function getPreferredLocaleFromRequestCookie(request: NextRequest): string | undefined {
  return request.cookies.get(PREFERRED_LOCALE_KEY)?.value;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestedLocale = pathname.split('/')[1];
  const supportedLocale = supportedLocales.find((locale) => locale === requestedLocale);

  if (supportedLocale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(ROUTE_LOCALE_HEADER, supportedLocale);
    requestHeaders.set(ROUTE_PATHNAME_HEADER, pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const locale = getPreferredSupportedLocale(
    getPreferredLocaleFromRequestCookie(request),
    getPreferredLocaleFromAcceptLanguageHeader(request),
  );

  const pathSuffix = getPathSuffixForBareLocaleRewrite(pathname);
  const url = new URL(request.url);
  url.pathname = pathSuffix ? `/${locale}/${pathSuffix}` : `/${locale}`;

  logger.log('proxy', `${pathname} → ${url.pathname}`);
  return NextResponse.redirect(url.toString());
}

// Matches application routes, including localized routes whose locale/path are
// forwarded to the global not-found entry, while leaving Next.js internals and
// root public assets (for example /og-image.png and /images/*) untouched.
// IMPORTANT: update the negative lookahead if root public files change.
export const config = {
  matcher: [
    // Matcher must be a string literal here — Next.js rejects non-literals (e.g. variables, String.raw).
    '/((?!_next/|favicon\\.|icon\\.|robots\\.|manifest\\.|og-image(?:\\.|$)|twitter-image(?:\\.|$)|apple-touch-icon(?:\\.|$)|browserconfig(?:\\.|$)|images(?:/|$)|fonts(?:/|$)).*)',
  ],
};
