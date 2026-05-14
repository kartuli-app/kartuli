import { getLibraryServer } from '@game-client/learning-content/library/get-library-server';
import type { Lesson, LetterItem, Library } from '@game-client/learning-content/library/library';
import { cn } from '@kartuli/ui/utils/cn';
import Link from 'next/link';

function CardsGrid({
  children,
  size,
}: Readonly<{ children: React.ReactNode; size: 'grid-item' | 'full' }>) {
  return (
    <div
      className={cn(
        'grid gap-8',
        'mx-auto',
        'w-full',
        'max-w-[400px] min-[600px]:max-w-full md:max-w-full',
        size === 'grid-item' && 'grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3',
        size === 'full' && 'grid-cols-1',
      )}
    >
      {children}
    </div>
  );
}

function CardSectionContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={cn(
        //
        'w-full',
        'px-4',
        'py-2',
        'gap-4',
        'flex',
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({
  context,
  title,
  variant,
}: Readonly<{ context: string; title: string; variant: 'primary' | 'secondary' }>) {
  return (
    <div
      className={cn(
        //
        'border-b-2',
        variant === 'secondary' && 'group-hover:border-kartuli-color-primitive-neutral-500',
        variant === 'primary' && 'bg-kartuli-color-primitive-neutral-500',
        variant === 'primary' && 'group-hover:bg-kartuli-color-primitive-neutral-900',

        variant === 'primary' && 'border-kartuli-color-primitive-neutral-500',
        variant === 'secondary' && 'bg-kartuli-color-primitive-neutral-50',
        variant === 'secondary' && 'border-kartuli-color-primitive-neutral-200',
        'uppercase',
      )}
    >
      <CardSectionContainer>
        <div className="flex flex-col">
          <div
            className={cn(
              //
              'text-sm',
              'font-bold',
              variant === 'primary' && 'text-kartuli-color-primitive-neutral-200',
              variant === 'secondary' && 'text-kartuli-color-primitive-neutral-500',
            )}
          >
            {context}
          </div>
          <div
            className={cn(
              'text-xl',
              'font-black',
              variant === 'primary' && 'text-kartuli-color-primitive-neutral-50',
              variant === 'secondary' && 'text-kartuli-color-primitive-neutral-900',
            )}
          >
            {title}
          </div>
        </div>
      </CardSectionContainer>
    </div>
  );
}

function Card({
  context,
  title,
  items,
  variant,
  size,
}: Readonly<{
  context: string;
  title: string;
  items: LetterItem[];
  variant: 'primary' | 'secondary';
  size: 'grid-item' | 'full';
}>) {
  const placeholderGroups = getCardPreviewPlaceholderGroups(items.length, size);

  return (
    <div
      className={cn(
        //
        'cursor-pointer',
        'w-full min-w-0',
        'flex',
        'flex-col',
        'rounded-3xl',
        'border-2',
        'border-kartuli-color-primitive-neutral-200',
        variant === 'secondary' && 'hover:border-kartuli-color-primitive-neutral-500',
        'group',
        variant === 'primary' && 'bg-kartuli-color-primitive-neutral-500',
        variant === 'secondary' && 'bg-kartuli-color-primitive-neutral-50',
        'overflow-hidden',
      )}
    >
      {/* card header */}
      <CardHeader context={context} title={title} variant={variant} />
      {/* card body */}
      <div
        className={cn(
          //
          'bg-kartuli-color-primitive-neutral-50',
        )}
      >
        <CardSectionContainer>
          <div
            className={cn(
              //
              size === 'grid-item' && 'grid grid-cols-6',
              size === 'full' && 'grid grid-cols-6 min-[600px]:grid-cols-12 lg:grid-cols-18',
              'w-full',
              'gap-y-4',
              'py-2',
            )}
          >
            {items.map((item) => {
              const key = `${context}-${item.id}`;
              return <CardItemPreview key={key} item={item} />;
            })}
            {placeholderGroups.flatMap((group, groupIndex) =>
              Array.from({ length: group.count }).map((_, itemIndex) => {
                const key = `${context}-${title}-placeholder-${groupIndex}-${itemIndex}`;
                return <CardItemPreviewPlaceholder key={key} className={group.className} />;
              }),
            )}
          </div>
        </CardSectionContainer>
      </div>
    </div>
  );
}

function CardItemPreview({ item }: Readonly<{ item: LetterItem }>) {
  return (
    <div className={cn('aspect-square', 'justify-center', 'flex flex-col', 'gap-0', 'border-')}>
      <div
        className={cn(
          //
          'font-georgian',
          'text-4xl',
          'text-kartuli-color-primitive-neutral-900',
          'flex',
          'items-center',
          'justify-center',
          'relative',
          '',
        )}
      >
        <span className="absolute top-3/10 left-0 bg-blue-100 w-full h-[2px]"></span>
        <span className="absolute top-6/10 left-0 bg-blue-100 w-full h-[2px]"></span>
        <span className="z-10">{item.targetScript}</span>
      </div>
      <div
        className={cn(
          //
          'text-xl',
          'text-kartuli-color-primitive-neutral-500',
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

function CardItemPreviewPlaceholder({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'aspect-square',
        'justify-center',
        'flex',
        'flex-col',
        'gap-0',
        'pointer-events-none',
        className,
      )}
    >
      <div
        className={cn(
          //
          'font-georgian',
          'text-4xl',
          'text-kartuli-color-primitive-neutral-900',
          'flex',
          'items-center',
          'justify-center',
          'relative',
          '',
        )}
      >
        <span className="absolute top-3/10 left-0 bg-blue-100 w-full h-[2px]"></span>
        <span className="absolute top-6/10 left-0 bg-blue-100 w-full h-[2px]"></span>
        <span className="z-10 text-transparent">{'-'}</span>
      </div>
      <div
        className={cn(
          //
          'text-xl',
          'text-kartuli-color-primitive-neutral-500',
          'flex',
          'items-center',
          'justify-center',
        )}
      >
        <span className="text-transparent">[</span>
        <span className="text-transparent">{'-'}</span>
        <span className="text-transparent">]</span>
      </div>
    </div>
  );
}

type CardPreviewPlaceholderGroup = {
  count: number;
  className?: string;
};

function getCardPreviewMissingItemsCount(
  itemsCount: number,
  columnsCount: number,
  onlyWhenSingleRow: boolean,
) {
  if (onlyWhenSingleRow && itemsCount >= columnsCount) return 0;
  const remainder = itemsCount % columnsCount;
  if (remainder === 0) return 0;
  return columnsCount - remainder;
}

function getCardPreviewPlaceholderGroups(
  itemsCount: number,
  size: 'grid-item' | 'full',
): CardPreviewPlaceholderGroup[] {
  if (size === 'grid-item') {
    return [{ count: getCardPreviewMissingItemsCount(itemsCount, 6, true) }];
  }

  return [
    {
      count: getCardPreviewMissingItemsCount(itemsCount, 6, false),
      className: 'min-[600px]:hidden',
    },
    {
      count: getCardPreviewMissingItemsCount(itemsCount, 12, false),
      className: 'hidden min-[600px]:flex lg:hidden',
    },
    {
      count: getCardPreviewMissingItemsCount(itemsCount, 18, false),
      className: 'hidden lg:flex',
    },
  ];
}

type AlphabetLesson = {
  id: string;
  name: string;
  items: LetterItem[];
};

type AlphabetListData = {
  lessons: AlphabetLesson[];
  allItemsDeduplicated: LetterItem[];
};

function getAlphabetListDataFromLibrary(library: Library): AlphabetListData {
  const lessons = library.lessons.filter((lesson: Lesson) =>
    lesson.id.startsWith('lesson-alphabet-'),
  );
  const lessonsAlphabet = lessons.map(
    (lesson: Lesson): AlphabetLesson => ({
      id: lesson.id,
      name: lesson.title,
      items: lesson.itemIds.map(
        (itemId: string) => library.letterItemsById.get(itemId) as LetterItem,
      ),
    }),
  );
  const allItemsDeduplicated = lessonsAlphabet
    .flatMap((lesson) => lesson.items)
    .filter((item, index, self) => index === self.findIndex((t) => t.id === item.id));
  return {
    lessons: lessonsAlphabet,
    allItemsDeduplicated,
  };
}

export async function AlphabetLessonsList() {
  const library = await getLibraryServer('en');
  const { lessons, allItemsDeduplicated } = getAlphabetListDataFromLibrary(library);
  return (
    <div className="flex flex-col gap-8">
      {/* lessons grid */}
      <CardsGrid size="grid-item">
        {lessons.map((lesson) => (
          <Link href={`/en/study/`} key={lesson.id} className="flex grow">
            <Card
              key={lesson.id}
              context="Alphabet"
              title={lesson.name}
              items={lesson.items}
              variant="secondary"
              size="grid-item"
            />
          </Link>
        ))}
      </CardsGrid>
      {/* full review card */}
      <CardsGrid size="full">
        <Link href={`/en/study/`} className="flex grow">
          <Card
            key="all-items"
            context="Alphabet"
            title={'Full Review'}
            items={allItemsDeduplicated}
            variant="primary"
            size="full"
          />
        </Link>
      </CardsGrid>
    </div>
  );
}
