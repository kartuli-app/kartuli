import { generateStaticParamsForSupportedLocales } from '@game-client/i18n';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { SearchPageServer as default } from '@game-client/ui/screens/search/search-page-server';
