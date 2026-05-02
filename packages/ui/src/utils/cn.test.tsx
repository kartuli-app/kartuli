import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges tailwind classes and keeps the latest conflicting utility', () => {
    expect(cn('px-ds1-spacing-small', 'px-ds1-spacing-large', 'flex')).toBe(
      'px-ds1-spacing-large flex',
    );
  });

  it('drops falsey values', () => {
    expect(cn(false, null, undefined, 'text-sm')).toBe('text-sm');
  });
});
