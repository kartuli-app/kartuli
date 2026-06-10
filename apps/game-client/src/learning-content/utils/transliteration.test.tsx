import type { CommonLetterItem } from '@game-client/learning-content/ingestion/common-data/common-data';
import { describe, expect, it } from 'vitest';
import { getStringTransliterationFromLatin, normalizeTransliterationKey } from './transliteration';

const ejectiveLetter: CommonLetterItem = {
  id: 'letter-p-prime-ari',
  targetScript: 'პ',
  name: 'p’ari',
  slug: 'p-prime-ari',
  transliteration: 'p’',
  soundCategory: 'ejective',
  audioKey: 'letter-p-prime-ari',
  source: 'common',
  type: 'letter',
};

describe('normalizeTransliterationKey', () => {
  it('normalizes apostrophe-like marks to a stable lookup key', () => {
    expect(normalizeTransliterationKey("p'")).toBe("p'");
    expect(normalizeTransliterationKey('p’')).toBe("p'");
    expect(normalizeTransliterationKey('Pʼ')).toBe("p'");
  });
});

describe('getStringTransliterationFromLatin', () => {
  it('accepts ascii apostrophes for letters stored with curly prime transliteration', () => {
    const lettersByTransliteration = new Map<string, CommonLetterItem>([
      [normalizeTransliterationKey(ejectiveLetter.transliteration), ejectiveLetter],
    ]);

    expect(getStringTransliterationFromLatin(lettersByTransliteration, "p'")).toBe('პ');
    expect(getStringTransliterationFromLatin(lettersByTransliteration, 'p’')).toBe('პ');
  });
});
