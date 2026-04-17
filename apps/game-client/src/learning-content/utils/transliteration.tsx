import type { CommonLetterItem } from '@game-client/learning-content/ingestion/common-data/common-data';

export const getStringTransliterationFromTargetScript = (
  commonLetterItemsByTargetScript: Map<string, CommonLetterItem>,
  string: string,
): string => {
  const characters = string.split('');
  let transliteration = '';
  for (const character of characters) {
    const letter = commonLetterItemsByTargetScript.get(character);
    transliteration = `${transliteration}${letter?.transliteration ?? character}`;
  }
  return transliteration;
};

export const getStringTransliterationFromLatin = (
  commonLetterItemsByTransliteration: Map<string, CommonLetterItem>,
  string: string,
): string => {
  const apostropheLike = /[\u2018\u2019\u02BC\u2032\u00B4`]/g;
  const normalizedString = string.replaceAll(apostropheLike, "'").toLowerCase();

  let transliteration = '';
  let cursor = 0;
  while (cursor < normalizedString.length) {
    const transliteration3Chars = normalizedString.slice(cursor, cursor + 3);
    const letter3Chars = commonLetterItemsByTransliteration.get(transliteration3Chars);
    if (letter3Chars) {
      transliteration = `${transliteration}${letter3Chars.targetScript}`;
      cursor += 3;
      continue;
    }

    const transliteration2Chars = normalizedString.slice(cursor, cursor + 2);
    const letter2Chars = commonLetterItemsByTransliteration.get(transliteration2Chars);
    if (letter2Chars) {
      transliteration = `${transliteration}${letter2Chars.targetScript}`;
      cursor += 2;
      continue;
    }

    const transliteration1Char = normalizedString.slice(cursor, cursor + 1);
    const letter1Char = commonLetterItemsByTransliteration.get(transliteration1Char);
    if (letter1Char) {
      transliteration = `${transliteration}${letter1Char.targetScript}`;
      cursor += 1;
      continue;
    }

    transliteration = `${transliteration}${normalizedString[cursor]}`;
    cursor += 1;
  }

  return transliteration;
};
