import * as browser from '@game-client/utils/browser';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockRegistration, createMockSwContainer } from '../test-helpers';
import { NewGameVersionInstalledBanner } from './new-game-version-installed-banner';

vi.mock('@game-client/utils/browser', () => ({
  getServiceWorkerContainer: vi.fn(() => null),
  reloadWindow: vi.fn(),
}));

describe('NewGameVersionInstalledBanner', () => {
  beforeEach(() => {
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when there is no service worker container', () => {
    render(<NewGameVersionInstalledBanner />);
    expect(screen.queryByTestId('pwa-notification-new-version-installed')).toBeNull();
  });

  it('renders nothing when there is no waiting worker', async () => {
    const registration = createMockRegistration({ waiting: null });
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<NewGameVersionInstalledBanner />);

    await waitFor(() => {
      expect(screen.queryByTestId('pwa-notification-new-version-installed')).toBeNull();
    });
  });

  it('shows banner when registration has a waiting worker', async () => {
    const registration = createMockRegistration({ waiting: { state: 'installed' } });
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<NewGameVersionInstalledBanner />);

    await waitFor(() => {
      const banner = screen.getByTestId('pwa-notification-new-version-installed');
      expect(banner.textContent).toMatch(/new version is available/i);
    });
    expect(document.contains(screen.getByRole('button', { name: /go to next version/i }))).toBe(
      true,
    );
    expect(document.contains(screen.getByRole('button', { name: /dismiss/i }))).toBe(true);
  });

  it('hides banner after dismiss is clicked', async () => {
    const user = userEvent.setup();
    const registration = createMockRegistration({ waiting: { state: 'installed' } });
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<NewGameVersionInstalledBanner />);

    await waitFor(() => {
      expect(screen.getByTestId('pwa-notification-new-version-installed')).toBeTruthy();
    });

    const banners = screen.getAllByTestId('pwa-notification-new-version-installed');
    for (const banner of banners) {
      await user.click(within(banner).getByRole('button', { name: /dismiss/i }));
    }

    await waitFor(() => {
      expect(screen.queryByTestId('pwa-notification-new-version-installed')).toBeNull();
    });
  });
});
