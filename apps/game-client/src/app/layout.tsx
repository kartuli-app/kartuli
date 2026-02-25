import type { Metadata, Viewport } from 'next';
import { metadataConfig } from '../config/metadata-config';
import { viewportConfig } from '../config/viewport-config';

export const metadata: Metadata = metadataConfig;
export const viewport: Viewport = viewportConfig;

export { RootLayout as default } from '../domains/app-shell/root-layout';
