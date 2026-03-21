import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createItemTextsCollection } from './create-item-texts-collection';

export function useItemTextsCollection({
  contentRevision,
  locale,
}: {
  contentRevision: string;
  locale: string;
}) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createItemTextsCollection({ queryClient, contentRevision, locale });
  }, [queryClient, contentRevision, locale]);
}
