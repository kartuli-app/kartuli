import { render, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GamePage } from './game-page';

describe('GamePage', () => {
  it('renders Game heading and lesson id', () => {
    const { container } = render(<GamePage lessonId="lesson-1" />);
    expect(document.contains(within(container).getByRole('heading', { name: /game/i }))).toBe(true);
    expect(within(container).getByTestId('game-lesson-id').textContent).toContain('lesson-1');
  });

  it('has Back button', () => {
    const { container } = render(<GamePage lessonId="lesson-2" />);
    expect(document.contains(within(container).getByRole('button', { name: /back/i }))).toBe(true);
  });
});
