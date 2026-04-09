import { generateStaticParamsForSupportedLocales } from '@game-client/i18n';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { SavedPageServer as default } from '@game-client/ui/screens/saved/saved-page-server';
