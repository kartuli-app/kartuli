import { getLocalizedContentData } from '../localized-content-data/get-localized-content-data';
import { extendedLocalizedContentDataRepository } from './extended-localized-content-data-repository';

export const extendedLocalizedContentDataGet = (locale: string) =>
  getLocalizedContentData(extendedLocalizedContentDataRepository(), locale);
