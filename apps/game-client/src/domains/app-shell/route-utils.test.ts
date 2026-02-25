import { describe, expect, it } from 'vitest';
import { parseRoute } from './route-utils';

describe('parseRoute', () => {
  it('returns home for /en', () => {
    expect(parseRoute('/en')).toEqual({ view: 'home' });
    expect(parseRoute('/en/')).toEqual({ view: 'home' });
  });

  it('returns debug for /en/debug', () => {
    expect(parseRoute('/en/debug')).toEqual({ view: 'debug' });
  });

  it('returns user for /en/user', () => {
    expect(parseRoute('/en/user')).toEqual({ view: 'user' });
  });

  it('returns learn with lessonId for /en/learn/:id', () => {
    expect(parseRoute('/en/learn/lesson-1')).toEqual({
      view: 'learn',
      lessonId: 'lesson-1',
    });
    expect(parseRoute('/en/learn/lesson-2')).toEqual({
      view: 'learn',
      lessonId: 'lesson-2',
    });
  });

  it('returns game with lessonId for /en/game/:id', () => {
    expect(parseRoute('/en/game/lesson-1')).toEqual({
      view: 'game',
      lessonId: 'lesson-1',
    });
  });

  it('returns null for non-en or unknown paths', () => {
    expect(parseRoute('/')).toBeNull();
    expect(parseRoute('/ru')).toBeNull();
    expect(parseRoute('/en/learn')).toBeNull();
    expect(parseRoute('/en/game')).toBeNull();
  });

  it('returns null for debug/user with extra segments', () => {
    expect(parseRoute('/en/debug/extra')).toBeNull();
    expect(parseRoute('/en/user/profile')).toBeNull();
  });
});
