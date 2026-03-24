import { defaultLng } from '@game-client/i18n/default-locale';
import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';
import { notFound } from 'next/navigation';

const STATIC_PATHS: { language: SupportedLng }[] = [
  { language: defaultLng },
  ...supportedLngs.map((lang) => ({ language: lang })),
];

export function generateStaticParams() {
  return STATIC_PATHS;
}

export default async function CatchAllPage() {
  notFound();
}
