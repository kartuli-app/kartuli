import { type SupportedLocale, supportedLocales } from './i18n-constants';

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
