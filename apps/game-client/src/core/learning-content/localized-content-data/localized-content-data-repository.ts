import type { LocalizedContentData } from './localized-content-data';

export interface LocalizedContentDataRepository {
  get(locale: string): Promise<LocalizedContentData>;
}
