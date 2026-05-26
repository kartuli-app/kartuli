import type { SupportedLocale } from '@game-client/i18n';
import type { LocalizedData } from './localized-data';

export interface LocalizedDataRepository {
  get(locale: SupportedLocale): LocalizedData;
}
