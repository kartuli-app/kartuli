import { useQuery } from '@tanstack/react-query';
import { defaultSharedContentDataGet } from './default-shared-content-data-get';

export const useDefaultSharedContentDataGetQuery = () => {
  return useQuery({
    queryKey: ['default-shared-content-data'],
    queryFn: defaultSharedContentDataGet,
  });
};
