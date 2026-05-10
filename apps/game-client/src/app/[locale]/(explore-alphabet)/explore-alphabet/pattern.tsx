import type { CSSProperties } from 'react';

// Keep this list editable so the decorative pattern can follow the learning script.
const PATTERN_GLYPHS = [
  'ა',
  'ბ',
  'გ',
  'დ',
  'ე',
  'ვ',
  'ზ',
  'თ',
  'ი',
  'კ',
  'ლ',
  'მ',
  'ნ',
  'ო',
  'პ',
  'ჟ',
  'რ',
  'ს',
  'ტ',
  'უ',
  'ფ',
  'ქ',
  'ღ',
  'ყ',
  'შ',
  'ჩ',
  'ც',
  'ძ',
  'წ',
  'ჭ',
  'ხ',
  'ჯ',
  'ჰ',
] as const;

const PATTERN_COLUMN_COUNT = 5;
const PATTERN_ROW_COUNT = 22;
const PATTERN_CELL_COUNT = PATTERN_COLUMN_COUNT * PATTERN_ROW_COUNT;

interface PatternCssVariables extends CSSProperties {
  '--pattern-background-color': string;
  '--pattern-cell-size': string;
  '--pattern-font-size': string;
  '--pattern-glyph-color': string;
}

const patternCssVariables: PatternCssVariables = {
  '--pattern-background-color': 'var(--kartuli-color-component-pattern-background)',
  '--pattern-cell-size': '3rem',
  '--pattern-font-size': '1.5rem',
  '--pattern-glyph-color': 'var(--kartuli-color-component-pattern-highlight)',
  backgroundColor: 'var(--pattern-background-color)',
};

const patternCells = Array.from({ length: PATTERN_CELL_COUNT }, (_, index) => {
  return PATTERN_GLYPHS[index % PATTERN_GLYPHS.length];
});

export function Pattern() {
  return (
    <div aria-hidden="true" className="relative flex-1 overflow-hidden" style={patternCssVariables}>
      <div
        className="grid h-full w-full content-start justify-start text-center font-georgian leading-none select-none"
        style={{
          gridTemplateColumns: `repeat(${PATTERN_COLUMN_COUNT}, minmax(0, 1fr))`,
          gridAutoRows: 'var(--pattern-cell-size)',
          fontSize: 'var(--pattern-font-size)',
        }}
      >
        {patternCells.map((glyph, index) => {
          return (
            <span
              key={`${glyph}-${index}`}
              className="grid place-items-center"
              style={{ color: 'var(--pattern-glyph-color)' }}
            >
              {glyph}
            </span>
          );
        })}
      </div>
    </div>
  );
}
