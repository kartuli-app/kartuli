import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomePage } from './home-page';

describe('Backoffice Client Home Page', () => {
  it('renders the minimal Backoffice integration proof', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeTruthy();
    expect(screen.getByText('Kartuli Backoffice')).toBeTruthy();
    expect(screen.getByText('Shared shell integration proof.')).toBeTruthy();
  });
});
