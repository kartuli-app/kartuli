'use client';

import { cn } from '@kartuli/ui/utils/cn';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

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
const PATTERN_INITIAL_DELAY_SECONDS = 10;
const ROUND_FADE_IN_SECONDS = 0.1;
const ROUND_VISIBLE_SECONDS = 10;
const ROUND_FADE_OUT_SECONDS = 0.1;
const ROUND_IDLE_SECONDS = 0;
const ROUND_SLOT_DURATION_SECONDS =
  ROUND_FADE_IN_SECONDS + ROUND_VISIBLE_SECONDS + ROUND_FADE_OUT_SECONDS + ROUND_IDLE_SECONDS;
const PATTERN_ROUND_DURATION_SECONDS = ROUND_SLOT_DURATION_SECONDS;
const ROUND_FADE_OUT_END_PERCENT = (ROUND_FADE_OUT_SECONDS / PATTERN_ROUND_DURATION_SECONDS) * 100;
const ROUND_ENTER_END_PERCENT =
  ((ROUND_FADE_OUT_SECONDS + ROUND_FADE_IN_SECONDS) / PATTERN_ROUND_DURATION_SECONDS) * 100;

interface PatternCell {
  glyph: (typeof PATTERN_GLYPHS)[number];
  state: 'hidden' | 'visible' | 'entering' | 'exiting';
}

interface PatternRoundState {
  currentHiddenColumnsByRow: number[];
  previousHiddenColumnsByRow: Array<number | null>;
}

function getRandomArrayItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function getInitialPreviousHiddenColumns() {
  return new Array<number | null>(PATTERN_ROW_COUNT).fill(null);
}

function getAvailableHiddenColumns(
  previousHiddenColumn: number | null,
  previousRowHiddenColumn: number | null,
) {
  const availableHiddenColumns: number[] = [];

  for (let column = 0; column < PATTERN_COLUMN_COUNT; column += 1) {
    if (column !== previousHiddenColumn && column !== previousRowHiddenColumn) {
      availableHiddenColumns.push(column);
    }
  }

  return availableHiddenColumns;
}

function getNextHiddenColumns(previousHiddenColumns: Array<number | null>) {
  const nextHiddenColumns: number[] = [];

  for (const previousHiddenColumn of previousHiddenColumns) {
    const previousRowHiddenColumn = nextHiddenColumns.at(-1) ?? null;
    const availableHiddenColumns = getAvailableHiddenColumns(
      previousHiddenColumn,
      previousRowHiddenColumn,
    );
    nextHiddenColumns.push(getRandomArrayItem(availableHiddenColumns));
  }

  return nextHiddenColumns;
}

function getInitialRoundState(): PatternRoundState {
  const previousHiddenColumnsByRow = getInitialPreviousHiddenColumns();

  return {
    previousHiddenColumnsByRow,
    currentHiddenColumnsByRow: getNextHiddenColumns(previousHiddenColumnsByRow),
  };
}

function getNextRoundState(previousRoundState: PatternRoundState | null) {
  if (previousRoundState === null) {
    return previousRoundState;
  }

  return {
    previousHiddenColumnsByRow: previousRoundState.currentHiddenColumnsByRow,
    currentHiddenColumnsByRow: getNextHiddenColumns(previousRoundState.currentHiddenColumnsByRow),
  };
}

function getPatternCellState(
  column: number,
  currentHiddenColumn: number | null,
  previousHiddenColumn: number | null,
): PatternCell['state'] {
  if (currentHiddenColumn === null) {
    return 'hidden';
  }

  if (column === currentHiddenColumn) {
    return previousHiddenColumn === null ? 'hidden' : 'exiting';
  }

  if (previousHiddenColumn === null || column === previousHiddenColumn) {
    return 'entering';
  }

  return 'visible';
}

function getPatternCells(roundState: PatternRoundState | null): PatternCell[] {
  return Array.from({ length: PATTERN_ROW_COUNT * PATTERN_COLUMN_COUNT }, (_, index) => {
    const row = Math.floor(index / PATTERN_COLUMN_COUNT);
    const column = index % PATTERN_COLUMN_COUNT;
    const currentHiddenColumn = roundState?.currentHiddenColumnsByRow[row] ?? null;
    const previousHiddenColumn = roundState?.previousHiddenColumnsByRow[row] ?? null;

    return {
      glyph: PATTERN_GLYPHS[index % PATTERN_GLYPHS.length],
      state: getPatternCellState(column, currentHiddenColumn, previousHiddenColumn),
    };
  });
}

function getPatternCellClassName(state: PatternCell['state']) {
  return cn(
    'explore-alphabet-pattern__glyph',
    'font-georgian',
    state === 'visible' && 'explore-alphabet-pattern__glyph--visible',
    state === 'entering' && 'explore-alphabet-pattern__glyph--entering',
    state === 'exiting' && 'explore-alphabet-pattern__glyph--exiting',
  );
}

interface PatternCssVariables extends CSSProperties {
  '--pattern-background-color': string;
  '--pattern-base-color': string;
  '--pattern-cell-size': string;
  '--pattern-font-size': string;
  '--pattern-highlight-color': string;
  '--pattern-round-duration': string;
}

const patternCssVariables: PatternCssVariables = {
  '--pattern-background-color': 'white',
  '--pattern-base-color': 'white',
  '--pattern-cell-size': '3rem',
  '--pattern-font-size': '1.5rem',
  '--pattern-highlight-color': 'var(--color-slate-200)',
  '--pattern-round-duration': `${PATTERN_ROUND_DURATION_SECONDS}s`,
  backgroundColor: 'var(--pattern-background-color)',
};

export function Pattern() {
  const [roundState, setRoundState] = useState<PatternRoundState | null>(null);

  useEffect(() => {
    let roundIntervalId: ReturnType<typeof globalThis.setInterval> | undefined;

    const initialDelayTimeoutId = globalThis.setTimeout(() => {
      setRoundState(getInitialRoundState());
      roundIntervalId = globalThis.setInterval(() => {
        setRoundState(getNextRoundState);
      }, ROUND_SLOT_DURATION_SECONDS * 1000);
    }, PATTERN_INITIAL_DELAY_SECONDS * 1000);

    return () => {
      globalThis.clearTimeout(initialDelayTimeoutId);

      if (roundIntervalId !== undefined) {
        globalThis.clearInterval(roundIntervalId);
      }
    };
  }, []);

  const patternCells = getPatternCells(roundState);

  return (
    <div
      aria-hidden="true"
      className={cn(
        //
        'relative',
        'flex-1',
        'overflow-hidden',
      )}
      style={patternCssVariables}
    >
      <div
        className={cn(
          //
          'explore-alphabet-pattern__matrix',
          'grid',
          'h-full',
          'w-full',
          'content-start',
          'justify-start',
        )}
      >
        {patternCells.map((cell, index) => {
          return (
            <span key={`${cell.glyph}-${index}`} className={getPatternCellClassName(cell.state)}>
              {cell.glyph}
            </span>
          );
        })}
      </div>

      <style>{`
        .explore-alphabet-pattern__matrix {
          grid-template-columns: repeat(${PATTERN_COLUMN_COUNT}, minmax(0, 1fr));
          grid-auto-rows: var(--pattern-cell-size);
          font-size: var(--pattern-font-size);
          color: var(--pattern-base-color);
        }

        .explore-alphabet-pattern__glyph {
          display: grid;
          place-items: center;
          line-height: 1;
          user-select: none;
          text-align: center;
          color: var(--pattern-base-color);
        }

        .explore-alphabet-pattern__glyph--visible {
          color: var(--pattern-highlight-color);
        }

        .explore-alphabet-pattern__glyph--entering {
          animation-name: explore-alphabet-pattern-enter;
          animation-duration: var(--pattern-round-duration);
          animation-timing-function: linear;
          animation-iteration-count: 1;
        }

        .explore-alphabet-pattern__glyph--exiting {
          animation-name: explore-alphabet-pattern-exit;
          animation-duration: var(--pattern-round-duration);
          animation-timing-function: linear;
          animation-iteration-count: 1;
        }

        @keyframes explore-alphabet-pattern-enter {
          0%,
          ${ROUND_FADE_OUT_END_PERCENT.toFixed(2)}% {
            color: var(--pattern-base-color);
          }

          ${ROUND_ENTER_END_PERCENT.toFixed(2)}%,
          100% {
            color: var(--pattern-highlight-color);
          }
        }

        @keyframes explore-alphabet-pattern-exit {
          0% {
            color: var(--pattern-highlight-color);
          }

          ${ROUND_FADE_OUT_END_PERCENT.toFixed(2)}%,
          100% {
            color: var(--pattern-base-color);
          }
        }
      `}</style>
    </div>
  );
}
