import {
  getPathSuffixForBareLocaleRewrite,
  getPreferredSupportedLocale,
  PREFERRED_LOCALE_KEY,
} from '@game-client/i18n';
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

// Matches / and any path whose first segment is not a supported locale or Next.js internal.
// IMPORTANT: update the negative lookahead here if supported locales change.
export const config = {
  matcher: ['/((?!en(?:/|$)|ru(?:/|$)|_next/|favicon\\.|icon\\.|robots\\.|manifest\\.).*)'],
};
