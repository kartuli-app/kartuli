import { useQuery } from '@tanstack/react-query';
import { combinedLocalizedContentDataGet } from './combined-localized-content-data-get';

export const useCombinedLocalizedContentDataGetQuery = (locale: string) => {
  return useQuery({
    queryKey: ['combined-localized-content-data', locale],
    queryFn: () => combinedLocalizedContentDataGet(locale),
  });
};
