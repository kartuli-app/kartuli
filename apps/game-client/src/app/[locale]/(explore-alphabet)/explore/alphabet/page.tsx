import {
  generateMetadataForSupportedLocale,
  generateStaticParamsForSupportedLocales,
  getLocalizedRouteParams,
  getMessagesForLocale,
  type RouteParamsWithLocalePromise,
} from '@game-client/i18n';
import { ExploreAlphabetPage } from '@game-client/ui/experiences/explore/pages/explore-alphabet/explore-alphabet-page';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export async function generateMetadata({ params }: { params: RouteParamsWithLocalePromise }) {
  const { locale } = await getLocalizedRouteParams(params);
  const alphabetMessages = getMessagesForLocale(locale, 'alphabet');
  return generateMetadataForSupportedLocale(locale, {
    pathSegments: [locale, 'explore', 'alphabet'],
    pageTitle: alphabetMessages.title,
  });
}

export default async function ExploreAlphabetRoutePage({
  params,
}: Readonly<{
  params: RouteParamsWithLocalePromise;
}>) {
  const { locale } = await getLocalizedRouteParams(params);

  return <ExploreAlphabetPage locale={locale} />;
}
