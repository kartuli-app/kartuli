import { type SupportedLocale, supportedLocales } from '@game-client/i18n/i18n-constants';

function normalizePathname(pathname: string): string {
  if (pathname === '' || pathname === '/') {
    return '/';
  }
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export type SplitLocalizedPathname = Readonly<{
  locale: SupportedLocale | null;
  /** Path without the leading locale segment (always starts with `/`, or `/` for locale-only URLs). */
  pathname: string;
  /** Full path as seen in the address bar / `usePathname()`, including locale when present. */
  localizedPathname: string;
}>;

export function splitLocalizedPathname(localizedPathname: string): SplitLocalizedPathname {
  const localized = normalizePathname(localizedPathname);
  const segments = localized.split('/').filter(Boolean);
  const first = segments[0];
  if (first && supportedLocales.includes(first as SupportedLocale)) {
    const rest = segments.slice(1);
    const pathname = rest.length > 0 ? `/${rest.join('/')}` : '/';
    return {
      locale: first as SupportedLocale,
      pathname,
      localizedPathname: localized,
    };
  }
  return {
    locale: null,
    pathname: localized,
    localizedPathname: localized,
  };
}
