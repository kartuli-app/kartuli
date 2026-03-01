'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouterContext } from '../app-shell/use-router-context';
import { setDocumentLang } from '../utils/browser';
import { type SupportedLng, supportedLngs } from './config';
import { I18nProvider } from './I18nProvider';
import { pathToLang } from './path-to-lang';

export const PREFERRED_LOCALE_KEY = 'preferredLocale';

function getPreferredLocale(): SupportedLng {
  if (typeof localStorage === 'undefined') return 'en';
  const stored = localStorage.getItem(PREFERRED_LOCALE_KEY);
  if (stored && supportedLngs.includes(stored as SupportedLng)) {
    return stored as SupportedLng;
  }
  return 'en';
}

interface I18nShellProps {
  readonly children: ReactNode;
}

export function I18nShell({ children }: I18nShellProps) {
  const { path, navigate, hasSyncedFromUrl } = useRouterContext();
  const lang = pathToLang(path);

  useEffect(() => {
    if (!hasSyncedFromUrl) return;
    setDocumentLang(lang);
  }, [lang, hasSyncedFromUrl]);

  // When user visits /, redirect to preferred locale (no middleware)
  useEffect(() => {
    if (!hasSyncedFromUrl || path !== '/') return;
    const locale = getPreferredLocale();
    navigate(`/${locale}`);
  }, [hasSyncedFromUrl, path, navigate]);

  return <I18nProvider lang={lang}>{children}</I18nProvider>;
}
