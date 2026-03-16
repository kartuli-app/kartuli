export type MultitypeItemType = 'letter' | 'word';

export interface MultitypeLetterItemRow {
  id: string;
  type: 'letter';
  targetScript: string;
  transliteration: string;
  pronunciationHint: string;
  soundCategory: string;
}

export interface MultitypeWordItemRow {
  id: string;
  type: 'word';
  targetScript: string;
  translation: string;
}

export type MultitypeItemRow = MultitypeLetterItemRow | MultitypeWordItemRow;
