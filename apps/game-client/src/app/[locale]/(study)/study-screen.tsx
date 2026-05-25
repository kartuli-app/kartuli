'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { Panel } from '@game-client/ui/components/panel/panel';
import { cn } from '@kartuli/ui/utils/cn';
import { animate, motion, type PanInfo, useMotionValue } from 'motion/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { PiCaretLeft, PiCaretRight, PiHouseLight, PiPlayFill } from 'react-icons/pi';
import { getStudySwipeNavigationDirection } from './study-screen-swipe';
import {
  getStudyScreenCurrentItem,
  getStudyScreenCurrentItemFromSlideIndex,
  getStudyScreenUrl,
  getStudySlideIndex,
  STUDY_ITEM_SEARCH_PARAM,
  type StudyScreenCurrentItem,
} from './study-screen-url-state';

const MAX_ITEMS_COUNT = 42;
const STUDY_SLIDE_ANIMATION_BASE_DURATION_SECONDS = 0.1;
const STUDY_SLIDE_ANIMATION_EXTRA_DURATION_SECONDS = 0.02;
const STUDY_SLIDE_ANIMATION_MAX_DURATION_SECONDS = 0.2;
type StudySlide =
  | {
      key: 'summary';
      kind: 'summary';
    }
  | {
      key: string;
      kind: 'detail';
      item: LetterItem;
      itemIndex: number;
    };

type StudyNavigationState = {
  items: LetterItem[];
  totalItems: number;
  currentItem: StudyScreenCurrentItem;
  currentSlideIndex: number;
  lastSlideIndex: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  canGoToSummary: boolean;
};

type StudyNavigationModel = StudyNavigationState & {
  navigateToSlide: (targetSlideIndex: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleGoToSummary: () => void;
  handleSelectItem: (itemIndex: number) => void;
};

type StudyNavigationButtonSize = 'small' | 'large' | 'icon';

type StudyNavigationButtonProps = Readonly<{
  className?: string;
  label: string;
  visualLabel?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  onClick?: () => void;
  iconPosition?: 'left' | 'right';
  size?: StudyNavigationButtonSize;
}>;

const STUDY_NAVIGATION_BUTTON_SIZE_CLASS_NAMES = {
  small: {
    button: 'w-26',
    icon: 'size-4',
    label: 'text-sm',
    rendersLabel: true,
  },
  large: {
    button: 'w-36',
    icon: 'size-6',
    label: 'text-lg',
    rendersLabel: true,
  },
  icon: {
    button: 'w-11',
    icon: 'size-5',
    label: undefined,
    rendersLabel: false,
  },
} as const satisfies Record<
  StudyNavigationButtonSize,
  {
    button: string;
    icon: string;
    label?: string;
    rendersLabel: boolean;
  }
>;

function getStudyNavigationButtonClassName({
  className,
  disabled,
  size,
}: Pick<StudyNavigationButtonProps, 'className' | 'disabled' | 'size'>) {
  const sizeClasses = STUDY_NAVIGATION_BUTTON_SIZE_CLASS_NAMES[size ?? 'small'];
  const isDisabled = disabled === true;

  return cn(
    'flex',
    'rounded-full',
    'flex-row',
    'items-center',
    'justify-center',
    'h-11',
    sizeClasses.rendersLabel && 'gap-1',
    sizeClasses.rendersLabel && 'p-2',
    sizeClasses.button,
    'border-2',
    isDisabled
      ? 'cursor-not-allowed opacity-20'
      : 'cursor-pointer hover:bg-p-color-neutral-700 active:bg-p-color-neutral-700 active:scale-95',
    'bg-p-color-neutral-500',
    'text-p-color-neutral-50',
    'border-p-color-neutral-500',
    'group',
    className,
  );
}

function getStudyNavigationButtonIconClassName({
  iconPosition,
  size,
}: Pick<StudyNavigationButtonProps, 'iconPosition' | 'size'>) {
  const sizeClasses = STUDY_NAVIGATION_BUTTON_SIZE_CLASS_NAMES[size ?? 'small'];

  return cn(iconPosition === 'right' && 'order-1', 'shrink-0', sizeClasses.icon, 'text-inherit');
}

function getStudyNavigationButtonLabelClassName({
  disabled,
  size,
}: Pick<StudyNavigationButtonProps, 'disabled' | 'size'>) {
  const sizeClasses = STUDY_NAVIGATION_BUTTON_SIZE_CLASS_NAMES[size ?? 'small'];
  const isDisabled = disabled === true;

  return cn(
    'uppercase',
    sizeClasses.label,
    'text-inherit',
    isDisabled ? undefined : 'group-hover:text-inherit group-active:text-inherit',
  );
}

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
        'border-p-color-brand-600',
        'bg-p-color-brand-600',
        'hover:bg-p-color-brand-700',
        'active:bg-p-color-brand-700',
        'active:scale-95',
        'cursor-pointer',
        'group',
        'text-p-color-neutral-50',
        className,
      )}
    >
      <Icon className="shrink-0 size-7 text-inherit" />
      <div className="text-2xl uppercase text-inherit">{label}</div>
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
}: StudyNavigationButtonProps) {
  const Icon = icon;
  const renderedLabel = visualLabel ?? label;
  const isDisabled = disabled === true;
  const shouldRenderLabel = STUDY_NAVIGATION_BUTTON_SIZE_CLASS_NAMES[size].rendersLabel;
  const labelElement = shouldRenderLabel ? (
    <div className={getStudyNavigationButtonLabelClassName({ disabled, size })}>
      {renderedLabel}
    </div>
  ) : null;

  return (
    <button
      type="button"
      aria-label={label}
      disabled={isDisabled}
      onClick={onClick}
      className={getStudyNavigationButtonClassName({ className, disabled, size })}
    >
      <Icon className={getStudyNavigationButtonIconClassName({ iconPosition, size })} />
      {labelElement}
    </button>
  );
}

function createStudyNavigationState(
  items: LetterItem[],
  currentItem: StudyScreenCurrentItem,
): StudyNavigationState {
  const totalItems = items.length;
  const currentSlideIndex = getStudySlideIndex(currentItem);
  const lastSlideIndex = totalItems;

  return {
    items,
    totalItems,
    currentItem,
    currentSlideIndex,
    lastSlideIndex,
    canGoPrevious: currentSlideIndex > 0,
    canGoNext: currentSlideIndex < lastSlideIndex,
    canGoToSummary: currentSlideIndex > 0,
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
        'bg-p-color-neutral-300',
        'px-3',
        'font-bold',
        'uppercase',
        'text-p-color-neutral-900',
        // 'border',
        className,
      )}
    >
      {currentItem === 'summary' ? (
        <div className="flex items-center justify-center gap-1 text-xs">
          <span className="font-bold">{totalItems}</span> letters
        </div>
      ) : (
        <div className="flex items-center justify-center gap-1 text-base">
          <div className="font-bold w-6 text-right borderr text-p-color-neutral-900">
            {currentItem + 1}
          </div>
          <div className="w-3 text-p-color-neutral-600 borderr text-center">/</div>
          <div className="w-6 text-p-color-neutral-600 borderr">{totalItems}</div>
        </div>
      )}
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
      aria-label={`Open ${item.targetScript}`}
      onClick={onClick}
      className="flex min-h-0 min-w-0 items-center justify-center group cursor-pointer"
    >
      <div
        className={cn(
          'h-full aspect-square max-w-full',
          'group-hover:bg-p-color-neutral-500',
          'group-active:bg-p-color-neutral-500',
          'text-p-color-neutral-500',
          'group-hover:text-p-color-neutral-50',
          'group-active:text-p-color-neutral-50',
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
    SUMMARY_GRID_BUCKETS.at(-1)?.className ??
    ''
  );
}

function SummaryCard({
  items,
  handleSelectItem,
}: Readonly<Pick<StudyNavigationModel, 'items' | 'handleSelectItem'>>) {
  const boundedItems = items.slice(0, MAX_ITEMS_COUNT);
  const gridClassName = getSummaryGridClassName(boundedItems.length);

  return (
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
  );
}

function DetailCard({ item }: Readonly<{ item: LetterItem }>) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center justify-centerr pt-[15%] gap-8 @container">
      <div className="font-georgian text-[45cqw] leading-none text-p-color-neutral-700 relative items-center justify-center max-w-[80%] w-full flex">
        <span className="absolute top-3/10 left-0 bg-blue-200 w-full h-[1cqw] z-10"></span>
        <span className="absolute top-6/10 left-0 bg-blue-200 w-full h-[1cqw] z-10"></span>
        <span className="z-50 relative mx-auto">{item.targetScript}</span>
      </div>
      <div className="flex items-center justify-center gap-1 text-[10cqw] text-p-color-neutral-500">
        <span className="text-orange-500">[</span>
        <span className="flex">{item.transliteration}</span>
        <span className="text-orange-500">]</span>
      </div>
      <div className="text-center text-2xl text-p-color-neutral-500 max-w-[80%]">
        {item.pronunciationHint}
      </div>
    </div>
  );
}

function getStudySlides(items: ReadonlyArray<LetterItem>): StudySlide[] {
  return [
    { key: 'summary', kind: 'summary' },
    ...items.map<StudySlide>((item, itemIndex) => ({
      key: item.id,
      kind: 'detail',
      item,
      itemIndex,
    })),
  ];
}

function getStudySlideAnimationDuration(fromSlideIndex: number, toSlideIndex: number): number {
  const distance = Math.abs(toSlideIndex - fromSlideIndex);

  if (distance <= 1) return STUDY_SLIDE_ANIMATION_BASE_DURATION_SECONDS;

  return Math.min(
    STUDY_SLIDE_ANIMATION_BASE_DURATION_SECONDS +
      STUDY_SLIDE_ANIMATION_EXTRA_DURATION_SECONDS * (distance - 1),
    STUDY_SLIDE_ANIMATION_MAX_DURATION_SECONDS,
  );
}

function StudyScreenLayout({ nav }: Readonly<{ nav: StudyNavigationModel }>) {
  const slides = useMemo(() => getStudySlides(nav.items), [nav.items]);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const trackX = useMotionValue(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const hasInitializedTrackRef = useRef(false);
  const previousSlideIndexRef = useRef(nav.currentSlideIndex);
  const previousSlideWidthRef = useRef(0);
  const trackAnimationRef = useRef<{ stop: () => void } | null>(null);
  const pendingFocusSlideIndexRef = useRef<number | null>(null);

  const stopTrackAnimation = () => {
    trackAnimationRef.current?.stop();
    trackAnimationRef.current = null;
  };

  const focusSlideIfNeeded = (slideIndex: number) => {
    if (pendingFocusSlideIndexRef.current !== slideIndex) return;

    slideRefs.current[slideIndex]?.focus();
    pendingFocusSlideIndexRef.current = null;
  };

  const animateTrackToSlide = (fromSlideIndex: number, toSlideIndex: number) => {
    if (slideWidth <= 0) return;

    stopTrackAnimation();
    trackAnimationRef.current = animate(trackX, -toSlideIndex * slideWidth, {
      duration: getStudySlideAnimationDuration(fromSlideIndex, toSlideIndex),
      ease: 'easeOut',
      onComplete: () => {
        trackAnimationRef.current = null;
        focusSlideIfNeeded(toSlideIndex);
      },
    });
  };

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || hasInitializedTrackRef.current) return;

    const initialSlideWidth = viewport.clientWidth;
    if (initialSlideWidth <= 0) return;

    setSlideWidth(initialSlideWidth);
    trackX.set(-nav.currentSlideIndex * initialSlideWidth);
    previousSlideWidthRef.current = initialSlideWidth;
    previousSlideIndexRef.current = nav.currentSlideIndex;
    hasInitializedTrackRef.current = true;
  }, [nav.currentSlideIndex, trackX]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const nextSlideWidth = entries[0]?.contentRect.width ?? viewport.clientWidth;
      if (nextSlideWidth <= 0) return;

      setSlideWidth((currentSlideWidth) =>
        currentSlideWidth === nextSlideWidth ? currentSlideWidth : nextSlideWidth,
      );
    });

    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (slideWidth <= 0 || !hasInitializedTrackRef.current) return;

    const targetX = -nav.currentSlideIndex * slideWidth;
    const widthChanged = previousSlideWidthRef.current !== slideWidth;
    const slideChanged = previousSlideIndexRef.current !== nav.currentSlideIndex;

    if (widthChanged) {
      stopTrackAnimation();
      trackX.set(targetX);
      previousSlideWidthRef.current = slideWidth;
      previousSlideIndexRef.current = nav.currentSlideIndex;
      return;
    }

    if (!slideChanged) return;

    const fromSlideIndex = previousSlideIndexRef.current;
    previousSlideWidthRef.current = slideWidth;
    previousSlideIndexRef.current = nav.currentSlideIndex;
    animateTrackToSlide(fromSlideIndex, nav.currentSlideIndex);
  }, [nav.currentSlideIndex, slideWidth, trackX]);

  useEffect(() => {
    return () => {
      stopTrackAnimation();
    };
  }, []);

  const handleTrackDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (slideWidth <= 0) return;

    const swipeDirection = getStudySwipeNavigationDirection({
      offsetX: info.offset.x,
      velocityX: info.velocity.x,
      slideWidth,
    });

    if (swipeDirection === 'forward' && nav.canGoNext) {
      nav.handleNext();
      return;
    }

    if (swipeDirection === 'back' && nav.canGoPrevious) {
      nav.handlePrevious();
      return;
    }

    animateTrackToSlide(nav.currentSlideIndex, nav.currentSlideIndex);
  };

  const handleSummaryItemSelect = (itemIndex: number) => {
    pendingFocusSlideIndexRef.current = itemIndex + 1;
    nav.handleSelectItem(itemIndex);
  };

  const trackWidth = slideWidth > 0 ? slideWidth * slides.length : `${slides.length * 100}%`;
  const individualSlideWidth = slideWidth > 0 ? slideWidth : `${100 / slides.length}%`;

  return (
    <div className="flex flex-1 min-h-0 min-w-0 flex-col gap-4 h-full max-w-[600px] w-full mx-auto">
      <NavigationBar {...nav} />
      <div
        ref={viewportRef}
        className="relative flex flex-1 min-h-0 min-w-0 w-full overflow-hidden touch-pan-y"
      >
        <Panel className="h-full min-h-0 w-full p-2 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 flex min-h-0 will-change-transform  overflow-hidden"
            style={{ x: trackX, width: trackWidth }}
            drag="x"
            dragConstraints={{ left: -(nav.lastSlideIndex * slideWidth), right: 0 }}
            dragDirectionLock
            dragElastic={0.08}
            dragMomentum={false}
            onDragStart={stopTrackAnimation}
            onDragEnd={handleTrackDragEnd}
          >
            {slides.map((slide, slideIndex) => {
              const isActive = slideIndex === nav.currentSlideIndex;

              return (
                <section
                  key={slide.key}
                  ref={(element) => {
                    slideRefs.current[slideIndex] = element;
                  }}
                  aria-hidden={!isActive}
                  aria-label={
                    slide.kind === 'summary'
                      ? 'Summary slide'
                      : `Detail slide ${slide.itemIndex + 1}`
                  }
                  className="flex h-full min-h-0 min-w-0 shrink-0 overflow-hidden"
                  data-active={isActive ? 'true' : 'false'}
                  data-study-slide-index={slideIndex}
                  inert={!isActive}
                  style={{ width: individualSlideWidth }}
                  tabIndex={isActive ? -1 : undefined}
                >
                  {slide.kind === 'summary' ? (
                    <SummaryCard items={nav.items} handleSelectItem={handleSummaryItemSelect} />
                  ) : (
                    <DetailCard item={slide.item} />
                  )}
                </section>
              );
            })}
          </motion.div>
        </Panel>
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

  const navigateToSlide = (targetSlideIndex: number) => {
    const nextCurrentItem = getStudyScreenCurrentItemFromSlideIndex(items.length, targetSlideIndex);
    if (nextCurrentItem === currentItem) return;

    const nextItemId = nextCurrentItem === 'summary' ? null : (items[nextCurrentItem]?.id ?? null);
    if (nextCurrentItem !== 'summary' && nextItemId === null) return;

    const nextUrl = getStudyScreenUrl(pathname, searchParams.toString(), nextItemId);
    router.push(nextUrl, { scroll: false });
  };

  const handleSelectItem = (itemIndex: number) => {
    if (!items[itemIndex]) return;
    navigateToSlide(itemIndex + 1);
  };

  const handlePrevious = () => {
    if (!navigationState.canGoPrevious) return;
    navigateToSlide(navigationState.currentSlideIndex - 1);
  };

  const handleNext = () => {
    if (!navigationState.canGoNext) return;
    navigateToSlide(navigationState.currentSlideIndex + 1);
  };

  const handleGoToSummary = () => {
    if (!navigationState.canGoToSummary) return;
    navigateToSlide(0);
  };

  return (
    <StudyScreenLayout
      nav={{
        ...navigationState,
        navigateToSlide,
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
        navigateToSlide: noop,
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
