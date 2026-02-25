import type { Metadata, Viewport } from 'next';
import { metadataConfig } from '../config/metadata-config';
import { viewportConfig } from '../config/viewport-config';
import { RootLayout } from '../domains/app-shell/root-layout';

export const metadata: Metadata = metadataConfig;

export const viewport: Viewport = viewportConfig;

export default RootLayout;
