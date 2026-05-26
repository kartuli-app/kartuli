'use client';

import type { SupportedLocale } from '@game-client/i18n';
import { useNavigation } from './navigation-context';
import { splitLocalizedPathname } from './split-localized-pathname';

export function useCurrentRouteLocale(): SupportedLocale {
  const { localizedPathname } = useNavigation();
  const { locale } = splitLocalizedPathname(localizedPathname);

  if (locale === null) {
    throw new Error('useCurrentRouteLocale must be used within a localized /[locale] route.');
  }

  return locale;
}
