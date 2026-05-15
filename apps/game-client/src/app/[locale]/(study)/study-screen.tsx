'use client';
import type { LetterItem } from '@game-client/learning-content/library/library';
import { cn } from '@kartuli/ui/utils/cn';
import { startTransition, useState } from 'react';
import { PiCaretLeft, PiCaretRight, PiHouseLight, PiPlayFill } from 'react-icons/pi';

const MAX_ITEMS_COUNT = 42;

function CtaButton({
  className,
  label,
  icon,
  onClick,
}: Readonly<{
  className?: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}>) {
  const Icon = icon;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex',
        'items-center',
        'rounded-full',
        'flex-row',
        'gap-4',
        'p-2',
        'justify-center',
        'w-full',
        'h-16',
        'md:h-20',
        'border-2',
        'border-kartuli-color-primitive-neutral-900',
        'bg-kartuli-color-primitive-neutral-900',
        'hover:bg-kartuli-color-primitive-neutral-950',
        'active:bg-kartuli-color-primitive-neutral-950',
        'active:scale-95',
        'cursor-pointer',
        'group',
        className,
      )}
    >
      <Icon className="shrink-0 size-7 text-kartuli-color-primitive-neutral-50" />
      <div className="text-2xl uppercase text-kartuli-color-primitive-neutral-50">{label}</div>
    </button>
  );
}

function StudyNavigationButton({
  className,
  label,
  icon,
  disabled,
  onClick,
  iconPosition = 'left',
  size = 'small',
}: Readonly<{
  className?: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  onClick?: () => void;
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'large';
}>) {
  const Icon = icon;
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex',
        'rounded-full',
        'flex-row',
        'gap-1',
        'p-2',
        'items-center',
        'justify-center',
        'h-11',
        size === 'small' && 'w-26',
        size === 'large' && 'w-36',
        'border-2',
        disabled && 'cursor-not-allowed',
        !disabled && 'cursor-pointer',
        disabled && 'opacity-20',
        'border-kartuli-color-primitive-neutral-500',
        !disabled && 'hover:bg-kartuli-color-primitive-neutral-500',
        !disabled && 'active:bg-kartuli-color-primitive-neutral-500',
        !disabled && 'active:scale-95',
        'group',
        className,
      )}
    >
      <Icon
        className={cn(
          iconPosition === 'right' && 'order-1',
          'shrink-0',
          size === 'small' ? 'size-4' : 'size-6',
          'text-kartuli-color-primitive-neutral-500',
          !disabled && 'group-hover:text-kartuli-color-primitive-neutral-50',
          !disabled && 'group-active:text-kartuli-color-primitive-neutral-50',
        )}
      />
      <div
        className={cn(
          'uppercase',
          size === 'small' ? 'text-sm' : 'text-lg',
          'text-kartuli-color-primitive-neutral-500',
          !disabled && 'group-hover:text-kartuli-color-primitive-neutral-50',
          !disabled && 'group-active:text-kartuli-color-primitive-neutral-50',
        )}
      >
        {label}
      </div>
    </button>
  );
}

type UseStudyNavigationReturnType = {
  items: LetterItem[];
  totalItems: number;
  currentItem: number | 'summary';
  setCurrentItem: (item: number | 'summary') => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  canGoToSummary: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  handleGoToSummary: () => void;
};

function useStudyNavigation(items: LetterItem[]): UseStudyNavigationReturnType {
  const totalItems = items.length;
  const [currentItem, setCurrentItem] = useState<number | 'summary'>('summary');
  const canGoPrevious = currentItem !== 'summary';
  const canGoNext = totalItems > 0 && currentItem !== totalItems - 1;
  const canGoToSummary = currentItem !== 'summary';

  const handlePrevious = () => {
    startTransition(() => {
      if (!canGoPrevious) return;
      if (currentItem === 0) setCurrentItem('summary');
      else setCurrentItem(currentItem - 1);
    });
  };
  const handleNext = () => {
    startTransition(() => {
      if (currentItem === 'summary') setCurrentItem(0);
      else setCurrentItem(currentItem + 1);
    });
  };
  const handleGoToSummary = () => {
    startTransition(() => {
      if (!canGoToSummary) return;
      setCurrentItem('summary');
    });
  };

  return {
    items,
    totalItems,
    currentItem,
    setCurrentItem,
    canGoPrevious,
    canGoNext,
    canGoToSummary,
    handlePrevious,
    handleNext,
    handleGoToSummary,
  };
}

function NavigationBar(props: Readonly<UseStudyNavigationReturnType>) {
  const {
    totalItems,
    currentItem,
    canGoPrevious,
    canGoNext,
    canGoToSummary,
    handlePrevious,
    handleNext,
    handleGoToSummary,
  } = props;

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="flex items-center justify-center">
        <StudyNavigationButton
          className="flex pointer-coarse:hidden"
          label="Previous"
          icon={PiCaretLeft}
          disabled={!canGoPrevious}
          onClick={handlePrevious}
        />
      </div>
      <div className="flex items-center justify-center">
        {currentItem === 'summary' ? (
          <div
            className={cn(
              'text-lg uppercase flex items-center h-11 w-36 justify-center rounded-full',
              'bg-kartuli-color-primitive-neutral-500 text-kartuli-color-primitive-neutral-50',
            )}
          >
            {totalItems} letters
          </div>
        ) : (
          <StudyNavigationButton
            label="Summary"
            icon={PiHouseLight}
            disabled={!canGoToSummary}
            onClick={handleGoToSummary}
            size="large"
          />
        )}
      </div>
      <div className="flex items-center justify-center gap-4">
        <StudyNavigationButton
          className="flex pointer-coarse:hidden"
          label="Next"
          icon={PiCaretRight}
          disabled={!canGoNext}
          onClick={handleNext}
          iconPosition="right"
        />
      </div>
    </div>
  );
}

function InfoBar(props: Readonly<UseStudyNavigationReturnType>) {
  const { totalItems, currentItem, canGoPrevious, canGoNext, handlePrevious, handleNext } = props;

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <div className="flex items-center justify-center gap-4 hidden pointer-coarse:flex">
        <StudyNavigationButton
          label="Previous"
          icon={PiCaretLeft}
          disabled={!canGoPrevious}
          onClick={handlePrevious}
        />
      </div>
      <div className="flex items-center justify-center gap-2 mx-auto h-10">
        <div
          className={cn(
            'text-sm uppercase flex items-center h-11 justify-center rounded-full',
            'text-kartuli-color-primitive-neutral-500',
          )}
        >
          {currentItem === 'summary' ? (
            <div className="text-base flex flex-col gap-0 justify-center items-center text-center h-10">
              <div className="flex justify-center items-center text-center">Tap any item</div>
            </div>
          ) : (
            <div className="text-xl h-full flex items-center justify-center px-4 rounded-full bg-kartuli-color-primitive-neutral-200 w-26 gap-1">
              <span className="text-kartuli-color-primitive-neutral-900 w-9 text-right font-bold">
                {currentItem + 1}
              </span>{' '}
              / <span className="text-kartuli-color-primitive-neutral-500 w-9">{totalItems}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 hidden pointer-coarse:flex">
        <StudyNavigationButton
          label="Next"
          icon={PiCaretRight}
          disabled={!canGoNext}
          onClick={handleNext}
          iconPosition="right"
        />
      </div>
    </div>
  );
}

function SummaryItemPreview({
  item,
  onClick,
}: Readonly<{ item: LetterItem; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-0 min-w-0 items-center justify-center group cursor-pointer"
    >
      <div
        className={cn(
          'h-full aspect-square max-w-full',
          'group-hover:bg-kartuli-color-primitive-neutral-500',
          'group-active:bg-kartuli-color-primitive-neutral-500',
          'group-hover:text-kartuli-color-primitive-neutral-50',
          'group-active:text-kartuli-color-primitive-neutral-50',
          'active:scale-95',
          // 'border',
          'items-center justify-center flex',
          '@container',
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
    </button>
  );
}

const SUMMARY_GRID_BUCKETS = [
  { maxItems: 1, className: 'gap-4 grid-cols-1 grid-rows-1' },
  { maxItems: 2, className: 'gap-4 grid-cols-1 grid-rows-2' },
  { maxItems: 4, className: 'gap-4 grid-cols-2 grid-rows-2' },
  { maxItems: 6, className: 'gap-4 grid-cols-2 grid-rows-3' },
  { maxItems: 9, className: 'gap-4 grid-cols-3 grid-rows-3' },
  { maxItems: 12, className: 'gap-4 grid-cols-3 grid-rows-4' },
  { maxItems: 15, className: 'gap-2 grid-cols-3 grid-rows-5' },
  { maxItems: 16, className: 'gap-2 grid-cols-4 grid-rows-4' },
  { maxItems: 20, className: 'gap-2 grid-cols-4 grid-rows-5' },
  { maxItems: 24, className: 'gap-2 grid-cols-4 grid-rows-6' },
  { maxItems: 25, className: 'gap-2 grid-cols-5 grid-rows-5' },
  { maxItems: 30, className: 'gap-2 grid-cols-5 grid-rows-6' },
  { maxItems: 35, className: 'gap-1 grid-cols-5 grid-rows-7' },
  { maxItems: 36, className: 'gap-2 grid-cols-6 grid-rows-6' },
  { maxItems: 40, className: 'gap-1 grid-cols-6 grid-rows-7' },
  { maxItems: MAX_ITEMS_COUNT, className: 'gap-1 grid-cols-6 grid-rows-7' },
] as const;

function getSummaryGridClassName(itemsCount: number) {
  const bounded = Math.max(0, Math.min(itemsCount, MAX_ITEMS_COUNT));
  return (
    SUMMARY_GRID_BUCKETS.find((bucket) => bounded <= bucket.maxItems)?.className ??
    SUMMARY_GRID_BUCKETS[SUMMARY_GRID_BUCKETS.length - 1].className
  );
}

function SummaryCard(props: Readonly<UseStudyNavigationReturnType>) {
  const { items, setCurrentItem } = props;
  const boundedItems = items.slice(0, MAX_ITEMS_COUNT);
  const gridClassName = getSummaryGridClassName(boundedItems.length);

  return (
    <div className="flex grow min-h-0 w-full p-2">
      <div
        className={cn(
          'grid h-full w-full min-h-0 min-w-0 place-content-center place-self-center gap-1 overflow-hidden',
          gridClassName,
        )}
      >
        {boundedItems.map((item, index) => (
          <SummaryItemPreview key={item.id} item={item} onClick={() => setCurrentItem(index)} />
        ))}
      </div>
    </div>
  );
}

function DetailCard({ item }: Readonly<{ item: LetterItem }>) {
  return (
    <div className="flex flex-col gap-6 h-full w-full items-center justify-center">
      <div className="font-georgian text-9xl leading-none text-kartuli-color-primitive-neutral-900">
        {item.targetScript}
      </div>
      <div className="text-4xl text-kartuli-color-primitive-neutral-500 flex items-center justify-center gap-1">
        <span className="text-orange-500 w-4">[</span>
        <span className="flex w-10">{item.transliteration}</span>
        <span className="text-orange-500 w-4">]</span>
      </div>
      <div className="text-xl text-kartuli-color-primitive-neutral-500 text-center">
        {item.pronunciationHint}
      </div>
    </div>
  );
}

export function StudyScreen({ items }: Readonly<{ items: LetterItem[] }>) {
  const nav = useStudyNavigation(items);

  return (
    <div className="flex flex-col gap-4 grow h-full max-w-[600px] w-full mx-auto">
      <NavigationBar {...nav} />
      <div className="flex grow w-full">
        <div
          className={cn(
            'flex flex-col gap-2 w-full h-full grow rounded-3xl',
            'border-kartuli-color-primitive-neutral-500',
          )}
        >
          {nav.currentItem === 'summary' ? (
            <SummaryCard {...nav} />
          ) : (
            <DetailCard item={items[nav.currentItem]} />
          )}
        </div>
      </div>
      <InfoBar {...nav} />
      <div className="flex w-full">
        <CtaButton label="Play now" icon={PiPlayFill} />
      </div>
    </div>
  );
}
