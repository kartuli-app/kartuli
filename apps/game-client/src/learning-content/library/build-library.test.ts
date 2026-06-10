import type { CommonData } from '@game-client/learning-content/ingestion/common-data/common-data';
import type { LocalizedData } from '@game-client/learning-content/ingestion/localized-data/localized-data';
import { describe, expect, it } from 'vitest';
import { buildLibrary } from './build-library';

const commonData: CommonData = {
  commonModules: [],
  commonLessons: [],
  commonLetterItems: [
    {
      id: 'letter-ani',
      targetScript: 'ა',
      transliteration: 'a',
      soundCategory: 'vowel',
      source: 'common',
      type: 'letter',
    },
    {
      id: 'letter-bani',
      targetScript: 'ბ',
      transliteration: 'b',
      soundCategory: 'stop',
      source: 'common',
      type: 'letter',
    },
  ],
  commonWordItems: [],
};

describe('buildLibrary', () => {
  it('maps localized letter notes onto library letter items', () => {
    const localizedData: LocalizedData = {
      localizedModules: [],
      localizedLessons: [],
      localizedLetterItems: [
        {
          id: 'letter-ani',
          notes: [
            {
              kind: 'pronunciation_hint',
              highlight: 'a',
              examples: ['father', 'spa'],
            },
            {
              kind: 'info_text',
              text: 'Short note',
            },
          ],
          source: 'localized',
          type: 'letter',
        },
        {
          id: 'letter-bani',
          source: 'localized',
          type: 'letter',
        },
      ],
      localizedWordItems: [],
    };

    const library = buildLibrary(commonData, localizedData);

    expect(library.letterItems).toHaveLength(2);
    expect(library.letterItemsById.get('letter-ani')).toMatchObject({
      id: 'letter-ani',
      transliteration: 'a',
      notes: [
        {
          kind: 'pronunciation_hint',
          highlight: 'a',
          examples: ['father', 'spa'],
        },
        {
          kind: 'info_text',
          text: 'Short note',
        },
      ],
    });
    expect(library.letterItemsById.get('letter-bani')?.notes).toEqual([]);
  });
});
