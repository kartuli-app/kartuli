import { render, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UserPage } from './user-page';

describe('UserPage', () => {
  it('renders User heading and anonymous user text', () => {
    const { container } = render(<UserPage />);
    expect(document.contains(within(container).getByRole('heading', { name: /user/i }))).toBe(true);
    expect(document.contains(within(container).getByText('anonymous user'))).toBe(true);
  });

  it('has Back button', () => {
    const { container } = render(<UserPage />);
    expect(document.contains(within(container).getByRole('button', { name: /back/i }))).toBe(true);
  });
});
