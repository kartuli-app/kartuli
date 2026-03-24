import { getLocaleMetadata } from '@game-client/i18n/get-locale-metadata';
import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';
import { HomePageClient } from '@game-client/screens/home-page-client/home-page-client';
import type { Metadata } from 'next';
import { getHomePageView } from './get-home-page-view-server';
import { getFullLibrary } from './library/full-library/get-available-library';

/** Minimal static paths for SSG: root and locale roots only. Other routes work client-side. */
const STATIC_PATHS: { language: SupportedLng }[] = [
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

export async function HomePageServer({
  params,
}: Readonly<{
  params: Promise<{ language: SupportedLng }>;
}>) {
  const resolved = await params;
  const language = resolved.language;
  const fullLibrary = await getFullLibrary(language);
  const homePageView = await getHomePageView(fullLibrary);

  return <HomePageClient language={language} homePageView={homePageView} />;
}
