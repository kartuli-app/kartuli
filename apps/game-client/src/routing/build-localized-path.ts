import type { SupportedLng } from '@game-client/i18n/supported-locales';

/**
 * Switches the locale segment of a **localized** pathname, preserving the rest.
 */
export function buildLocalizedPath(pathname: string, nextLang: SupportedLng): string {
  const segments = pathname.split('/').filter(Boolean);
  const rest = segments.slice(1);
  return rest.length > 0 ? `/${nextLang}/${rest.join('/')}` : `/${nextLang}`;
}
