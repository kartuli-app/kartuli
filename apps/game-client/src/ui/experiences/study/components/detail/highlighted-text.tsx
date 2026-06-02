'use client';

import { Fragment } from 'react';
import { getHighlightedTextSegments } from './get-highlighted-text-segments';

export function HighlightedText({
  highlight,
  text,
}: Readonly<{
  highlight: string;
  text: string;
}>) {
  const segments = getHighlightedTextSegments(text, highlight);

  return (
    <>
      {segments.map((segment, segmentIndex) => (
        <Fragment key={`${text}-${segmentIndex}`}>
          {segment.highlighted ? (
            <strong className="font-bold text-s-color-panel-content-primary">{segment.text}</strong>
          ) : (
            segment.text
          )}
        </Fragment>
      ))}
    </>
  );
}
