import type { LetterItem } from '@game-client/learning-content/library/library';
import { cn } from '@kartuli/ui/utils/cn';
import { LetterPreview } from './letter-preview';
import { LetterPreviewPlaceholder } from './letter-preview-placeholder';

interface PlaceholderGroup {
  count: number;
  className?: string;
}

function getMissingCount(itemsCount: number, columnsCount: number, onlyWhenSingleRow: boolean) {
  if (onlyWhenSingleRow && itemsCount >= columnsCount) return 0;
  const remainder = itemsCount % columnsCount;
  if (remainder === 0) return 0;
  return columnsCount - remainder;
}

function getPlaceholderGroups(itemsCount: number, size: 'grid-item' | 'full'): PlaceholderGroup[] {
  if (size === 'grid-item') {
    return [{ count: getMissingCount(itemsCount, 6, true) }];
  }
  return [
    { count: getMissingCount(itemsCount, 6, false), className: 'min-[600px]:hidden' },
    {
      count: getMissingCount(itemsCount, 12, false),
      className: 'hidden min-[600px]:flex lg:hidden',
    },
    { count: getMissingCount(itemsCount, 18, false), className: 'hidden lg:flex' },
  ];
}

export function LettersPreviewGrid({
  items,
  size,
}: Readonly<{ items: LetterItem[]; size: 'grid-item' | 'full' }>) {
  const placeholderGroups = getPlaceholderGroups(items.length, size);
  return (
    <div
      className={cn(
        //
        size === 'grid-item' && 'grid grid-cols-6',
        size === 'full' && 'grid grid-cols-6 min-[600px]:grid-cols-12 lg:grid-cols-18',
        'w-full',
        'gap-y-8',
        'py-4',
      )}
    >
      {items.map((item) => (
        <LetterPreview key={item.id} item={item} />
      ))}
      {placeholderGroups.flatMap((group, groupIndex) =>
        Array.from({ length: group.count }).map((_, itemIndex) => {
          const key = `placeholder-${groupIndex}-${itemIndex}`;
          return <LetterPreviewPlaceholder key={key} className={group.className} />;
        }),
      )}
    </div>
  );
}
