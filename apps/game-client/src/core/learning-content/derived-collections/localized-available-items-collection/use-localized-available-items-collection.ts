import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createLocalizedItemsCollection } from '../../base-collections/localized/localized-items-collection/create-localized-items-collection';
import { createItemsCollection } from '../../base-collections/shared/items-collection/create-items-collection';
import { createLocalizedAvailableItemsCollection } from './create-localized-available-items-collection';

export function useLocalizedAvailableItemsCollection({
  locale,
  contentRevision,
}: {
  locale: string;
  contentRevision: string;
}) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    const itemsCollection = createItemsCollection({
      queryClient,
      contentRevision,
    });

    const localizedItemsCollection = createLocalizedItemsCollection({
      queryClient,
      contentRevision,
      locale,
    });

    return createLocalizedAvailableItemsCollection({
      itemsCollection,
      localizedItemsCollection,
    });
  }, [queryClient, contentRevision, locale]);
}
