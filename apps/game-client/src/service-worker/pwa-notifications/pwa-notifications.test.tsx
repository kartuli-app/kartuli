import * as browser from '@game-client/utils/browser';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SW_READY_OFFLINE } from '../service-worker-messages';
import { PWANotifications } from './pwa-notifications';

const SW_SCRIPT_URL = '/serwist/sw.js';

function createMockRegistration(overrides: { waiting?: unknown } = {}) {
  return {
    installing: null,
    waiting: overrides.waiting ?? null,
    active: {},
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
}

function createMockSwContainer(registration: ReturnType<typeof createMockRegistration> | null) {
  return {
    getRegistration: vi.fn((url: string) =>
      Promise.resolve(url === SW_SCRIPT_URL ? registration : null),
    ),
    getRegistrations: vi.fn(() => Promise.resolve(registration ? [registration] : [])),
    ready: Promise.resolve(registration ?? undefined),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
}

vi.mock('@game-client/utils/browser', () => ({
  getServiceWorkerContainer: vi.fn(() => null),
  reloadWindow: vi.fn(),
}));

describe('PWANotifications', () => {
  beforeEach(() => {
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders no banner when there is no service worker container', () => {
    render(<PWANotifications />);
    expect(screen.queryByTestId('pwa-notification-dev-mode')).toBeNull();
    expect(screen.queryByTestId('pwa-notification-game-ready-for-offline')).toBeNull();
    expect(screen.queryByTestId('pwa-notification-new-version-installed')).toBeNull();
  });

  it('shows game-ready-for-offline banner when SW sends SW_READY_OFFLINE and user not informed', async () => {
    const registration = createMockRegistration({ waiting: null });
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<PWANotifications />);

    const messageHandlers = vi
      .mocked(sw.addEventListener)
      .mock.calls.filter((call) => call[0] === 'message')
      .map((call) => call[1] as (e: MessageEvent) => void);
    for (const handler of messageHandlers) {
      handler({ data: { type: SW_READY_OFFLINE } } as MessageEvent);
    }

    await waitFor(() => {
      const banner = screen.getByTestId('pwa-notification-game-ready-for-offline');
      expect(banner.textContent).toMatch(/ready to be played offline/i);
    });
    expect(screen.queryByTestId('pwa-notification-new-version-installed')).toBeNull();
  });

  it('shows new-version-installed banner when registration has a waiting worker', async () => {
    const registration = createMockRegistration({ waiting: { state: 'installed' } });
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<PWANotifications />);

    await waitFor(() => {
      const banner = screen.getByTestId('pwa-notification-new-version-installed');
      expect(banner.textContent).toMatch(/new version is available/i);
      expect(document.contains(screen.getByRole('button', { name: /go to next version/i }))).toBe(
        true,
      );
    });
  });
});
