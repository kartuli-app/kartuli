import { RootLayout } from '@shared/components/root-layout';
import { viewport as pwaViewport } from '@shared/pwa/viewport';
import { metadata as seoMetadata } from '@shared/seo/metadata';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = seoMetadata;

export const viewport: Viewport = pwaViewport;

export default RootLayout;
