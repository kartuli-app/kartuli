import { generateStaticParamsForSupportedLocales } from '@game-client/i18n/';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { HomePageServer as default } from '@game-client/ui/screens/home/home-page-server';
