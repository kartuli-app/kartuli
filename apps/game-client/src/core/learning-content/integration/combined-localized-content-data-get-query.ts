import { getCombinedLocalizedContentData } from '@game-client/core/learning-content/integration/combined-localized-content-data-get';
import { useQuery } from '@tanstack/react-query';

export const useCombinedLocalizedContentDataGetQuery = ({
  locale,
  contentRevision,
}: {
  locale: string;
  contentRevision: string;
}) => {
  return useQuery({
    queryKey: ['combined-localized-content-data', locale, contentRevision],
    queryFn: () => getCombinedLocalizedContentData(locale),
  });
};
