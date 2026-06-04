import type { LetterItem } from '@game-client/learning-content/library/library';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LetterStudyExamples, LetterStudyNotes } from './letter-study-notes';

const item: Pick<LetterItem, 'id' | 'targetScript' | 'notes'> = {
  id: 'letter-ani',
  targetScript: 'ა',
  notes: [
    {
      kind: 'pronunciation_hint',
      highlight: 't',
      examples: ['top', 'tattoo', 'metro'],
    },
  ],
};

describe('LetterStudyNotes', () => {
  it('renders the like-in and examples sections with highlighted content', () => {
    const { container } = render(
      <LetterStudyExamples
        item={{
          ...item,
          notes: [
            ...item.notes,
            {
              kind: 'info',
              text: 'A short pronunciation note.',
            },
          ],
        }}
      />,
    );

    expect(screen.getByText('like in')).not.toBeNull();
    expect(screen.getByText('examples')).not.toBeNull();
    expect(container.textContent).toContain('toptattoometro');
    expect(container.textContent).toContain('გამარჯობა');
    expect(container.textContent).toContain('სასიამოვნოა');

    const strongContents = Array.from(container.querySelectorAll('strong')).map(
      (element) => element.textContent,
    );
    expect(strongContents.slice(0, 5)).toEqual(['t', 't', 't', 't', 't']);
    expect(strongContents.slice(5).every((content) => content === 'ა')).toBe(true);
  });

  it('keeps the notes row visible with fallback copy when content has no info note', () => {
    const { container } = render(<LetterStudyNotes item={{ ...item, notes: [] }} />);

    expect(within(container).getByText('notes')).not.toBeNull();
    expect(container.textContent).toContain('More notes soon.');
  });
});
