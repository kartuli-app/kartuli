import type { QueryClient } from '@tanstack/react-query';
import type { CombinedLocalizedContentRows } from './combined-localized-content-rows/combined-localized-content-rows';
import { getCombinedLocalizedContentRows } from './combined-localized-content-rows/get-combined-localized-content-rows';
import type { CombinedSharedContentRows } from './combined-shared-content-rows/combined-shared-content-rows';
import { getCombinedSharedContentRows } from './combined-shared-content-rows/get-combined-shared-content-rows';

/**
 * Bundled learning content for a revision/locale is static in the client bundle.
 * React Query defaults to `staleTime: 0`, so `fetchQuery()` re-runs `queryFn` whenever
 * TanStack DB collection sync runs again (e.g. after navigating back to home).
 */
export const COMBINED_CONTENT_STALE_TIME_MS = Number.POSITIVE_INFINITY;

export function fetchCombinedSharedContentRowsQuery(
  queryClient: QueryClient,
  contentRevision: string,
): Promise<CombinedSharedContentRows> {
  return queryClient.fetchQuery({
    queryKey: ['combined-shared-content-rows', contentRevision],
    queryFn: () => getCombinedSharedContentRows(),
    staleTime: COMBINED_CONTENT_STALE_TIME_MS,
  });
}

export function fetchCombinedLocalizedContentRowsQuery(
  queryClient: QueryClient,
  contentRevision: string,
  locale: string,
): Promise<CombinedLocalizedContentRows> {
  return queryClient.fetchQuery({
    queryKey: ['combined-localized-content-rows', contentRevision, locale],
    queryFn: () => getCombinedLocalizedContentRows(locale),
    staleTime: COMBINED_CONTENT_STALE_TIME_MS,
  });
}
