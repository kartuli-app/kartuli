import { defaultLng } from '@game-client/i18n/default-locale';
import { getLocaleMetadata } from '@game-client/i18n/get-locale-metadata';
import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';
import { LearnPageClient } from '@game-client/screens/learn-page-client/learn-page-client';
import type { Metadata } from 'next';
import { getFullLibrary } from '../../(home)/library/full-library/get-available-library';

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
  const resolved = await params;
  const language = resolved.language;
  return getLocaleMetadata(language);
}

export default async function LearnPageServer({
  params,
}: Readonly<{
  params: Promise<{ language: SupportedLng }>;
}>) {
  const resolved = await params;
  const language = resolved.language;
  const fullLibrary = await getFullLibrary(language);
  return <LearnPageClient library={fullLibrary} language={language} />;
}
