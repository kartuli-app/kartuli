import { supportedLocales } from '@game-client/i18n/i18n-constants';

export function generateStaticParamsForSupportedLocales() {
  return [...supportedLocales.map((locale) => ({ locale }))];
}
