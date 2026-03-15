import type { LocalizedContentData } from '../localized-content-data/localized-content-data';
import { extendedLocalizedContentDataRepository } from './extended-localized-content-data-repository';

export const extendedLocalizedContentDataGet = async (
  locale: string,
): Promise<LocalizedContentData> => {
  return extendedLocalizedContentDataRepository().get(locale);
};
