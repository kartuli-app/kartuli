import { useQuery } from '@tanstack/react-query';
import { extendedSharedContentDataGet } from './extended-shared-content-data-get';

export const useExtendedSharedContentDataGetQuery = () => {
  return useQuery({
    queryKey: ['extended-shared-content-data'],
    queryFn: extendedSharedContentDataGet,
  });
};
