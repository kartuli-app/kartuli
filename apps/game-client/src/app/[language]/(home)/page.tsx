import { defaultLng } from '@game-client/i18n/default-locale';
import { getLocaleMetadata } from '@game-client/i18n/get-locale-metadata';
import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';
import type { Metadata } from 'next';

const STATIC_PATHS: { language: SupportedLng }[] = [
  { language: defaultLng },
  ...supportedLngs.map((lang) => ({ language: lang })),
];

export function generateStaticParams() {
  return STATIC_PATHS;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: SupportedLng }>;
}): Promise<Metadata> {
  const { language } = await params;
  return getLocaleMetadata(language);
}

export { HomePageServer as default } from './home-page-server';
