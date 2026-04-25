'use client';

import { Tooltip } from '@base-ui/react/tooltip';
import type { TranslitOutputSegment } from '@game-client/ui/screens/translit/translit-output-segments';
import {
  translitTooltipArrowClassName,
  translitTooltipArrowInnerClassName,
  translitTooltipPopupClassName,
} from '@game-client/ui/screens/translit/translit-tooltip-styles';
import { cn } from '@kartuli/ui/utils/cn';
import type { RefObject, UIEventHandler } from 'react';

type TranslitOutputProps = {
  ariaLabelledBy: string;
  className?: string;
  containerRef?: RefObject<HTMLDivElement | null>;
  lang: string;
  onScroll?: UIEventHandler<HTMLDivElement>;
  segments: TranslitOutputSegment[];
  tooltipClassName?: string;
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
}: Readonly<TranslitOutputProps>) {
  return (
    <section
      id="translit-output"
      ref={containerRef}
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
      onScroll={onScroll}
    >
      {segments.map((segment) => {
        if (segment.isWhitespace) {
          return <span key={segment.id}>{segment.outputText}</span>;
        }

        return (
          <Tooltip.Root key={segment.id}>
            <Tooltip.Trigger
              type="button"
              className={tokenTriggerClassName}
              style={{ color: 'inherit', font: 'inherit' }}
              aria-label={segment.outputText}
            >
              {segment.outputText}
            </Tooltip.Trigger>
            <Tooltip.Portal>
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
