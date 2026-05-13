'use client';
import { GameAppBarIconLink } from '@game-client/ui/components/layout/app-bar-icon-action';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { cn } from '@kartuli/ui/utils/cn';
import { useState } from 'react';
import { IoSearchCircleOutline } from 'react-icons/io5';
import {
  PiCaretDoubleLeft,
  PiCaretDoubleRight,
  PiCaretLeft,
  PiCaretRight,
  PiHandSwipeLeft,
  PiHouse,
  PiHouseFill,
  PiMagnifyingGlass,
  PiPlayFill,
} from 'react-icons/pi';

export function StudyNavigationButton({
  className,
  label,
  icon,
  iconActive,
  isActive,
  disabled,
  onClick,
}: Readonly<{
  className?: string;
  label: string;
  isActive?: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconActive: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  onClick?: () => void;
}>) {
  const Icon = isActive ? iconActive : icon;
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        //
        'flex',
        'items-center',
        'rounded-full',
        'flex',
        'flex-col',
        'gap-1',
        'p-2',
        'justify-center',
        // 'w-full',
        // 'h-full',
        'h-11',
        'w-11',
        'md:w-18',
        // 'aspect-square',
        'border-2',
        //
        disabled && 'cursor-not-allowed',
        !disabled && 'cursor-pointer',
        disabled && !isActive && 'opacity-20',
        //
        // !isActive && 'border-kartuli-color-primitive-neutral-500',
        'border-kartuli-color-primitive-neutral-500',
        //
        isActive && 'border-kartuli-color-primitive-neutral-900',
        isActive && 'bg-kartuli-color-primitive-neutral-900',
        !isActive && 'bg-kartuli-color-primitive-neutral-50',
        !isActive && !disabled && 'hover:bg-kartuli-color-primitive-neutral-500',
        'group',
        className,
      )}
    >
      <Icon
        className={cn(
          //
          'shrink-0',
          'size-6',
          !isActive && !disabled && 'group-active:size-8',
          'text-kartuli-color-primitive-neutral-500',
          isActive && 'text-kartuli-color-primitive-neutral-50',
          !isActive && !disabled && 'group-hover:text-kartuli-color-primitive-neutral-50',
        )}
      />
    </button>
  );
}

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
          'group-active:size-10',
          'text-kartuli-color-primitive-neutral-50',
        )}
      />
      <div
        className={cn(
          //
          'text-2xl',
          'group-active:text-3xl',
          'uppercase',
          'text-kartuli-color-primitive-neutral-50',
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
  const totalItems = 10;
  const [currentItem, setCurrentItem] = useState<number | 'summary'>('summary');
  const canGoPrevious = currentItem !== 'summary';
  const canGoNext = currentItem !== totalItems - 1;
  const canGoToSummary = currentItem !== 'summary';

  const handlePrevious = () => {
    if (!canGoPrevious) return;
    if (currentItem === 0) setCurrentItem('summary');
    else setCurrentItem(currentItem - 1);
  };
  const handleNext = () => {
    if (currentItem === 'summary') setCurrentItem(0);
    else setCurrentItem(currentItem + 1);
  };
  const handleGoToSummary = () => {
    if (!canGoToSummary) return;
    setCurrentItem('summary');
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

function StudyNavigationBar(props: Readonly<useStudyNavigationReturnType>) {
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
        'p-2',
        'flex',
        'items-center',
        'justify-around',
        'gap-4',
      )}
    >
      <div className="flex items-center justify-center gap-4">
        <StudyNavigationButton
          label="Summary"
          icon={PiHouse}
          iconActive={PiHouseFill}
          isActive={currentItem === 'summary'}
          disabled={!canGoToSummary}
          onClick={handleGoToSummary}
        />
        <StudyNavigationButton
          label="Previous"
          icon={PiCaretLeft}
          iconActive={PiCaretLeft}
          isActive={false}
          disabled={!canGoPrevious}
          onClick={handlePrevious}
        />
      </div>
      <div
        className={cn(
          //
          'w-full',
          'h-full',
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
        )}
      >
        <div
          className={cn(
            //
            'text-xl',
            'text-kartuli-color-primitive-neutral-900',
            'uppercase',
            'max-w-50 w-full',
            'h-full',
            'flex',
            'items-center',
            'justify-center',
            'rounded-full',
            'bg-kartuli-color-primitive-neutral-500',
            'text-kartuli-color-primitive-neutral-50',
          )}
        >
          {currentItem === 'summary' ? (
            <div>{totalItems} letters</div>
          ) : (
            <div>
              {currentItem + 1} / {totalItems}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <StudyNavigationButton
          label="Next"
          icon={PiCaretRight}
          iconActive={PiCaretRight}
          isActive={false}
          disabled={!canGoNext}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

function StudyScreen() {
  const studyNavigationProps = useStudyNavigation();

  const handlePlay = () => {
    // TODO: implement play
  };

  return (
    <div className="flex flex-col gap-0 grow h-full max-w-[600px] w-full mx-auto">
      <StudyNavigationBar {...studyNavigationProps} />
      {/* card container */}
      <div
        className={cn(
          //
          'flex grow w-full',
          'p-2',
        )}
      >
        {/* card */}
        <div
          className={cn(
            //
            'flex flex-col gap-2',
            'w-full',
            'h-full',
            'rounded-3xl',
            'border-2',
            'border-kartuli-color-primitive-neutral-500',
            'items-center',
            'justify-center',
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold">
              {studyNavigationProps.currentItem === 'summary'
                ? 'Summary'
                : studyNavigationProps.currentItem + 1}
            </div>
          </div>
        </div>
      </div>
      {/* cta button */}
      <div
        className={cn(
          //
          'flex w-full',
          'p-2',
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
