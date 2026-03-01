import type { Metadata } from 'next';
import { getLocaleMetadata } from '../../config/get-locale-metadata';
import { type SupportedLng, supportedLngs } from '../../domains/i18n/supported-locales';

/** Minimal static paths for SSG: root and locale roots only. Other routes work client-side. */
const STATIC_PATHS: { spaRoute: string[] }[] = [
  { spaRoute: [] }, // /
  { spaRoute: ['en'] },
  { spaRoute: ['ru'] },
];

function getLangFromSegments(segments: string[] | undefined): SupportedLng {
  const first = segments?.[0];
  if (first && supportedLngs.includes(first as SupportedLng)) {
    return first as SupportedLng;
  }
  return 'en';
}

export function generateStaticParams() {
  return STATIC_PATHS;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ spaRoute?: string[] }>;
}): Promise<Metadata> {
  const { spaRoute } = await params;
  const segments = spaRoute ?? [];
  const lang = getLangFromSegments(segments);
  return getLocaleMetadata(lang, segments);
}

export { SpaRoutePage as default } from '../../domains/spa-route/spa-route-page';
