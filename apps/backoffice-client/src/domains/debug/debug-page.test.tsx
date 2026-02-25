import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DebugPage } from './debug-page';

describe('DebugPage', () => {
  it('renders DeploymentDebugPanel with actual environment values', () => {
    render(<DebugPage />);

    const debugInfoElements = screen.getAllByText(/🔧 Debug Info/);
    expect(debugInfoElements.length).toBeGreaterThan(0);

    const appNameElements = screen.getAllByText('@kartuli/backoffice-client');
    expect(appNameElements.length).toBeGreaterThan(0);

    const environmentElements = screen.getAllByText('Environment:');
    expect(environmentElements.length).toBeGreaterThan(0);

    const versionElements = screen.getAllByText('Version:');
    expect(versionElements.length).toBeGreaterThan(0);
  });
});
