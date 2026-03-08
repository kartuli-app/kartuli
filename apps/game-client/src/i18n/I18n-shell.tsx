'use client';

import { defaultLng } from '@game-client/i18n/default-locale';
import { I18nProvider } from '@game-client/i18n/i18n-provider';
import { pathToLang } from '@game-client/i18n/path-to-lang';
import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';
import { PREFERRED_LOCALE_KEY } from '@game-client/local-storage/preferred-locale-key';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import { setDocumentLang } from '@game-client/utils/browser';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

function getPreferredLocale(): SupportedLng {
  if (typeof localStorage === 'undefined') return defaultLng;
  try {
    const stored = localStorage.getItem(PREFERRED_LOCALE_KEY);
    if (stored && supportedLngs.includes(stored as SupportedLng)) {
      return stored as SupportedLng;
    }
  } catch {
    // ignore storage access errors and fall back
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
