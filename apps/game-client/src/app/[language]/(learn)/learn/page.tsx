import { defaultLng } from '@game-client/i18n/default-locale';
import { getLocaleMetadata } from '@game-client/i18n/get-locale-metadata';
import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';
import { LearnPageClient } from '@game-client/screens/learn-page-client/learn-page-client';
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
  params: Promise<{ language: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const language = resolved.language as SupportedLng;
  return getLocaleMetadata(language);
}

export default async function LearnPageServer({
  params,
}: Readonly<{
  params: Promise<{ language: string }>;
}>) {
  const resolved = await params;
  const language = resolved.language as SupportedLng;
  return <LearnPageClient language={language} />;
}
