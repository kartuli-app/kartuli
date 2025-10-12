import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Page from './page';

describe('Backoffice Client Home Page', () => {
  it('renders Hello Backoffice heading', () => {
    render(<Page />);
    const heading = screen.getByRole('heading', { name: /hello backoffice/i });
    expect(heading).toBeInTheDocument();
  });
});
