'use client';

import { I18nProvider } from '@game-client/i18n/i18n-provider';
import { pathToLang } from '@game-client/i18n/path-to-lang';
import { getPreferredLocaleFromStorage } from '@game-client/local-storage/get-preferred-locale-from-storage';
import { PREFERRED_LOCALE_KEY } from '@game-client/local-storage/preferred-locale-key';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import { getExplicitLocaleFromPath } from '@game-client/routing/path-normalization';
import { setDocumentLang } from '@game-client/utils/browser';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface I18nShellProps {
  readonly children: ReactNode;
}

export function I18nShell({ children }: I18nShellProps) {
  const { path, replaceNavigate, isRouterReady } = useRouterContext();
  const lang = pathToLang(path);

  useEffect(() => {
    if (!isRouterReady) return;
    setDocumentLang(lang);
  }, [lang, isRouterReady]);

  useEffect(() => {
    if (!isRouterReady) return;
    const explicit = getExplicitLocaleFromPath(path);
    if (explicit === null) return;
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(PREFERRED_LOCALE_KEY, explicit);
    } catch {
      // ignore
    }
  }, [isRouterReady, path]);

  useEffect(() => {
    if (!isRouterReady || path !== '/') return;
    const locale = getPreferredLocaleFromStorage();
    replaceNavigate(`/${locale}`);
  }, [isRouterReady, path, replaceNavigate]);

  return <I18nProvider lang={lang}>{children}</I18nProvider>;
}
