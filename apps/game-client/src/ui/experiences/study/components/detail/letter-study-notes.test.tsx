import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LetterStudyNotes } from './letter-study-notes';

describe('LetterStudyNotes', () => {
  it('renders the pronunciation hint badge and detail sentence with bolded matches', () => {
    const { container } = render(
      <LetterStudyNotes
        notes={[
          {
            kind: 'pronunciation_hint',
            highlight: 't',
            examples: ['top', 'tattoo', 'metro'],
          },
        ]}
      />,
    );

    expect(screen.getByText('Pronunciation hint')).not.toBeNull();
    expect(container.textContent).toContain('Like t in top, tattoo, metro');

    const strongContents = Array.from(container.querySelectorAll('strong')).map(
      (element) => element.textContent,
    );
    expect(strongContents).toEqual(['t', 't', 't', 't', 't', 't']);
  });

  it('hides the notes block when no notes exist', () => {
    const { container } = render(<LetterStudyNotes notes={[]} />);

    expect(container.textContent).toBe('');
  });
});
