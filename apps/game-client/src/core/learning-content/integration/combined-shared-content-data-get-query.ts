import { getCombinedSharedContentData } from '@game-client/core/learning-content/integration/combined-shared-content-data-get';
import { useQuery } from '@tanstack/react-query';

export const useCombinedSharedContentDataGetQuery = ({
  contentRevision,
}: {
  contentRevision: string;
}) => {
  return useQuery({
    queryKey: ['combined-shared-content-data', contentRevision],
    queryFn: () => getCombinedSharedContentData(),
  });
};
