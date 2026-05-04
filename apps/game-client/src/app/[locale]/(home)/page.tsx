import {
  generateMetadataForSupportedLocale,
  generateStaticParamsForSupportedLocales,
} from '@game-client/i18n/';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateMetadataForSupportedLocale(locale, [locale]);
}

export { HomePageServer as default } from '@game-client/ui/screens/home/home-page-server';
