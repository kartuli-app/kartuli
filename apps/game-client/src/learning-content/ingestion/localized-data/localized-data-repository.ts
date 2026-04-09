import type { LocalizedData } from './localized-data';

export interface LocalizedDataRepository {
  get(locale: string): LocalizedData;
}
