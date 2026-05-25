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
          'text-p-color-neutral-700',
        )}
      >
        <span className="absolute top-3/10 left-0 bg-blue-200 w-full h-[2px]"></span>
        <span className="absolute top-6/10 left-0 bg-blue-200 w-full h-[2px]"></span>
        <span className="z-10">{item.targetScript}</span>
      </div>
      <div
        className={cn(
          //
          'text-xl',
          'text-p-color-neutral-500',
          'flex',
          'items-center',
          'justify-center',
        )}
      >
        <span className="text-orange-500">[</span>
        <span>{item.transliteration}</span>
        <span className="text-orange-500">]</span>
      </div>
    </div>
  );
}
