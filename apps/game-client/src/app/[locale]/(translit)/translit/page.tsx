import { generateStaticParamsForSupportedLocales } from '@game-client/i18n/';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { TranslitPageServer as default } from '@game-client/ui/screens/translit/translit-page-server';
