'use client';
import { GameAppBarIconLink } from '@game-client/ui/components/layout/app-bar-icon-action';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { cn } from '@kartuli/ui/utils/cn';
import { startTransition, useState } from 'react';
import {
  PiCaretLeft,
  PiCaretRight,
  PiGridNine,
  PiHouseLight,
  PiMagnifyingGlass,
  PiPlayFill,
} from 'react-icons/pi';

const MAX_ITEMS_COUNT = 42;

const DEBUG_ITEMS_COUNT = 33;

export function CtaButton({
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
        //
        'flex',
        'items-center',
        'rounded-full',
        'flex',
        'flex-row',
        'gap-4',
        'p-2',
        'justify-center',
        'w-full',
        'h-full',
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
      <Icon
        className={cn(
          //
          'shrink-0',
          'size-7',
          'text-kartuli-color-primitive-neutral-50',
        )}
      />
      <div
        className={cn(
          //
          'text-2xl',
          'uppercase',
          'text-kartuli-color-primitive-neutral-50',
        )}
      >
        {label}
      </div>
    </button>
  );
}

export function StudyNavigationButton({
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
        //
        'flex',
        'rounded-full',
        'flex',
        'flex-row',
        'gap-1',
        'p-2',
        'items-center',
        'justify-center',
        'h-11',
        size === 'small' && 'w-26',
        size === 'large' && 'w-36',
        'border-2',
        //
        disabled && 'cursor-not-allowed',
        !disabled && 'cursor-pointer',
        disabled && 'opacity-20',
        //
        'border-kartuli-color-primitive-neutral-500',
        //
        !disabled && 'hover:bg-kartuli-color-primitive-neutral-500',
        !disabled && 'active:bg-kartuli-color-primitive-neutral-500',
        !disabled && 'active:scale-95',
        'group',
        className,
      )}
    >
      <Icon
        className={cn(
          //
          iconPosition === 'right' && 'order-1',
          'shrink-0',
          'size-4',
          size === 'large' && 'size-6',
          'text-kartuli-color-primitive-neutral-500',
          !disabled && 'group-hover:text-kartuli-color-primitive-neutral-50',
          !disabled && 'group-active:text-kartuli-color-primitive-neutral-50',
        )}
      />
      <div
        className={cn(
          //
          'text-sm uppercase',
          size === 'large' && 'text-lg',
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

type useStudyNavigationReturnType = {
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

function useStudyNavigation(): useStudyNavigationReturnType {
  const totalItems = DEBUG_ITEMS_COUNT;
  const [currentItem, setCurrentItem] = useState<number | 'summary'>('summary');
  const canGoPrevious = currentItem !== 'summary';
  const canGoNext = currentItem !== totalItems - 1;
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

function NavigationBar(props: Readonly<useStudyNavigationReturnType>) {
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
    <div
      className={cn(
        //
        // 'bg-orange-200',
        'w-full',
        'flex',
        'items-center',
        'justify-between',
        'gap-2',
      )}
    >
      {/* left buttons */}
      <div
        className={cn(
          //
          'flex items-center justify-center ',
        )}
      >
        <StudyNavigationButton
          className={cn(
            //
            'flex pointer-coarse:hidden ',
          )}
          label="Previous"
          icon={PiCaretLeft}
          disabled={!canGoPrevious}
          onClick={handlePrevious}
        />
      </div>
      {/* center */}
      <div
        className={cn(
          //
          'flex items-center justify-center',
        )}
      >
        {currentItem === 'summary' ? (
          <div
            className={cn(
              //
              'text-lg',
              'text-kartuli-color-primitive-neutral-900',
              'uppercase',
              'flex',
              'items-center',
              'h-11',
              'w-36',
              'justify-center',
              'rounded-full',
              'bg-kartuli-color-primitive-neutral-500',
              'text-kartuli-color-primitive-neutral-50',
              // 'bg-red-500',
            )}
          >
            <div className="">{totalItems} letters</div>
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
      {/* right buttons */}
      <div
        className={cn(
          //
          'flex items-center justify-center gap-4',
        )}
      >
        <StudyNavigationButton
          className={cn(
            //
            'flex pointer-coarse:hidden ',
          )}
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

function InfoBar(props: Readonly<useStudyNavigationReturnType>) {
  const { totalItems, currentItem, canGoPrevious, canGoNext, handlePrevious, handleNext } = props;

  return (
    <div
      className={cn(
        //
        // 'bg-orange-300',
        'w-full',
        'flex',
        'items-center',
        'justify-between',
        'gap-4',
      )}
    >
      {/* left buttons */}
      <div
        className={cn(
          //
          'flex items-center justify-center gap-4',
          'hidden pointer-coarse:flex ',
        )}
      >
        <StudyNavigationButton
          label="Previous"
          icon={PiCaretLeft}
          disabled={!canGoPrevious}
          onClick={handlePrevious}
        />
      </div>
      {/* center */}
      <div
        className={cn(
          //
          'flex items-center justify-center gap-2 mx-auto h-10',
        )}
      >
        <div
          className={cn(
            //
            'text-sm',
            'text-kartuli-color-primitive-neutral-900',
            'uppercase',
            'flex',
            'items-center',
            'h-11',
            'justify-center',
            'rounded-full',
            // 'bg-kartuli-color-primitive-neutral-500',
            'text-kartuli-color-primitive-neutral-500',
            'uppercase',
            // 'bg-red-500',
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
      {/* right buttons */}
      <div
        className={cn(
          //
          'flex items-center justify-center gap-4',
          'hidden pointer-coarse:flex ',
        )}
      >
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
  itemNumber,
  onClick,
}: Readonly<{ itemNumber: number; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        //
        'flex min-h-0 min-w-0 items-center justify-center',
        'group',
        'cursor-pointer',
      )}
    >
      <div
        className={cn(
          //
          'h-full',
          // 'w-full',
          'aspect-square',
          'max-w-full',
          'rounded-full',
          'group-hover:bg-kartuli-color-primitive-neutral-500',
          'group-active:bg-kartuli-color-primitive-neutral-500',
          'group-hover:text-kartuli-color-primitive-neutral-50',
          'group-active:text-kartuli-color-primitive-neutral-50',
          'cursor-pointer',
          'active:scale-95',
          'border',
          'items-center',
          'justify-center',
          'flex',
          'text-2xl',
        )}
      >
        {itemNumber}
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
  const boundedItemsCount = Math.max(0, Math.min(itemsCount, MAX_ITEMS_COUNT));
  return (
    SUMMARY_GRID_BUCKETS.find((bucket) => boundedItemsCount <= bucket.maxItems)?.className ??
    SUMMARY_GRID_BUCKETS[SUMMARY_GRID_BUCKETS.length - 1].className
  );
}

function SummaryCard(props: Readonly<useStudyNavigationReturnType>) {
  const { totalItems, setCurrentItem } = props;
  const boundedItemsCount = Math.max(0, Math.min(totalItems, MAX_ITEMS_COUNT));
  const gridClassName = getSummaryGridClassName(boundedItemsCount);

  const handleItemClick = (itemNumber: number) => {
    setCurrentItem(itemNumber);
  };

  return (
    <div className="flex grow min-h-0 w-full p-2">
      <div
        className={cn(
          //
          'grid',
          'h-full',
          'w-full',
          'min-h-0',
          'min-w-0',
          'place-content-center',
          'place-self-center',
          // 'bg-red-200',
          'gap-1',
          gridClassName,
          'overflow-hidden',
        )}
      >
        {Array.from({ length: boundedItemsCount }).map((_, index) => {
          const key = `summary-item-preview-${index}`;
          return (
            <SummaryItemPreview
              key={key}
              itemNumber={index + 1}
              onClick={() => handleItemClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
}

function DetailCard({ itemNumber }: Readonly<{ itemNumber: number }>) {
  return (
    <div className="flex flex-col gap-2 h-full w-full items-center justify-center">
      <div className="text-5xl font-bold">Detail</div>
      <div className="text-5xl font-bold">{itemNumber}</div>
    </div>
  );
}

function StudyScreen() {
  const studyNavigationProps = useStudyNavigation();

  const handlePlay = () => {
    // TODO: implement play
  };

  return (
    <div className="flex flex-col gap-4 grow h-full max-w-[600px] w-full mx-auto">
      <NavigationBar {...studyNavigationProps} />
      {/* card container */}
      <div
        className={cn(
          //
          'flex grow w-full',
          // 'bg-red-200',
        )}
      >
        {/* card */}
        {/* <ViewTransition
          enter="auto"
          exit="auto"
          default="auto"
          key={studyNavigationProps.currentItem}
        > */}
        <div
          className={cn(
            //
            'flex flex-col gap-2',
            'w-full',
            'h-full',
            'grow',
            'rounded-3xl',
            // 'border-2',
            'border-kartuli-color-primitive-neutral-500',
            // 'items-center',
            // 'justify-center',
            // 'bg-kartuli-color-primitive-neutral-200',
          )}
        >
          {studyNavigationProps.currentItem === 'summary' ? (
            <SummaryCard {...studyNavigationProps} />
          ) : (
            <DetailCard itemNumber={studyNavigationProps.currentItem + 1} />
          )}
        </div>
        {/* </ViewTransition> */}
      </div>
      <InfoBar {...studyNavigationProps} />
      {/* cta button */}
      <div
        className={cn(
          //
          'flex w-full',
          // 'bg-orange-200',
        )}
      >
        <CtaButton label="Play now" icon={PiPlayFill} onClick={handlePlay} />
      </div>
    </div>
  );
}

function StudyPage() {
  return (
    <AppShell
      appBar={
        <GameClientAppBar
          title="The five vowels"
          context="Study Alphabet"
          backHref="/en/explore-alphabet"
          action={
            <GameAppBarIconLink href="/explore/search" label="Search" icon={PiMagnifyingGlass} />
          }
        />
      }
      startRail={<GameClientDock activeItemId="learn" />}
      endRail={<RailPatternAlphabet />}
    >
      <StudyScreen />
    </AppShell>
  );
}

export default StudyPage;
