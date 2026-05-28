'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { StudySummaryItemButton } from '@game-client/ui/experiences/study/components/summary/study-summary-item-button';
import { cn } from '@kartuli/ui/utils/cn';

export function LetterStudySummaryItemPreview({
  item,
  onClick,
}: Readonly<{ item: LetterItem; onClick: () => void }>) {
  return (
    <StudySummaryItemButton label={`Open ${item.targetScript}`} onClick={onClick}>
      <div
        className={cn(
          'flex h-full aspect-square max-w-full items-center justify-center @container',
          'text-s-color-panel-action-ghost-content',
          'group-hover:bg-s-color-panel-action-ghost-hover-bg',
          'group-hover:text-s-color-panel-action-ghost-hover-content',
          'group-active:bg-s-color-panel-action-ghost-hover-bg',
          'group-active:text-s-color-panel-action-ghost-hover-content',
          'active:scale-95',
        )}
      >
        <div
          className={cn(
            'font-georgian text-2xl @[50px]:text-4xl @[100px]:text-5xl @[150px]:text-6xl',
          )}
        >
          {item.targetScript}
        </div>
      </div>
    </StudySummaryItemButton>
  );
}
