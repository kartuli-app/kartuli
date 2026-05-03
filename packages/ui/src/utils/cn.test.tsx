import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges tailwind classes and keeps the latest conflicting utility', () => {
    expect(cn('px-spacing-token-test-small', 'px-spacing-token-test-big', 'flex')).toBe(
      'px-spacing-token-test-big flex',
    );
  });

  it('drops falsey values', () => {
    expect(cn(false, null, undefined, 'text-sm')).toBe('text-sm');
  });
});
