'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import type { SupportedLng } from './config';
import { i18n } from './config';

interface I18nProviderProps {
  readonly lang: SupportedLng;
  readonly children: ReactNode;
}

export function I18nProvider({ lang, children }: I18nProviderProps) {
  useEffect(() => {
    void i18n.changeLanguage(lang);
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
