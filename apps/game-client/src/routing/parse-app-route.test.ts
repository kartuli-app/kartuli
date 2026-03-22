import { describe, expect, it } from 'vitest';
import { parseAppRoute } from './parse-app-route';

describe('parseAppRoute', () => {
  it('returns home for /en', () => {
    expect(parseAppRoute('/en')).toEqual({ view: 'home' });
    expect(parseAppRoute('/en/')).toEqual({ view: 'home' });
  });

  it('returns debug for /en/debug', () => {
    expect(parseAppRoute('/en/debug')).toEqual({ view: 'debug' });
  });

  it('returns user for /en/user', () => {
    expect(parseAppRoute('/en/user')).toEqual({ view: 'user' });
  });

  it('returns learn with lessonId for /en/learn/:id', () => {
    expect(parseAppRoute('/en/learn/lesson-1')).toEqual({
      view: 'learn',
      lessonId: 'lesson-1',
    });
    expect(parseAppRoute('/en/learn/lesson-2')).toEqual({
      view: 'learn',
      lessonId: 'lesson-2',
    });
  });

  it('returns game with lessonId for /en/game/:id', () => {
    expect(parseAppRoute('/en/game/lesson-1')).toEqual({
      view: 'game',
      lessonId: 'lesson-1',
    });
  });

  it('returns home for /ru', () => {
    expect(parseAppRoute('/ru')).toEqual({ view: 'home' });
    expect(parseAppRoute('/ru/')).toEqual({ view: 'home' });
  });

  it('returns debug for /ru/debug', () => {
    expect(parseAppRoute('/ru/debug')).toEqual({ view: 'debug' });
  });

  it('returns learn with lessonId for /ru/learn/:id', () => {
    expect(parseAppRoute('/ru/learn/lesson-1')).toEqual({
      view: 'learn',
      lessonId: 'lesson-1',
    });
  });

  it('returns user for /ru/user', () => {
    expect(parseAppRoute('/ru/user')).toEqual({ view: 'user' });
  });

  it('returns game with lessonId for /ru/game/:id', () => {
    expect(parseAppRoute('/ru/game/lesson-2')).toEqual({
      view: 'game',
      lessonId: 'lesson-2',
    });
  });

  it('returns null for unsupported locale or unknown paths', () => {
    expect(parseAppRoute('/')).toBeNull();
    expect(parseAppRoute('/fr')).toBeNull();
    expect(parseAppRoute('/de')).toBeNull();
    expect(parseAppRoute('/en/learn')).toBeNull();
    expect(parseAppRoute('/en/game')).toBeNull();
  });

  it('returns null for debug/user with extra segments', () => {
    expect(parseAppRoute('/en/debug/extra')).toBeNull();
    expect(parseAppRoute('/en/user/profile')).toBeNull();
  });
});
