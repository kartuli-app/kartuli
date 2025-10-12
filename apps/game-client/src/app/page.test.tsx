import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Page from './page';

describe('Game Client Home Page', () => {
  it('renders Hello Game heading', () => {
    render(<Page />);
    const heading = screen.getByRole('heading', { name: /hello game/i });
    expect(heading).toBeInTheDocument();
  });
});
