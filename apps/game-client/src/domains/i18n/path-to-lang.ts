import type { SupportedLng } from './config';
import { supportedLngs } from './config';

/**
 * Derives the locale from the path (first segment).
 * Paths: /en, /en/debug, /ru/learn/lesson-1. Unknown segment falls back to 'en'.
 */
export function pathToLang(pathname: string): SupportedLng {
  const first = pathname.split('/').find(Boolean);
  if (first && supportedLngs.includes(first as SupportedLng)) {
    return first as SupportedLng;
  }
  return 'en';
}
