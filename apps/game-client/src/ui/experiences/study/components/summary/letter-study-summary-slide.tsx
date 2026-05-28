'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { LetterStudySummaryItemPreview } from '@game-client/ui/experiences/study/components/summary/letter-study-summary-item-preview';
import { StudySummaryGrid } from '@game-client/ui/experiences/study/components/summary/study-summary-grid';

const MAX_SUMMARY_ITEMS_COUNT = 42;

export function LetterStudySummarySlide({
  items,
  onSelectItem,
}: Readonly<{
  items: ReadonlyArray<LetterItem>;
  onSelectItem: (itemIndex: number) => void;
}>) {
  const boundedItems = items.slice(0, MAX_SUMMARY_ITEMS_COUNT);

  return (
    <StudySummaryGrid itemsCount={boundedItems.length}>
      {boundedItems.map((item, index) => (
        <LetterStudySummaryItemPreview
          key={item.id}
          item={item}
          onClick={() => onSelectItem(index)}
        />
      ))}
    </StudySummaryGrid>
  );
}
