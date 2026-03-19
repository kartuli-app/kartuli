import { useMemo } from 'react';
import { useItemTextsCollection } from '../../base/item-texts-collection/use-item-texts-collection';
import { useItemsCollection } from '../../base/items-collection/use-items-collection';
import { createAvailableItemsCollection } from './create-available-items-collection';

export function useAvailableItemsCollection({
  contentRevision,
  locale,
}: {
  contentRevision: string;
  locale: string;
}) {
  const itemsCollection = useItemsCollection({ contentRevision });
  const itemTextsCollection = useItemTextsCollection({ contentRevision, locale });

  return useMemo(() => {
    return createAvailableItemsCollection({ itemsCollection, itemTextsCollection });
  }, [contentRevision, locale]);
}
