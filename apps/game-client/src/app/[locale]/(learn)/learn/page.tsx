import { generateStaticParamsForSupportedLocales } from '@game-client/i18n';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { LearnPageServer as default } from '@game-client/ui/screens/learn/learn-page-server';
