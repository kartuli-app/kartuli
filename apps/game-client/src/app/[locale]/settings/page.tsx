import { generateStaticParamsForSupportedLocales } from '@game-client/i18n/';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { SettingsPageServer as default } from '@game-client/ui/screens/settings/settings-page-server';
