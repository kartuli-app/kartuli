import { useQuery } from '@tanstack/react-query';
import { getCombinedSharedContentRows } from './get-combined-shared-content-rows';

export const useCombinedSharedContentRowsQuery = ({
  contentRevision,
}: {
  contentRevision: string;
}) => {
  return useQuery({
    queryKey: ['combined-shared-content-rows', contentRevision],
    queryFn: () => getCombinedSharedContentRows(),
  });
};
