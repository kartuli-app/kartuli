import { generateStaticParamsForSupportedLocales } from '@game-client/i18n';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export { NotFoundClient as default } from '@game-client/ui/experiences/not-found/components/not-found-client';
