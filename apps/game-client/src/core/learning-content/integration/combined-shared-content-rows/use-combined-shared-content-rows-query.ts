import { useQuery } from '@tanstack/react-query';
import { COMBINED_CONTENT_STALE_TIME_MS } from '../fetch-combined-content-queries';
import { getCombinedSharedContentRows } from './get-combined-shared-content-rows';

export const useCombinedSharedContentRowsQuery = ({
  contentRevision,
}: {
  contentRevision: string;
}) => {
  return useQuery({
    queryKey: ['combined-shared-content-rows', contentRevision],
    queryFn: () => getCombinedSharedContentRows(),
    staleTime: COMBINED_CONTENT_STALE_TIME_MS,
  });
};
