// /[locale]/[...catchAll]/page.tsx catches all not found pages
// this page will be shown when the page is not found
import { generateStaticParamsForSupportedLocales } from '@game-client/i18n';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { NotFoundPage as default } from '@game-client/ui/experiences/not-found/pages/not-found-page';
