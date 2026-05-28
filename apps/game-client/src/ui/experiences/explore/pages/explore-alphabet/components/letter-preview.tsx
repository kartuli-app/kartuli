import type { LetterItem } from '@game-client/learning-content/library/library';
import { cn } from '@kartuli/ui/utils/cn';

export function LetterPreview({ item }: Readonly<{ item: LetterItem }>) {
  return (
    <div className={cn('aspect-square', 'justify-center', 'flex', 'flex-col', 'gap-1')}>
      <div
        className={cn(
          'relative',
          'flex',
          'items-center',
          'justify-center',
          'font-georgian',
          'text-4xl',
          'text-s-color-panel-content-primary',
        )}
      >
        <span className="absolute top-3/10 left-0 h-[2px] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="absolute top-6/10 left-0 h-[2px] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="z-10">{item.targetScript}</span>
      </div>
      <div
        className={cn(
          //
          'text-xl',
          'text-s-color-panel-content-secondary',
          'flex',
          'items-center',
          'justify-center',
        )}
      >
        <span className="text-s-color-panel-content-transliteration-bracket">[</span>
        <span>{item.transliteration}</span>
        <span className="text-s-color-panel-content-transliteration-bracket">]</span>
      </div>
    </div>
  );
}
