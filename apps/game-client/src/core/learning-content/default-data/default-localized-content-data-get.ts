import { getLocalizedContentData } from '../localized-content-data/get-localized-content-data';
import { defaultLocalizedContentDataRepository } from './default-localized-content-data-repository';

export const defaultLocalizedContentDataGet = (locale: string) =>
  getLocalizedContentData(defaultLocalizedContentDataRepository(), locale);
