import type { Metadata, Viewport } from 'next';

import { metadata as seoMetadata } from '../pwa/metadata';
import { viewport as pwaViewport } from '../pwa/viewport';
import { RootLayout } from '../ui/components/shell/root-layout';

export const metadata: Metadata = seoMetadata;

export const viewport: Viewport = pwaViewport;

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout>{children}</RootLayout>;
}
