import { generateMetadataForSupportedLocale } from '@game-client/i18n';
import { NextNavigationRootLayout } from '@game-client/navigation';
import { RootLayout } from '@game-client/root-layout/root-layout';
import type { Viewport } from 'next';
import type { ReactNode } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateMetadataForSupportedLocale(locale);
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  return (
    <RootLayout params={params}>
      <NextNavigationRootLayout>{children}</NextNavigationRootLayout>
    </RootLayout>
  );
}
