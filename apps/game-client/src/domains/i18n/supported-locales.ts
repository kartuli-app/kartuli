/**
 * Supported locale codes. Shared by server (e.g. getLocaleMetadata) and client (i18n config).
 * Keep in sync with route-utils SUPPORTED_LANGS. No React/i18next imports here.
 */
export const supportedLngs = ['en', 'ru'] as const;
export type SupportedLng = (typeof supportedLngs)[number];
