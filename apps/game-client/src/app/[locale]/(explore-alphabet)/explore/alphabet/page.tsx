import {
  generateMetadataForSupportedLocale,
  generateStaticParamsForSupportedLocales,
  getLocalizedRouteParams,
  type RouteParamsWithLocalePromise,
} from '@game-client/i18n';
import { ExploreAlphabetPage } from '@game-client/ui/experiences/explore/pages/explore-alphabet/explore-alphabet-page';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export async function generateMetadata({ params }: { params: RouteParamsWithLocalePromise }) {
  const { locale } = await getLocalizedRouteParams(params);
  return generateMetadataForSupportedLocale(locale, [locale, 'explore', 'alphabet']);
}

export default async function ExploreAlphabetRoutePage({
  params,
}: Readonly<{
  params: RouteParamsWithLocalePromise;
}>) {
  const { locale } = await getLocalizedRouteParams(params);

  return <ExploreAlphabetPage locale={locale} />;
}
