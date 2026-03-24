import { I18nProvider } from '@game-client/i18n/i18n-provider';
import { type SupportedLng, supportedLngs } from '@game-client/i18n/supported-locales';
import { notFound } from 'next/navigation';
export default async function RegularRouteLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ language: string }>;
  children: React.ReactNode;
}>) {
  const resolved = await params;
  const language = resolved.language as SupportedLng;
  // if language is not supported, show 404 page
  if (!supportedLngs.includes(language)) {
    return notFound();
  }
  return <I18nProvider lang={language}>{children}</I18nProvider>;
}
