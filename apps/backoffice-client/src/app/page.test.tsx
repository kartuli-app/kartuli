import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Page from './page';

describe('Backoffice Client Home Page', () => {
  it('renders Backoffice Client heading', () => {
    render(<Page />);
    const heading = screen.getByRole('heading', { name: /backoffice client/i });
    expect(heading).toBeInTheDocument();
  });
});
