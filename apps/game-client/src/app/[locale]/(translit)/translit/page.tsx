import {
  generateMetadataForSupportedLocale,
  generateStaticParamsForSupportedLocales,
  getLocalizedRouteParams,
  getMessagesForLocale,
  type RouteParamsWithLocalePromise,
} from '@game-client/i18n';
import { TranslitPageServer } from '@game-client/ui/screens/translit/translit-page-server';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export async function generateMetadata({ params }: { params: RouteParamsWithLocalePromise }) {
  const { locale } = await getLocalizedRouteParams(params);
  const commonMessages = getMessagesForLocale(locale, 'common');
  return generateMetadataForSupportedLocale(locale, {
    pathSegments: [locale, 'translit'],
    pageTitle: commonMessages.dock.translit,
  });
}

export default async function TranslitPage({
  params,
}: Readonly<{
  params: RouteParamsWithLocalePromise;
}>) {
  const { locale } = await getLocalizedRouteParams(params);

  return <TranslitPageServer locale={locale} />;
}
