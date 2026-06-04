import type { LetterItem } from '@game-client/learning-content/library/library';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
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
  it('renders the target-script action rail and toggles mocked audio and favorite states', async () => {
    const user = userEvent.setup();

    render(<LetterStudyDetailSlide item={item} />);

    const audioButton = screen.getByRole('button', { name: 'Play audio' });
    expect(audioButton.className).toContain('size-11');

    await user.click(audioButton);
    expect(screen.getByRole('button', { name: 'Stop audio' })).not.toBeNull();

    await user.click(screen.getByRole('button', { name: 'Stop audio' }));
    expect(screen.getByRole('button', { name: 'Play audio' })).not.toBeNull();

    const favoriteButton = screen.getByRole('button', { name: 'Add favorite' });
    await user.click(favoriteButton);
    expect(screen.getByRole('button', { name: 'Remove favorite' })).not.toBeNull();

    await user.click(screen.getByRole('button', { name: 'Remove favorite' }));
    expect(screen.getByRole('button', { name: 'Add favorite' })).not.toBeNull();
  });
});
