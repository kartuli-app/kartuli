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
  onScroll?: UIEventHandler<HTMLElement>;
  segments: TranslitOutputSegment[];
  tooltipClassName?: string;
  tooltipPortalContainer?: RefObject<HTMLElement | null>;
};

const tokenTriggerClassName = cn(
  'focus-ring',
  'inline',
  'cursor-help',
  'rounded-sm',
  'border-0',
  'bg-transparent',
  'p-0',
  'text-left',
  'align-baseline',
  'whitespace-pre-wrap',
  'break-words',
  'transition-colors',
  'duration-150',
  'hover:bg-gray-200',
  'focus-visible:bg-gray-200',
  'data-[popup-open]:bg-gray-200',
  'focus:outline-none',
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
    const mediaQuery = globalThis.matchMedia('(hover: none), (pointer: coarse)');

    const updateInteractionMode = () => {
      setUsesTapInteraction(mediaQuery.matches);
      setActiveSegmentId(null);
    };

    updateInteractionMode();

    mediaQuery.addEventListener('change', updateInteractionMode);

    return () => {
      mediaQuery.removeEventListener('change', updateInteractionMode);
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

  const handleScroll: UIEventHandler<HTMLElement> = (event) => {
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
          containerRef.current = node;
        }
      }}
      lang={lang}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'h-full',
        'min-h-0',
        'w-full',
        'overflow-auto',
        'whitespace-pre-wrap',
        'break-words',
        'border',
        'p-4',
        'text-left',
        'align-top',
        'text-2xl',
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
                    setActiveSegmentId((currentActiveSegmentId) => {
                      if (open) {
                        return segment.id;
                      }
                      if (currentActiveSegmentId === segment.id) {
                        return null;
                      }
                      return currentActiveSegmentId;
                    });
                  }
            }
          >
            <Tooltip.Trigger
              type="button"
              closeOnClick={false}
              disabled={usesTapInteraction}
              className={cn(tokenTriggerClassName, isActive && 'bg-gray-200')}
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
