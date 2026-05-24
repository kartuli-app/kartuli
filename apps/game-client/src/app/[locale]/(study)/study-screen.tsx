'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { Panel } from '@game-client/ui/components/panel/panel';
import { SafeViewTransition } from '@game-client/ui/components/safe-view-transition';
import { cn } from '@kartuli/ui/utils/cn';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { PiCaretLeft, PiCaretRight, PiHouseLight, PiPlayFill } from 'react-icons/pi';
import {
  getStudyScreenCurrentItem,
  getStudyScreenUrl,
  STUDY_ITEM_SEARCH_PARAM,
  type StudyScreenCurrentItem,
} from './study-screen-url-state';

const MAX_ITEMS_COUNT = 42;
const STUDY_NAV_FORWARD = 'study-nav-forward';
const STUDY_NAV_BACK = 'study-nav-back';

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
        'bg-p-color-brand-600',
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
  visualLabel,
  icon,
  disabled,
  onClick,
  iconPosition = 'left',
  size = 'small',
}: Readonly<{
  className?: string;
  label: string;
  visualLabel?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  onClick?: () => void;
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'large' | 'icon';
}>) {
  const Icon = icon;
  const renderedLabel = visualLabel ?? label;
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
        'items-center',
        'justify-center',
        'h-11',
        size !== 'icon' && 'gap-1',
        size !== 'icon' && 'p-2',
        size === 'small' && 'w-26',
        size === 'large' && 'w-36',
        size === 'icon' && 'w-11',
        'border-2',
        disabled && 'cursor-not-allowed',
        !disabled && 'cursor-pointer',
        disabled && 'opacity-20',
        'bg-p-color-neutral-500',
        'text-p-color-neutral-50',
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
          size === 'small' && 'size-4',
          size === 'large' && 'size-6',
          size === 'icon' && 'size-5',
          'text-inherit',
        )}
      />
      {size !== 'icon' ? (
        <div
          className={cn(
            'uppercase',
            size === 'small' ? 'text-sm' : 'text-lg',
            'text-inherit',
            !disabled && 'group-hover:text-inherit',
            !disabled && 'group-active:text-inherit',
          )}
        >
          {renderedLabel}
        </div>
      ) : null}
    </button>
  );
}

type StudyNavigationState = {
  items: LetterItem[];
  totalItems: number;
  currentItem: StudyScreenCurrentItem;
  canGoPrevious: boolean;
  canGoNext: boolean;
  canGoToSummary: boolean;
};

type StudyNavigationModel = StudyNavigationState & {
  handlePrevious: () => void;
  handleNext: () => void;
  handleGoToSummary: () => void;
  handleSelectItem: (itemIndex: number) => void;
};

function createStudyNavigationState(
  items: LetterItem[],
  currentItem: StudyScreenCurrentItem,
): StudyNavigationState {
  const totalItems = items.length;

  return {
    items,
    totalItems,
    currentItem,
    canGoPrevious: currentItem !== 'summary',
    canGoNext: totalItems > 0 && currentItem !== totalItems - 1,
    canGoToSummary: currentItem !== 'summary',
  };
}

function NavigationBar(props: Readonly<StudyNavigationModel>) {
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
    <div className="hidden w-full grid-cols-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] items-center gap-3 md:grid">
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          className="w-full min-w-0"
          label="Previous"
          icon={PiCaretLeft}
          disabled={!canGoPrevious}
          onClick={handlePrevious}
        />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          label="Summary"
          icon={PiHouseLight}
          disabled={!canGoToSummary}
          onClick={handleGoToSummary}
          size="icon"
        />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StatusPill currentItem={currentItem} totalItems={totalItems} className="w-32" />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          className="w-full min-w-0"
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

function StatusPill({
  className,
  currentItem,
  totalItems,
}: Readonly<Pick<StudyNavigationState, 'currentItem' | 'totalItems'> & { className?: string }>) {
  const statusLabel =
    currentItem === 'summary' ? `${totalItems} letters` : `${currentItem + 1} / ${totalItems}`;

  return (
    <div
      className={cn(
        'flex',
        'h-11',
        'w-24',
        'shrink-0',
        'min-w-0',
        'items-center',
        'justify-center',
        'rounded-full',
        'bg-kartuli-color-primitive-neutral-200',
        'px-3',
        'text-sm',
        'font-bold',
        'uppercase',
        'text-kartuli-color-primitive-neutral-900',
        className,
      )}
    >
      <span className="truncate">{statusLabel}</span>
    </div>
  );
}

function MobileInfoBar(props: Readonly<StudyNavigationModel>) {
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
    <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] items-center gap-2 md:hidden">
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          className="w-full min-w-0 gap-0.5 px-2"
          label="Previous"
          visualLabel="Prev"
          icon={PiCaretLeft}
          disabled={!canGoPrevious}
          onClick={handlePrevious}
        />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          label="Summary"
          icon={PiHouseLight}
          disabled={!canGoToSummary}
          onClick={handleGoToSummary}
          size="icon"
        />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StatusPill currentItem={currentItem} totalItems={totalItems} />
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <StudyNavigationButton
          className="w-full min-w-0 gap-0.5 px-2"
          label="Next"
          visualLabel="Next"
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
          'text-kartuli-color-primitive-neutral-500',
          'group-hover:text-kartuli-color-primitive-neutral-50',
          'group-active:text-kartuli-color-primitive-neutral-50',
          'active:scale-95',
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

function SummaryCard({
  items,
  handleSelectItem,
}: Readonly<Pick<StudyNavigationModel, 'items' | 'handleSelectItem'>>) {
  const boundedItems = items.slice(0, MAX_ITEMS_COUNT);
  const gridClassName = getSummaryGridClassName(boundedItems.length);

  return (
    <Panel className="flex grow min-h-0 w-full p-2">
      <div
        className={cn(
          'grid h-full w-full min-h-0 min-w-0 place-content-center place-self-center gap-1 overflow-hidden',
          gridClassName,
        )}
      >
        {boundedItems.map((item, index) => (
          <SummaryItemPreview key={item.id} item={item} onClick={() => handleSelectItem(index)} />
        ))}
      </div>
    </Panel>
  );
}

function DetailCard({ item }: Readonly<{ item: LetterItem }>) {
  return (
    <Panel className="flex grow min-h-0 w-full p-2">
      <div className="flex flex-col gap-8 h-full w-full items-center justify-center">
        <div className="font-georgian text-9xl leading-none text-kartuli-color-primitive-neutral-500">
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
    </Panel>
  );
}

function StudyScreenLayout({ nav }: Readonly<{ nav: StudyNavigationModel }>) {
  const currentViewKey =
    nav.currentItem === 'summary'
      ? 'summary'
      : `detail-${nav.items[nav.currentItem]?.id ?? nav.currentItem}`;

  return (
    <div className="flex flex-col gap-4 grow h-full max-w-[600px] w-full mx-auto">
      <NavigationBar {...nav} />
      <div className="flex grow w-full">
        <SafeViewTransition
          key={currentViewKey}
          name="study-card"
          enter={{
            [STUDY_NAV_FORWARD]: STUDY_NAV_FORWARD,
            [STUDY_NAV_BACK]: STUDY_NAV_BACK,
            default: 'none',
          }}
          exit={{
            [STUDY_NAV_FORWARD]: STUDY_NAV_FORWARD,
            [STUDY_NAV_BACK]: STUDY_NAV_BACK,
            default: 'none',
          }}
          default="none"
          share="none"
        >
          <div
            className={cn(
              'flex flex-col gap-2 w-full h-full grow rounded-3xl',
              'border-kartuli-color-primitive-neutral-500',
            )}
          >
            {nav.currentItem === 'summary' ? (
              <SummaryCard items={nav.items} handleSelectItem={nav.handleSelectItem} />
            ) : (
              <DetailCard item={nav.items[nav.currentItem]} />
            )}
          </div>
        </SafeViewTransition>
      </div>
      <MobileInfoBar {...nav} />
      <div className="flex w-full">
        <CtaButton label="Play now" icon={PiPlayFill} />
      </div>
    </div>
  );
}

function StudyScreenUrlState({ items }: Readonly<{ items: LetterItem[] }>) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentItem = getStudyScreenCurrentItem(items, searchParams.get(STUDY_ITEM_SEARCH_PARAM));
  const navigationState = createStudyNavigationState(items, currentItem);

  const updateCurrentItem = (
    nextCurrentItem: StudyScreenCurrentItem,
    transitionType: typeof STUDY_NAV_FORWARD | typeof STUDY_NAV_BACK,
  ) => {
    const nextItemId = nextCurrentItem === 'summary' ? null : (items[nextCurrentItem]?.id ?? null);
    const nextUrl = getStudyScreenUrl(pathname, searchParams.toString(), nextItemId);
    router.push(nextUrl, {
      scroll: false,
      transitionTypes: [transitionType],
    });
  };

  const handleSelectItem = (itemIndex: number) => {
    if (!items[itemIndex]) return;
    updateCurrentItem(itemIndex, STUDY_NAV_FORWARD);
  };

  const handlePrevious = () => {
    if (!navigationState.canGoPrevious) return;

    if (currentItem === 0) {
      updateCurrentItem('summary', STUDY_NAV_BACK);
      return;
    }

    if (currentItem !== 'summary') {
      updateCurrentItem(currentItem - 1, STUDY_NAV_BACK);
    }
  };

  const handleNext = () => {
    if (!navigationState.canGoNext) return;

    if (currentItem === 'summary') {
      updateCurrentItem(0, STUDY_NAV_FORWARD);
      return;
    }

    updateCurrentItem(currentItem + 1, STUDY_NAV_FORWARD);
  };

  const handleGoToSummary = () => {
    if (!navigationState.canGoToSummary) return;
    updateCurrentItem('summary', STUDY_NAV_BACK);
  };

  return (
    <StudyScreenLayout
      nav={{
        ...navigationState,
        handlePrevious,
        handleNext,
        handleGoToSummary,
        handleSelectItem,
      }}
    />
  );
}

function StudyScreenFallback({ items }: Readonly<{ items: LetterItem[] }>) {
  const navigationState = createStudyNavigationState(items, 'summary');
  const noop = () => {};

  return (
    <StudyScreenLayout
      nav={{
        ...navigationState,
        handlePrevious: noop,
        handleNext: noop,
        handleGoToSummary: noop,
        handleSelectItem: noop,
      }}
    />
  );
}

export function StudyScreen({ items }: Readonly<{ items: LetterItem[] }>) {
  return (
    <Suspense fallback={<StudyScreenFallback items={items} />}>
      <StudyScreenUrlState items={items} />
    </Suspense>
  );
}
