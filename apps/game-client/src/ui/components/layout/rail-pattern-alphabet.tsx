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

const patternCells = Array.from({ length: PATTERN_CELL_COUNT }, (_, index) => {
  return PATTERN_GLYPHS[index % PATTERN_GLYPHS.length];
});

export function RailPatternAlphabet() {
  return (
    <div aria-hidden="true" className="relative flex-1 overflow-hidden">
      <div
        className="grid h-full w-full content-start justify-start text-center font-georgian leading-none select-none"
        style={{
          gridTemplateColumns: `repeat(${PATTERN_COLUMN_COUNT}, minmax(0, 1fr))`,
          gridAutoRows: '3rem',
          fontSize: '1.5rem',
        }}
      >
        {patternCells.map((glyph, index) => {
          return (
            <span
              key={`${glyph}-${index}`}
              className="grid place-items-center text-s-color-shell-content-decoration"
            >
              {glyph}
            </span>
          );
        })}
      </div>
    </div>
  );
}
