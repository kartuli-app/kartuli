import { defaultLocale, type SupportedLocale, supportedLocales } from './i18n-constants';

export function getCurrentSupportedLocale(
  resolvedLanguage: string | undefined,
  fallbackLocale: SupportedLocale = supportedLocales[0],
): SupportedLocale {
  return (
    supportedLocales.find(
      (locale) => resolvedLanguage === locale || resolvedLanguage?.startsWith(`${locale}-`),
    ) ?? fallbackLocale
  );
}

/**
 * Resolves the preferred supported locale from available signals.
 * Priority: explicit cookie → Accept-Language primary subtag → defaultLocale.
 */
export function getPreferredSupportedLocale(
  cookie?: string,
  acceptLanguage?: string,
): SupportedLocale {
  if (cookie && supportedLocales.includes(cookie as SupportedLocale)) {
    return cookie as SupportedLocale;
  }
  if (acceptLanguage) {
    const primary = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase();
    if (primary && supportedLocales.includes(primary as SupportedLocale)) {
      return primary as SupportedLocale;
    }
  }
  return defaultLocale;
}

/**
 * Path tail for bare URLs handled by the edge proxy: everything that should appear
 * after `/${preferredLocale}/` when the request path does not already start with a
 * supported locale (en/ru).
 *
 * - `/` → `""`
 * - `/de/settings` → `"settings"` (strip a single two-letter unsupported prefix)
 * - `/de` → `""`
 * - `/settings` → `"settings"` (no locale prefix — keep full suffix)
 */
export function getPathSuffixForBareLocaleRewrite(pathname: string): string {
  const tokens = pathname.split('/').filter(Boolean);
  if (tokens.length === 0) {
    return '';
  }
  const first = tokens[0];
  if (supportedLocales.includes(first as SupportedLocale)) {
    return tokens.slice(1).join('/');
  }
  const looksLikeTwoLetterLang = /^[a-z]{2}$/i.test(first);
  if (looksLikeTwoLetterLang && tokens.length >= 2) {
    return tokens.slice(1).join('/');
  }
  if (looksLikeTwoLetterLang && tokens.length === 1) {
    return '';
  }
  return tokens.join('/');
}

export function getLocalizedPathnameForLocale(path: string, newLocale: SupportedLocale): string {
  const queryStart = path.indexOf('?');
  const hashStart = path.indexOf('#');
  let suffixStart = path.length;

  if (queryStart >= 0) {
    suffixStart = queryStart;
  } else if (hashStart >= 0) {
    suffixStart = hashStart;
  }

  const pathOnly = path.slice(0, suffixStart);
  const suffix = path.slice(suffixStart);
  const segments = pathOnly.split('/').filter(Boolean);
  const first = segments[0];

  if (first && supportedLocales.includes(first as SupportedLocale)) {
    const rest = segments.slice(1);
    const basePath = rest.length > 0 ? `/${newLocale}/${rest.join('/')}` : `/${newLocale}`;
    return basePath + suffix;
  }

  const trimmed = pathOnly.startsWith('/') ? pathOnly.slice(1) : pathOnly;
  const basePath = trimmed ? `/${newLocale}/${trimmed}` : `/${newLocale}`;
  return basePath + suffix;
}
