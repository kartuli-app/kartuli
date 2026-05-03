'use client';

import { i18n } from '@game-client/i18n/i18n-config';
import { logger } from '@game-client/logging/dev-logger';
import type { ReactNode } from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

export function I18nProvider({
  locale,
  children,
}: Readonly<{
  readonly locale: string;
  readonly children: ReactNode;
}>) {
  // Architecture trade-off (Option A, accepted): i18next is a module singleton
  // initialised with defaultLocale, so SSR-rendered HTML for non-default locales
  // contains default-locale text. This gate prevents that wrong text from
  // becoming visible after hydration; the blank → translated swap happens
  // client-side via changeLanguage. Changing this requires per-request i18n
  // instances or an RSC-first copy approach — out of scope unless a new item is opened.
  //
  // Prevent a visible flash by not rendering translated children until i18next
  // has switched to the target language.
  const [isReady, setIsReady] = useState(i18n.resolvedLanguage === locale);

  const useIsomorphicLayoutEffect = globalThis.window ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (i18n.resolvedLanguage === locale) {
      setIsReady(true);
      return;
    }

    i18n
      .changeLanguage(locale)
      .then(() => setIsReady(true))
      .catch(() => {
        logger.error('i18n', 'Failed to change language locale:', locale);
        // Avoid rendering a blank screen forever if language switching fails.
        setIsReady(true);
      });
  }, [locale]);

  if (!isReady) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
