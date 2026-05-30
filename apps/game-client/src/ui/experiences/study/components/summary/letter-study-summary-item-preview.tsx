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
          'flex h-full w-full max-w-full items-center justify-center @container',

          'active:scale-95',
          'flex-col gap-p-spacing-1',
        )}
      >
        <div
          className={cn(
            'font-georgian text-2xl @[50px]:text-4xl @[100px]:text-5xl @[150px]:text-6xl',
            'text-s-color-panel-action-ghost-content-primary',
            'group-hover:text-s-color-panel-action-ghost-hover-content-primary',
            'group-active:text-s-color-panel-action-ghost-hover-content-primary',
          )}
        >
          {item.targetScript}
        </div>
        <div
          className={cn(
            'flex items-center justify-center gap-1 text-lg',
            'text-s-color-panel-action-ghost-content-secondary',
            'group-hover:text-s-color-panel-action-ghost-hover-content-secondary',
            'group-active:text-s-color-panel-action-ghost-hover-content-secondary',
          )}
        >
          <span className="text-s-color-panel-content-transliteration-bracket">[</span>
          <span className="flex">{item.transliteration}</span>
          <span className="text-s-color-panel-content-transliteration-bracket">]</span>
        </div>
      </div>
    </StudySummaryItemButton>
  );
}
