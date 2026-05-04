import { generateMetadataForSupportedLocale } from '@game-client/i18n';
import { NextNavigationRootLayout } from '@game-client/navigation';
import { RootLayout } from '@game-client/root-layout/root-layout';
import type { Viewport } from 'next';
import type { ReactNode } from 'react';

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateMetadataForSupportedLocale(locale);
}

export const viewport: Viewport = {
  width: 'device-width',
  // Do not set `maximumScale` / `userScalable: false` — these block low-vision
  // users who need to zoom above the default cap. Axe flags a cap below 500%
  // (rule: meta-viewport-large), and WCAG 1.4.4 / 1.4.10 require unrestricted
  // resize. Modern iOS Safari respects unrestricted zoom without layout jumps.
  themeColor: 'red',
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: 'red' },
  //   { media: '(prefers-color-scheme: dark)', color: 'blue' },
  // ],
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
