import {
  defaultLocale,
  PREFERRED_LOCALE_KEY,
  type SupportedLocale,
  supportedLocales,
} from '@game-client/i18n';
import { type NextRequest, NextResponse } from 'next/server';
import { logger } from './logging/dev-logger';

// Get the preferred locale, from the accept-language header
export function getPreferredLocaleFromAcceptLanguageHeader(
  request: NextRequest,
): string | undefined {
  return request.headers.get('Accept-Language')?.split(',')[0]?.split('-')[0].toLowerCase();
}

// Get the preferred locale, from the request cookie
export function getPreferredLocaleFromRequestCookie(request: NextRequest): string | undefined {
  return request.cookies.get(PREFERRED_LOCALE_KEY)?.value;
}

function getLocalizedUrlForRedirect(locale: string, url: string): string {
  const localizedUrl = new URL(url);
  localizedUrl.pathname = `/${locale}`;
  return localizedUrl.toString();
}

export function getLocalizedRootUrl(request: NextRequest) {
  logger.log('proxy', `request for url: ${request.url}`);
  // check if supported locale is in cookie
  const preferredLocaleFromCookie = getPreferredLocaleFromRequestCookie(request);
  if (
    preferredLocaleFromCookie &&
    supportedLocales.includes(preferredLocaleFromCookie as SupportedLocale)
  ) {
    const urlToRedirectTo = getLocalizedUrlForRedirect(preferredLocaleFromCookie, request.url);
    logger.log('proxy', `found preferred locale in cookie, redirecting to: ${urlToRedirectTo}`);
    return NextResponse.redirect(urlToRedirectTo);
  }
  // check if supported locale is in accept-language header
  const preferredLocaleFromAcceptLanguageHeader =
    getPreferredLocaleFromAcceptLanguageHeader(request);
  if (
    preferredLocaleFromAcceptLanguageHeader &&
    supportedLocales.includes(preferredLocaleFromAcceptLanguageHeader as SupportedLocale)
  ) {
    const urlToRedirectTo = getLocalizedUrlForRedirect(
      preferredLocaleFromAcceptLanguageHeader,
      request.url,
    );
    logger.log(
      'proxy',
      `found preferred locale in accept-language header, redirecting to: ${urlToRedirectTo}`,
    );
    return NextResponse.redirect(urlToRedirectTo);
  }
  // redirect to default locale
  const urlToRedirectTo = getLocalizedUrlForRedirect(defaultLocale, request.url);
  logger.log(
    'proxy',
    `no preferred locale found, redirecting to default locale: ${urlToRedirectTo}`,
  );
  return NextResponse.redirect(urlToRedirectTo);
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return getLocalizedRootUrl(request);
  }
  return NextResponse.next();
}

// we only want to run this proxy on the root (/) URL
export const config = {
  matcher: ['/'],
};
