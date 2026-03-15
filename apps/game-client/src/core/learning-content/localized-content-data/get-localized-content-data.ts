import type { LocalizedContentData } from './localized-content-data';
import type { LocalizedContentDataRepository } from './localized-content-data-repository';

export const getLocalizedContentData = async (
  repo: LocalizedContentDataRepository,
  locale: string,
): Promise<LocalizedContentData> => {
  return repo.get(locale);
};
