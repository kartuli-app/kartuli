import { describe, expect, it } from 'vitest';
import { getHighlightedTextSegments } from './get-highlighted-text-segments';

describe('getHighlightedTextSegments', () => {
  it('highlights every repeated single-character occurrence', () => {
    expect(getHighlightedTextSegments('tattoo', 't')).toEqual([
      { text: 't', highlighted: true },
      { text: 'a', highlighted: false },
      { text: 't', highlighted: true },
      { text: 't', highlighted: true },
      { text: 'oo', highlighted: false },
    ]);
  });

  it('highlights repeated multi-character matches case-insensitively', () => {
    expect(getHighlightedTextSegments('Church', 'ch')).toEqual([
      { text: 'Ch', highlighted: true },
      { text: 'ur', highlighted: false },
      { text: 'ch', highlighted: true },
    ]);
  });

  it('returns the full text unchanged when there is no match', () => {
    expect(getHighlightedTextSegments('metro', 'x')).toEqual([
      { text: 'metro', highlighted: false },
    ]);
  });
});
