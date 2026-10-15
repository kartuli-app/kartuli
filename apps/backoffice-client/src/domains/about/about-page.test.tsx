import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AboutPage } from './about-page';

describe('Backoffice Client About Page', () => {
  it('renders the proof boundary without speculative product behavior', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeTruthy();
    expect(screen.getByText('Kartuli Backoffice')).toBeTruthy();
    expect(screen.getByText(/does not define future authentication/i)).toBeTruthy();
  });
});
