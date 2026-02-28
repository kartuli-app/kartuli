'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouterContext } from '../app-shell/use-router-context';
import type { SupportedLng } from './config';
import { I18nProvider } from './I18nProvider';
import { pathToLang } from './path-to-lang';

export const PREFERRED_LOCALE_KEY = 'preferredLocale';

function getPreferredLocale(): SupportedLng {
  if (typeof localStorage === 'undefined') return 'en';
  const stored = localStorage.getItem(PREFERRED_LOCALE_KEY);
  return stored === 'ru' ? 'ru' : 'en';
}

interface I18nShellProps {
  readonly children: ReactNode;
}

export function I18nShell({ children }: I18nShellProps) {
  const { path, navigate, hasSyncedFromUrl } = useRouterContext();
  const lang = pathToLang(path);

  useEffect(() => {
    if (!hasSyncedFromUrl) return;
    const doc = (globalThis as unknown as { document?: { documentElement: { lang: string } } })
      .document;
    if (doc?.documentElement) {
      doc.documentElement.lang = lang;
    }
  }, [lang, hasSyncedFromUrl]);

  // When user visits /, redirect to preferred locale (no middleware)
  useEffect(() => {
    if (!hasSyncedFromUrl || path !== '/') return;
    const locale = getPreferredLocale();
    navigate(`/${locale}`);
  }, [hasSyncedFromUrl, path, navigate]);

  return <I18nProvider lang={lang}>{children}</I18nProvider>;
}
