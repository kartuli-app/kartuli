import { getCombinedLocalizedContentRows } from '@game-client/core/learning-content/integration/combined-localized-content-rows/get-combined-localized-content-rows';
import { useQuery } from '@tanstack/react-query';

export const useCombinedLocalizedContentRowsQuery = ({
  locale,
  contentRevision,
}: {
  locale: string;
  contentRevision: string;
}) => {
  return useQuery({
    queryKey: ['combined-localized-content-data', locale, contentRevision],
    queryFn: () => getCombinedLocalizedContentRows(locale),
  });
};
