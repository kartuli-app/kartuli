'use client';

import { Tooltip } from '@base-ui/react/tooltip';
import { tooltipPopupClassName } from '@game-client/ui/components/tooltip';
import type { TranslitOutputSegment } from '@game-client/ui/screens/translit/translit-output-segments';
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
  'inline',
  'cursor-help',
  'border-0',
  'bg-transparent',
  'p-0',
  'text-left',
  'whitespace-pre-wrap',
  'break-words',
  'hover:bg-gray-200',
  'focus-visible:bg-gray-200',
  'data-[popup-open]:bg-gray-200',
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
        'h-64',
        'w-full',
        'overflow-auto',
        'whitespace-pre-wrap',
        'break-words',
        'border',
        'p-2',
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
                <Tooltip.Popup className={cn(tooltipPopupClassName, tooltipClassName)}>
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
