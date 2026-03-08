import { defaultLng } from '@game-client/i18n/default-locale';
import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';

/**
 * Derives the locale from the path (first segment).
 * Paths: /en, /en/debug, /ru/learn/lesson-1. Unknown segment falls back to 'en'.
 */
export function pathToLang(pathname: string): SupportedLng {
  const firstRaw = pathname.split('/').find(Boolean);
  const first = firstRaw?.split(/[?#]/, 1)[0];
  if (first && supportedLngs.includes(first as SupportedLng)) {
    return first as SupportedLng;
  }
  return defaultLng;
}
