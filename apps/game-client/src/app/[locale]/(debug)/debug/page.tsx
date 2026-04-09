import { generateStaticParamsForSupportedLocales } from '@game-client/i18n';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { DebugPageServer as default } from '@game-client/ui/screens/debug/debug-page-server';
