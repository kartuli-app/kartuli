/**
 * SEO metadata (title, description, keywords) per locale.
 * Import only this in get-locale-metadata to avoid pulling in all i18n namespaces (common, game, learn, debug).
 */

import enMetadata from '@game-client/i18n/resources/messages/en/metadata';
import ruMetadata from '@game-client/i18n/resources/messages/ru/metadata';
import type { SupportedLng } from '@game-client/i18n/supported-locales';

export const metadataByLocale: Record<
  SupportedLng,
  { title: string; description: string; keywords: readonly string[] }
> = {
  en: enMetadata,
  ru: ruMetadata,
};
