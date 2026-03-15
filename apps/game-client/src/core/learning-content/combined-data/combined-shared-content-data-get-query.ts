import { useQuery } from '@tanstack/react-query';
import { combinedSharedContentDataGet } from './combined-shared-content-data-get';

export const useCombinedSharedContentDataGetQuery = () => {
  return useQuery({
    queryKey: ['combined-shared-content-data'],
    queryFn: combinedSharedContentDataGet,
  });
};
