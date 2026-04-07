import { defaultLocale } from '@game-client/i18n/i18n-constants';
import { I18nProvider } from '@game-client/i18n/i18n-provider';
import { SpaNavigationRootLayout } from '@game-client/navigation';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DebugClient } from './debug-client';

describe('DebugPage', () => {
  it('renders DeploymentDebugPanel with actual environment values', () => {
    render(
      <I18nProvider locale={defaultLocale}>
        <SpaNavigationRootLayout>
          <DebugClient />
        </SpaNavigationRootLayout>
      </I18nProvider>,
    );

    const debugInfoElements = screen.getAllByText(/🔧 Debug Info/);
    expect(debugInfoElements.length).toBeGreaterThan(0);

    const appNameElements = screen.getAllByText('@kartuli/game-client');
    expect(appNameElements.length).toBeGreaterThan(0);

    const environmentElements = screen.getAllByText('Environment:');
    expect(environmentElements.length).toBeGreaterThan(0);

    const versionElements = screen.getAllByText('Version:');
    expect(versionElements.length).toBeGreaterThan(0);
  });
});
