import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';

function isSupportedLang(lang: string): lang is SupportedLng {
  return (supportedLngs as readonly string[]).includes(lang);
}

export type ViewType = 'home' | 'learn' | 'game' | 'user' | 'debug';

export interface RouteResult {
  view: ViewType;
  lessonId?: string;
}

/**
 * Parses pathname into view and optional lessonId.
 * Expects a **localized** path (first segment is a supported locale). Call after normalization.
 */
export function parseAppRoute(pathname: string): RouteResult | null {
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
