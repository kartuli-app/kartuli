/**
 * SEO metadata (title, description, keywords) per locale.
 * Import only this in get-locale-metadata to avoid pulling in all i18n namespaces (common, game, learn, debug).
 */

import type { SupportedLocale } from '@game-client/i18n/i18n-constants';
import enMetadata from '@game-client/i18n/resources/messages/en/metadata';
import ruMetadata from '@game-client/i18n/resources/messages/ru/metadata';

export const metadataByLocale: Record<
  SupportedLocale,
  { title: string; description: string; keywords: readonly string[] }
> = {
  en: enMetadata,
  ru: ruMetadata,
};
