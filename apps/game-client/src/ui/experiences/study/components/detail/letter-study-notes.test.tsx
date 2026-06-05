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
              kind: 'info_text',
              text: 'A short pronunciation note.',
            },
          ],
        }}
      />,
    );

    expect(screen.getByText('like in')).not.toBeNull();
    expect(screen.getByText('example')).not.toBeNull();
    expect(container.textContent).toContain('top');
    expect(container.textContent).toContain('tattoo');
    expect(container.textContent).not.toContain('metro');
    expect(container.textContent).toContain('გამარჯობა');
    expect(container.textContent).not.toContain('სასიამოვნოა');

    const strongContents = Array.from(container.querySelectorAll('strong')).map(
      (element) => element.textContent,
    );
    expect(strongContents).toContain('t');
    expect(strongContents).toContain('ა');
  });

  it('renders up to two authored info_text notes', () => {
    const { container } = render(
      <LetterStudyNotes
        item={{
          ...item,
          notes: [
            ...item.notes,
            { kind: 'info_text', text: 'First authored note.' },
            { kind: 'info_text', text: 'Second authored note.' },
            { kind: 'info_text', text: 'Third authored note.' },
          ],
        }}
      />,
    );

    expect(container.textContent).toContain('First authored note.');
    expect(container.textContent).toContain('Second authored note.');
    expect(container.textContent).not.toContain('Third authored note.');
  });

  it('renders nothing when content has no authored info_text note', () => {
    const { container } = render(<LetterStudyNotes item={{ ...item, notes: [] }} />);

    expect(container.textContent).toBe('');
  });
});
