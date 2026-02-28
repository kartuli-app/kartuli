const SUPPORTED_LANGS = ['en', 'ru'] as const;

export type ViewType = 'home' | 'learn' | 'game' | 'user' | 'debug';

export interface RouteResult {
  view: ViewType;
  lessonId?: string;
}

/**
 * Parses pathname into view and optional lessonId.
 * Paths: /en, /ru, /en/debug, /ru/user, /en/learn/:lessonId, /ru/game/:lessonId
 * First segment must be a supported locale (en, ru). Uses split/filter instead of regex to avoid ReDoS risk.
 */
export function parseRoute(pathname: string): RouteResult | null {
  const segments = pathname.split('/').filter((s) => s !== '');
  if (!segments[0] || !SUPPORTED_LANGS.includes(segments[0] as (typeof SUPPORTED_LANGS)[number]))
    return null;
  if (segments.length === 1) return { view: 'home' };
  if (segments[1] === 'debug' && segments.length === 2) return { view: 'debug' };
  if (segments[1] === 'user' && segments.length === 2) return { view: 'user' };
  if (segments[1] === 'learn' && segments[2]) return { view: 'learn', lessonId: segments[2] };
  if (segments[1] === 'game' && segments[2]) return { view: 'game', lessonId: segments[2] };
  return null;
}
