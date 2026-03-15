import { useQuery } from '@tanstack/react-query';
import { defaultLocalizedContentDataGet } from './default-localized-content-data-get';

export const useDefaultLocalizedContentDataGetQuery = (locale: string) => {
  return useQuery({
    queryKey: ['default-localized-content-data', locale],
    queryFn: () => defaultLocalizedContentDataGet(locale),
  });
};
