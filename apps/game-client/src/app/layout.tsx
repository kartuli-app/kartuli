import { viewportConfig } from '@game-client/config/viewport-config';
import { defaultLng } from '@game-client/i18n/default-locale';
import { getLocaleMetadata } from '@game-client/i18n/get-locale-metadata';
import type { Metadata, Viewport } from 'next';

const defaultMetadata: Metadata = getLocaleMetadata(defaultLng);
export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = viewportConfig;

export { RootLayout as default } from '@game-client/root-layout/root-layout';
