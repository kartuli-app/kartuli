import { describe, expect, it } from 'vitest';
import { getTranslitOutputSegments } from './translit-output-segments';

function segment(id: string, sourceText: string, outputText: string, isWhitespace: boolean) {
  return { id, sourceText, outputText, isWhitespace };
}

describe('getTranslitOutputSegments', () => {
  it('keeps alternating text and space runs aligned', () => {
    expect(getTranslitOutputSegments('ფ პ', "p' p")).toEqual([
      segment("0:ფ:p'", 'ფ', "p'", false),
      segment('1: : ', ' ', ' ', true),
      segment('2:პ:p', 'პ', 'p', false),
    ]);
  });

  it('preserves repeated spaces as dedicated whitespace segments', () => {
    expect(getTranslitOutputSegments('ა  ბ', 'a  b')).toEqual([
      segment('0:ა:a', 'ა', 'a', false),
      segment('1:  :  ', '  ', '  ', true),
      segment('2:ბ:b', 'ბ', 'b', false),
    ]);
  });

  it('keeps punctuation attached to the surrounding token', () => {
    expect(getTranslitOutputSegments('გამარჯობა.', 'gamarjoba.')).toEqual([
      segment('0:გამარჯობა.:gamarjoba.', 'გამარჯობა.', 'gamarjoba.', false),
    ]);
  });

  it('treats line breaks as their own whitespace segments alongside spaces', () => {
    expect(getTranslitOutputSegments('აბ\nგდ ე', 'ab\ngd e')).toEqual([
      segment('0:აბ:ab', 'აბ', 'ab', false),
      segment('1:\n:\n', '\n', '\n', true),
      segment('2:გდ:gd', 'გდ', 'gd', false),
      segment('3: : ', ' ', ' ', true),
      segment('4:ე:e', 'ე', 'e', false),
    ]);
  });

  it('pads the shorter side with empty strings when segment counts differ', () => {
    expect(getTranslitOutputSegments('ფ', '')).toEqual([segment('0:ფ:', 'ფ', '', false)]);
  });

  it('treats tabs and non-breaking spaces as whitespace segments', () => {
    expect(getTranslitOutputSegments('a\tb', 'a\u00A0b')).toEqual([
      segment('0:a:a', 'a', 'a', false),
      segment('1:\t: ', '\t', '\u00A0', true),
      segment('2:b:b', 'b', 'b', false),
    ]);
  });
});
