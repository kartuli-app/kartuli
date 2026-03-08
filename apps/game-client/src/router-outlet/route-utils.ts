const SUPPORTED_LANGS = ['en', 'ru'] as const;

type SupportedLang = (typeof SUPPORTED_LANGS)[number];

function isSupportedLang(lang: string): lang is SupportedLang {
  return (SUPPORTED_LANGS as readonly string[]).includes(lang);
}

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
  if (!segments[0] || !isSupportedLang(segments[0])) return null;
  if (segments.length === 1) return { view: 'home' };
  if (segments[1] === 'debug' && segments.length === 2) return { view: 'debug' };
  if (segments[1] === 'user' && segments.length === 2) return { view: 'user' };
  if (segments[1] === 'learn' && segments.length === 3 && segments[2])
    return { view: 'learn', lessonId: segments[2] };
  if (segments[1] === 'game' && segments.length === 3 && segments[2])
    return { view: 'game', lessonId: segments[2] };
  return null;
}
