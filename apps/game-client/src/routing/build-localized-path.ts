import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';

function isLocaleSegment(seg: string): seg is SupportedLng {
  return (supportedLngs as readonly string[]).includes(seg);
}

/**
 * Builds a path with `nextLang` as the first segment.
 * If the path already starts with a supported locale, that segment is **replaced** and the rest is kept.
 * If not (unlocalized path), the full path suffix is preserved under the new locale (`/learn/x` + `ru` → `/ru/learn/x`).
 */
export function buildLocalizedPath(pathname: string, nextLang: SupportedLng): string {
  const pathOnly = pathname.split(/[?#]/)[0] ?? '';
  const segments = pathOnly.split('/').filter(Boolean);
  const first = segments[0];
  if (first && isLocaleSegment(first)) {
    const rest = segments.slice(1);
    return rest.length > 0 ? `/${nextLang}/${rest.join('/')}` : `/${nextLang}`;
  }
  const trimmed = pathOnly.startsWith('/') ? pathOnly.slice(1) : pathOnly;
  return trimmed ? `/${nextLang}/${trimmed}` : `/${nextLang}`;
}
