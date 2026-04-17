import { generateStaticParamsForSupportedLocales } from '@game-client/i18n';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { PrivacyPageServer as default } from '@game-client/ui/screens/privacy/privacy-page-server';
