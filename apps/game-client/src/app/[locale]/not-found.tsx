// /[locale]/[...catchAll]/page.tsx catches all not found pages
// this page will be shown when the page is not found
import { generateStaticParamsForSupportedLocales } from '@game-client/i18n';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { NotFoundPageServer as default } from '@game-client/ui/screens/not-found/not-found-page-server';
