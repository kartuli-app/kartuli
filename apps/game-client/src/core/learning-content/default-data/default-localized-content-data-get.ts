import type { LocalizedContentData } from '../localized-content-data/localized-content-data';
import { defaultLocalizedContentDataRepository } from './default-localized-content-data-repository';

export const defaultLocalizedContentDataGet = async (
  locale: string,
): Promise<LocalizedContentData> => {
  return defaultLocalizedContentDataRepository().get(locale);
};
