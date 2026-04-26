'use client';

import { Tooltip } from '@base-ui/react/tooltip';
import type { TranslitOutputSegment } from '@game-client/ui/screens/translit/translit-output-segments';
import {
  translitTooltipArrowClassName,
  translitTooltipArrowInnerClassName,
  translitTooltipPopupClassName,
} from '@game-client/ui/screens/translit/translit-tooltip-styles';
import { cn } from '@kartuli/ui/utils/cn';
import { type RefObject, type UIEventHandler, useEffect, useRef, useState } from 'react';

type TranslitOutputProps = {
  ariaLabelledBy: string;
  className?: string;
  containerRef?: RefObject<HTMLElement | null>;
  lang: string;
  onScroll?: UIEventHandler<HTMLDivElement>;
  segments: TranslitOutputSegment[];
  tooltipClassName?: string;
  tooltipPortalContainer?: RefObject<HTMLElement | null>;
};

const tokenTriggerClassName = cn(
  'inline',
  'cursor-help',
  'rounded-sm',
  'bg-transparent',
  'border-0',
  'p-0',
  'align-baseline',
  'text-left',
  'whitespace-pre-wrap',
  'break-words',
  'transition-colors',
  'duration-150',
  'hover:bg-ds1-color-primary-100',
  'focus-visible:bg-ds1-color-primary-100',
  'data-[popup-open]:bg-ds1-color-primary-100',
  'focus:outline-none',
  'focus-ring',
);

export function TranslitOutput({
  ariaLabelledBy,
  className,
  containerRef,
  lang,
  onScroll,
  segments,
  tooltipClassName,
  tooltipPortalContainer,
}: Readonly<TranslitOutputProps>) {
  const [usesTapInteraction, setUsesTapInteraction] = useState(false);
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');

    const updateInteractionMode = () => {
      setUsesTapInteraction(mediaQuery.matches);
      setActiveSegmentId(null);
    };

    updateInteractionMode();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateInteractionMode);

      return () => {
        mediaQuery.removeEventListener('change', updateInteractionMode);
      };
    }

    mediaQuery.addListener(updateInteractionMode);

    return () => {
      mediaQuery.removeListener(updateInteractionMode);
    };
  }, []);

  useEffect(() => {
    if (!usesTapInteraction) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (sectionRef.current?.contains(event.target as Node)) {
        return;
      }

      setActiveSegmentId(null);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [usesTapInteraction]);

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    if (usesTapInteraction) {
      setActiveSegmentId(null);
    }

    onScroll?.(event);
  };

  return (
    <section
      id="translit-output"
      ref={(node) => {
        sectionRef.current = node;

        if (containerRef) {
          (containerRef as { current: HTMLElement | null }).current = node;
        }
      }}
      lang={lang}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'w-full',
        'h-full',
        'min-h-0',
        'overflow-auto',
        'text-left',
        'align-top',
        'text-2xl',
        'p-ds1-spacing-large',
        'rounded-lg',
        'border-2',
        'border-ds1-color-text-200',
        'whitespace-pre-wrap',
        'wrap-break-word',
        className,
      )}
      onScroll={handleScroll}
    >
      {segments.map((segment) => {
        if (segment.isWhitespace) {
          return <span key={segment.id}>{segment.outputText}</span>;
        }

        const isActive = activeSegmentId === segment.id;

        return (
          <Tooltip.Root
            key={segment.id}
            open={isActive}
            onOpenChange={
              usesTapInteraction
                ? undefined
                : (open: boolean) => {
                    setActiveSegmentId((currentActiveSegmentId) =>
                      open
                        ? segment.id
                        : currentActiveSegmentId === segment.id
                          ? null
                          : currentActiveSegmentId,
                    );
                  }
            }
          >
            <Tooltip.Trigger
              type="button"
              closeOnClick={false}
              disabled={usesTapInteraction}
              className={cn(tokenTriggerClassName, isActive && 'bg-ds1-color-primary-100')}
              style={{ color: 'inherit', font: 'inherit' }}
              aria-label={segment.outputText}
              aria-expanded={usesTapInteraction ? isActive : undefined}
              onClick={
                usesTapInteraction
                  ? () => {
                      setActiveSegmentId((currentActiveSegmentId) =>
                        currentActiveSegmentId === segment.id ? null : segment.id,
                      );
                    }
                  : undefined
              }
            >
              {segment.outputText}
            </Tooltip.Trigger>
            <Tooltip.Portal container={tooltipPortalContainer}>
              <Tooltip.Positioner side="top" sideOffset={12}>
                <Tooltip.Popup className={cn(translitTooltipPopupClassName, tooltipClassName)}>
                  <Tooltip.Arrow className={translitTooltipArrowClassName}>
                    <div className={translitTooltipArrowInnerClassName} />
                  </Tooltip.Arrow>
                  <span>{segment.sourceText}</span>
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        );
      })}
    </section>
  );
}
