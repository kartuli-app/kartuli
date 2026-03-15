import { useQuery } from '@tanstack/react-query';
import { extendedLocalizedContentDataGet } from './extended-localized-content-data-get';

export const useExtendedLocalizedContentDataGetQuery = (locale: string) => {
  return useQuery({
    queryKey: ['extended-localized-content-data', locale],
    queryFn: () => extendedLocalizedContentDataGet(locale),
  });
};
