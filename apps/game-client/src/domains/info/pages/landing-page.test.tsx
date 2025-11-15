import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LandingPage } from './landing-page';

describe('Landing Page', () => {
  it('renders Game Client heading', () => {
    render(<LandingPage />);
    const heading = screen.getByRole('heading', { name: /game client/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders DeploymentDebugPanel with actual environment values', () => {
    render(<LandingPage />);

    // Verify the debug panel is rendered (use getAllByText to handle multiple instances)
    const debugInfoElements = screen.getAllByText(/🔧 Debug Info/);
    expect(debugInfoElements.length).toBeGreaterThan(0);

    // Verify it shows the actual app name from package.json
    const appNameElements = screen.getAllByText('@kartuli/game-client');
    expect(appNameElements.length).toBeGreaterThan(0);

    // Verify it shows environment information
    const environmentElements = screen.getAllByText('Environment:');
    expect(environmentElements.length).toBeGreaterThan(0);

    const versionElements = screen.getAllByText('Version:');
    expect(versionElements.length).toBeGreaterThan(0);
  });
});
