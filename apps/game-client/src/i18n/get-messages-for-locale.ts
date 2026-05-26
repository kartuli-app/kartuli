import type { SupportedLocale } from '@game-client/i18n/i18n-constants';
import { resources } from '@game-client/i18n/resources/resources';

export type I18nNamespace = keyof (typeof resources)[SupportedLocale];

export function getMessagesForLocale<Namespace extends I18nNamespace>(
  locale: SupportedLocale,
  namespace: Namespace,
): (typeof resources)[SupportedLocale][Namespace] {
  return resources[locale][namespace];
}
