import { type NextRequest, NextResponse } from 'next/server';
import { defaultLng } from './i18n/default-locale';
import { type SupportedLng, supportedLngs } from './i18n/supported-locales';

// Get the preferred locale, similar to the above or using a library
function getPreferredLocaleFromAcceptLanguageHeader(request: NextRequest) {
  const acceptedLocale: string | undefined = request.headers
    .get('accept-language')
    ?.split(',')[0]
    ?.split('-')[0];
  if (acceptedLocale && supportedLngs.includes(acceptedLocale as SupportedLng)) {
    return acceptedLocale as SupportedLng;
  }
  return undefined;
}

function getPreferredLocaleFromCookie(request: NextRequest) {
  const cookie = request.cookies.get('preferred-locale');
  if (cookie && supportedLngs.includes(cookie.value as SupportedLng)) {
    return cookie.value as SupportedLng;
  }
  return undefined;
}

export function proxy(request: NextRequest) {
  const supportedLocale =
    getPreferredLocaleFromAcceptLanguageHeader(request) ?? getPreferredLocaleFromCookie(request);
  // if supported locale, continue
  if (supportedLocale) {
    return NextResponse.next();
  }
  // redirect to default locale
  const urlToRedirectTo = new URL(`/${defaultLng}`, request.url);
  return NextResponse.redirect(urlToRedirectTo);
}

// we only want to run this proxy on the root (/) URL
export const config = {
  matcher: ['/'],
};
