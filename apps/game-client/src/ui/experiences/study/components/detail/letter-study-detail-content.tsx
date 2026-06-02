'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { LetterStudyNotes } from '@game-client/ui/experiences/study/components/detail/letter-study-notes';

interface LetterStudyDetailContentProps {
  item: LetterItem;
}

export function LetterStudyDetailContent({ item }: Readonly<LetterStudyDetailContentProps>) {
  return (
    <>
      <div className="relative flex w-full max-w-[70%] items-center justify-center font-georgian text-[35cqw] leading-none text-s-color-panel-content-primary">
        <span className="absolute top-3/10 left-0 z-10 h-[1cqw] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="absolute top-6/10 left-0 z-10 h-[1cqw] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="relative z-50 mx-auto">{item.targetScript}</span>
      </div>
      <div className="flex items-center justify-center gap-1 text-[10cqw] text-s-color-panel-content-primary">
        <span className="text-s-color-panel-content-transliteration-bracket">[</span>
        <span className="flex">{item.transliteration}</span>
        <span className="text-s-color-panel-content-transliteration-bracket">]</span>
      </div>
      <LetterStudyNotes notes={item.notes} />
    </>
  );
}
