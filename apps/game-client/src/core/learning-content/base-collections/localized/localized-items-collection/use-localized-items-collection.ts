import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createLocalizedItemsCollection } from './create-localized-items-collection';

export function useLocalizedItemsCollection({
  contentRevision,
  locale,
}: {
  contentRevision: string;
  locale: string;
}) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createLocalizedItemsCollection({ queryClient, contentRevision, locale });
  }, [queryClient, contentRevision, locale]);
}
