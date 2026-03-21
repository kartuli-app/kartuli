'use client';

import { i18n } from '@game-client/i18n/i18n-config';
import type { SupportedLng } from '@game-client/i18n/supported-locales';
import { logger } from '@game-client/logging/dev-logger';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

interface I18nProviderProps {
  readonly lang: SupportedLng;
  readonly children: ReactNode;
}

export function I18nProvider({ lang, children }: I18nProviderProps) {
  useEffect(() => {
    if (i18n.resolvedLanguage === lang) return;

    i18n.changeLanguage(lang).catch(() => {
      logger.log('i18n', 'Failed to change language lang:', lang);
    });
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
