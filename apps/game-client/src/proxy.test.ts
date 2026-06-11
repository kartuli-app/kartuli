import { config } from '@game-client/proxy';
import { describe, expect, it } from 'vitest';

function createMatcherRegExp(matcher: string): RegExp {
  return new RegExp(`^${matcher}$`);
}

describe('proxy matcher', () => {
  it('does not match public sound asset paths', () => {
    const matcher = config.matcher[0];

    expect(matcher).toBeDefined();
    expect(
      createMatcherRegExp(matcher as string).test('/sounds/speech/letters/letter-eni.mp3'),
    ).toBe(false);
  });

  it('still matches non-localized application routes', () => {
    const matcher = config.matcher[0];

    expect(matcher).toBeDefined();
    expect(
      createMatcherRegExp(matcher as string).test('/lessons/lesson-alphabet-vowels/study'),
    ).toBe(true);
  });
});
