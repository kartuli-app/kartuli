import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomePage } from './home-page';

describe('Game Client Home Page', () => {
  it('renders kartuli.app heading and game subheading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: /kartuli\.app/i });
    expect(heading).toBeInTheDocument();
    const subheading = screen.getByRole('heading', { name: /game/i });
    expect(subheading).toBeInTheDocument();
  });
});
