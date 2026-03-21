import type { SupportedLng } from '@game-client/i18n/supported-locales';
import { supportedLngs } from '@game-client/i18n/supported-locales';

/** `/` only, `/en/...` with explicit locale, or anything else (e.g. `/banana`). */
export type PathLocaleKind = 'root' | 'localized' | 'unlocalized';

function firstPathSegment(pathname: string): string | undefined {
  const raw = pathname.split('/').find(Boolean);
  return raw?.split(/[?#]/, 1)[0];
}

export function getPathLocaleKind(pathname: string): PathLocaleKind {
  const first = firstPathSegment(pathname);
  if (first === undefined) return 'root';
  if (supportedLngs.includes(first as SupportedLng)) return 'localized';
  return 'unlocalized';
}

/** Locale from URL only — never infer default; use for persistence guardrails. */
export function getExplicitLocaleFromPath(pathname: string): SupportedLng | null {
  const first = firstPathSegment(pathname);
  if (first && supportedLngs.includes(first as SupportedLng)) {
    return first as SupportedLng;
  }
  return null;
}

/**
 * Ensures a locale-prefixed path for the SPA. Root stays `/`. Already-localized paths unchanged.
 * Unlocalized paths become `/${preferredLocale}/${rest}`.
 */
export function normalizeUnlocalizedPath(pathname: string, preferredLocale: SupportedLng): string {
  if (pathname === '/' || pathname === '') return '/';
  if (getPathLocaleKind(pathname) === 'localized') return pathname;
  const trimmed = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  return `/${preferredLocale}/${trimmed}`;
}
