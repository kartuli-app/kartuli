import { generateStaticParamsForSupportedLocales } from '@game-client/i18n';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return generateStaticParamsForSupportedLocales();
}

export default function CatchAllPage() {
  notFound();
}
