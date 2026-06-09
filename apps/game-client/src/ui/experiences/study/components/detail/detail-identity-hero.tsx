'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { cn } from '@kartuli/ui/utils/cn';

export function DetailIdentityHero({
  targetScript,
  transliteration,
}: Readonly<Pick<LetterItem, 'targetScript' | 'transliteration'>>) {
  return (
    <div
      className={cn(
        'grid min-h-0 w-full flex-1 grid-rows-[minmax(0,7fr)_minmax(0,2fr)] overflow-hidden',
      )}
    >
      <div className="relative mx-auto flex h-full w-full max-w-[60%] items-center justify-center @container-size">
        <span className="absolute top-6/20 left-0 z-10 h-[2cqh] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="absolute top-13/20 left-0 z-10 h-[2cqh] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="z-20 flex h-full w-full items-center justify-center font-georgian text-[70cqh] leading-none">
          {targetScript}
        </span>
      </div>
      <div className="relative z-20 flex min-h-0 items-start justify-center @container-size">
        <div className="flex items-center justify-center text-[70cqh] leading-none">
          <span className="text-s-color-panel-content-transliteration-bracket">[</span>
          <span>{transliteration}</span>
          <span className="text-s-color-panel-content-transliteration-bracket">]</span>
        </div>
      </div>
    </div>
  );
}
