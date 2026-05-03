import {
  generateMetadataForSupportedLocale,
  generateStaticParamsForSupportedLocales,
} from '@game-client/i18n/';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateMetadataForSupportedLocale(locale, [locale, 'translit']);
}

export { TranslitPageServer as default } from '@game-client/ui/screens/translit/translit-page-server';
