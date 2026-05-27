import {
  generateMetadataForSupportedLocale,
  generateStaticParamsForSupportedLocales,
  getLocalizedRouteParams,
  type RouteParamsWithLocalePromise,
} from '@game-client/i18n/';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export async function generateMetadata({ params }: { params: RouteParamsWithLocalePromise }) {
  const { locale } = await getLocalizedRouteParams(params);
  return generateMetadataForSupportedLocale(locale, {
    pathSegments: [locale],
  });
}

export { default } from '@game-client/ui/experiences/home/pages/home-redirect-page';
