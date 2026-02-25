import { render, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UserPage } from './user-page';

describe('UserPage', () => {
  it('renders User heading and anonymous user text', () => {
    const { container } = render(<UserPage />);
    expect(within(container).getByRole('heading', { name: /user/i })).toBeInTheDocument();
    expect(within(container).getByText('anonymous user')).toBeInTheDocument();
  });

  it('has Back button', () => {
    const { container } = render(<UserPage />);
    expect(within(container).getByRole('button', { name: /back/i })).toBeInTheDocument();
  });
});
