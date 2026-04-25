import { describe, expect, it } from 'vitest';
import { getTranslitOutputSegments } from './translit-output-segments';

describe('getTranslitOutputSegments', () => {
  it('keeps alternating text and space runs aligned', () => {
    expect(getTranslitOutputSegments('ფ პ', "p' p")).toEqual([
      { id: "0:ფ:p'", sourceText: 'ფ', outputText: "p'", isWhitespace: false },
      { id: '1: : ', sourceText: ' ', outputText: ' ', isWhitespace: true },
      { id: '2:პ:p', sourceText: 'პ', outputText: 'p', isWhitespace: false },
    ]);
  });

  it('preserves repeated spaces as dedicated whitespace segments', () => {
    expect(getTranslitOutputSegments('ა  ბ', 'a  b')).toEqual([
      { id: '0:ა:a', sourceText: 'ა', outputText: 'a', isWhitespace: false },
      { id: '1:  :  ', sourceText: '  ', outputText: '  ', isWhitespace: true },
      { id: '2:ბ:b', sourceText: 'ბ', outputText: 'b', isWhitespace: false },
    ]);
  });

  it('keeps punctuation attached to the surrounding token', () => {
    expect(getTranslitOutputSegments('გამარჯობა.', 'gamarjoba.')).toEqual([
      {
        id: '0:გამარჯობა.:gamarjoba.',
        sourceText: 'გამარჯობა.',
        outputText: 'gamarjoba.',
        isWhitespace: false,
      },
    ]);
  });

  it('treats line breaks as their own whitespace segments alongside spaces', () => {
    expect(getTranslitOutputSegments('აბ\nგდ ე', 'ab\ngd e')).toEqual([
      { id: '0:აბ:ab', sourceText: 'აბ', outputText: 'ab', isWhitespace: false },
      { id: '1:\n:\n', sourceText: '\n', outputText: '\n', isWhitespace: true },
      { id: '2:გდ:gd', sourceText: 'გდ', outputText: 'gd', isWhitespace: false },
      { id: '3: : ', sourceText: ' ', outputText: ' ', isWhitespace: true },
      { id: '4:ე:e', sourceText: 'ე', outputText: 'e', isWhitespace: false },
    ]);
  });
});
