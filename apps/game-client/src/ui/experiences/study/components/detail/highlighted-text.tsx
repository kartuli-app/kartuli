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

  return (
    <>
      {segments.map((segment, segmentIndex) => (
        <Fragment key={`${text}-${segmentIndex}`}>
          {segment.highlighted ? (
            <strong className={cn('font-bold text-s-color-panel-content-primary', className)}>
              {segment.text}
            </strong>
          ) : (
            segment.text
          )}
        </Fragment>
      ))}
    </>
  );
}
