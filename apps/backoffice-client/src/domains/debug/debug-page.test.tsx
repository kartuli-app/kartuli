import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DebugPage } from './debug-page';

describe('DebugPage', () => {
  it('renders the local debug surface with environment details', () => {
    render(<DebugPage />);

    expect(screen.getByTestId('backoffice-debug')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Backoffice debug' })).toBeTruthy();
    expect(screen.getByText('@kartuli/backoffice-client')).toBeTruthy();
    expect(screen.getByText('Version')).toBeTruthy();
    expect(screen.getByText('Environment')).toBeTruthy();
    expect(screen.getByText('Vercel Env')).toBeTruthy();
  });
});
