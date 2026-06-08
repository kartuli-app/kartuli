import type { LetterItem } from '@game-client/learning-content/library/library';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { LetterStudyDetailSlide } from './letter-study-detail-slide';

const item: LetterItem = {
  id: 'letter-ani',
  targetScript: 'ა',
  transliteration: 'a',
  notes: [
    {
      kind: 'pronunciation_hint',
      highlight: 'a',
      examples: ['father', 'spa'],
    },
  ],
  soundCategory: 'vowel',
  type: 'letter',
  commonSource: 'common',
  localizedSource: 'localized',
};

describe('LetterStudyDetailSlide', () => {
  it('renders the meta bar and handles mocked audio and favorite states', async () => {
    vi.useFakeTimers();

    render(<LetterStudyDetailSlide item={item} />);

    expect(screen.getByText('New')).not.toBeNull();
    expect(screen.getAllByText('ა').length).toBeGreaterThan(0);
    expect(screen.getAllByText('a').length).toBeGreaterThan(0);

    const audioButton = screen.getByRole('button', { name: 'Play audio' });
    expect(audioButton.className).toContain('bg-s-color-panel-action-default-bg');

    fireEvent.click(audioButton);
    expect(screen.getByRole('button', { name: 'Stop audio' })).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.getByRole('button', { name: 'Play audio' })).not.toBeNull();

    const favoriteButton = screen.getByRole('button', { name: 'Add favorite' });
    expect(favoriteButton.className).toContain('bg-s-color-panel-action-default-bg');
    fireEvent.click(favoriteButton);
    expect(screen.getByRole('button', { name: 'Remove favorite' })).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Remove favorite' }).className).toContain(
      'text-s-color-panel-content-danger',
    );
    expect(screen.getByText('Letter ა added to favorites')).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Remove favorite' }));
    expect(screen.getByRole('button', { name: 'Add favorite' })).not.toBeNull();
    expect(screen.getByText('Letter ა removed from favorites')).not.toBeNull();

    vi.useRealTimers();
  });
});
