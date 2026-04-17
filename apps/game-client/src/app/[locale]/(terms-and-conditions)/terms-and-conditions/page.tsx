import { generateStaticParamsForSupportedLocales } from '@game-client/i18n';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { TermsAndConditionsPageServer as default } from '@game-client/ui/screens/terms-and-conditions/terms-and-conditions-page-server';
