'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { LetterStudySummaryItemPreview } from '@game-client/ui/experiences/study/components/summary/letter-study-summary-item-preview';
import { StudySummaryGrid } from '@game-client/ui/experiences/study/components/summary/study-summary-grid';

interface LetterStudySummarySlideProps {
  items: ReadonlyArray<LetterItem>;
  onSelectItem: (itemIndex: number) => void;
}

export function LetterStudySummarySlide({
  items,
  onSelectItem,
}: Readonly<LetterStudySummarySlideProps>) {
  return (
    <div className="flex min-h-0 flex-1 flex-col touch-pan-y gap-p-spacing-2 overflow-x-hidden overflow-y-auto p-p-spacing-2">
      <div className="flex flex-col gap-1 p-p-spacing-4 text-center text-s-color-panel-content-secondary">
        TAP ANY ITEM FOR DETAILS
      </div>
      <StudySummaryGrid>
        {items.map((item, index) => (
          <LetterStudySummaryItemPreview
            key={item.id}
            item={item}
            onClick={() => onSelectItem(index)}
          />
        ))}
      </StudySummaryGrid>
    </div>
  );
}
