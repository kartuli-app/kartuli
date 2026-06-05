import type { LetterItem } from '@game-client/learning-content/library/library';
import { render, screen } from '@testing-library/react';
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
    expect(screen.getByText('example')).not.toBeNull();
    expect(container.textContent).toContain('top');
    expect(container.textContent).not.toContain('tattoo');
    expect(container.textContent).not.toContain('metro');
    expect(container.textContent).toContain('გამარჯობა');
    expect(container.textContent).not.toContain('სასიამოვნოა');

    const strongContents = Array.from(container.querySelectorAll('strong')).map(
      (element) => element.textContent,
    );
    expect(strongContents.slice(0, 1)).toEqual(['t']);
    expect(strongContents.slice(1).every((content) => content === 'ა')).toBe(true);
  });

  it('keeps the notes row visible with the current mocked copy when content has no info note', () => {
    const { container } = render(<LetterStudyNotes item={{ ...item, notes: [] }} />);

    expect(container.textContent).toContain('Its pronounced like this and that');
    expect(container.textContent).toContain('You can also find this written as X');
  });
});
