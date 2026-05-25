import {
  generateMetadataForSupportedLocale,
  generateStaticParamsForSupportedLocales,
  getLocalizedRouteParams,
  type RouteParamsWithLocalePromise,
} from '@game-client/i18n/';
import { TranslitPageServer } from '@game-client/ui/screens/translit/translit-page-server';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export async function generateMetadata({ params }: { params: RouteParamsWithLocalePromise }) {
  const { locale } = await getLocalizedRouteParams(params);
  return generateMetadataForSupportedLocale(locale, [locale, 'translit']);
}

export default async function TranslitPage({
  params,
}: Readonly<{
  params: RouteParamsWithLocalePromise;
}>) {
  const { locale } = await getLocalizedRouteParams(params);

  return <TranslitPageServer locale={locale} />;
}
