import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Page from './page';

describe('Game Client Home Page', () => {
  it('renders Game Client heading', () => {
    render(<Page />);
    const heading = screen.getByRole('heading', { name: /game client/i });
    expect(heading).toBeInTheDocument();
  });
});
