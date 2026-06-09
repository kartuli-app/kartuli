'use client';

import { cn } from '@kartuli/ui/utils/cn';
import { Fragment } from 'react';
import { getHighlightedTextSegments } from './get-highlighted-text-segments';

export function HighlightedText({
  highlight,
  text,
  className,
}: Readonly<{
  highlight: string;
  text: string;
  className?: string;
}>) {
  const segments = getHighlightedTextSegments(text, highlight);
  let currentOffset = 0;

  return (
    <>
      {segments.map((segment) => {
        const segmentStart = currentOffset;
        const segmentEnd = segmentStart + segment.text.length;
        currentOffset = segmentEnd;

        return (
          <Fragment key={`${segmentStart}-${segmentEnd}-${segment.highlighted}`}>
            {segment.highlighted ? (
              <strong className={cn('font-bold text-s-color-panel-content-primary', className)}>
                {segment.text}
              </strong>
            ) : (
              segment.text
            )}
          </Fragment>
        );
      })}
    </>
  );
}
