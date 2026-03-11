import { IS_SERVICE_WORKER_READY_INFORMED_KEY } from '@game-client/local-storage/is-service-worker-ready-informed-key';
import * as browser from '@game-client/utils/browser';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SERVICE_WORKER_SCRIPT_URL } from '../../service-worker-script-url';
import { GameReadyForOfflineBanner } from './game-ready-for-offline-banner';

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
      Promise.resolve(url === SERVICE_WORKER_SCRIPT_URL ? registration : null),
    ),
    getRegistrations: vi.fn(() => Promise.resolve(registration ? [registration] : [])),
    ready: Promise.resolve(registration ?? undefined),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
}

vi.mock('@game-client/utils/browser', () => ({
  getServiceWorkerContainer: vi.fn(() => null),
}));

describe('GameReadyForOfflineBanner', () => {
  beforeEach(() => {
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(IS_SERVICE_WORKER_READY_INFORMED_KEY);
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when there is no service worker container', () => {
    render(<GameReadyForOfflineBanner />);
    expect(screen.queryByTestId('pwa-notification-game-ready-for-offline')).toBeNull();
  });

  it('renders nothing when user was already informed', async () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(IS_SERVICE_WORKER_READY_INFORMED_KEY, 'true');
    }
    const registration = createMockRegistration({ waiting: null });
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<GameReadyForOfflineBanner />);

    await waitFor(() => {
      expect(screen.queryByTestId('pwa-notification-game-ready-for-offline')).toBeNull();
    });
  });

  it('shows banner when SW is registered, no waiting worker, and user not informed', async () => {
    const registration = createMockRegistration({ waiting: null });
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<GameReadyForOfflineBanner />);

    await waitFor(() => {
      const banner = screen.getByTestId('pwa-notification-game-ready-for-offline');
      expect(banner.textContent).toMatch(/ready to be played offline/i);
    });
  });

  it('hides banner and sets localStorage when dismiss is clicked', async () => {
    const user = userEvent.setup();
    const registration = createMockRegistration({ waiting: null });
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<GameReadyForOfflineBanner />);

    await waitFor(() => {
      expect(screen.getByTestId('pwa-notification-game-ready-for-offline')).toBeTruthy();
    });

    const banners = screen.getAllByTestId('pwa-notification-game-ready-for-offline');
    for (const banner of banners) {
      await user.click(within(banner).getByRole('button', { name: /dismiss/i }));
    }

    await waitFor(() => {
      expect(screen.queryByTestId('pwa-notification-game-ready-for-offline')).toBeNull();
    });
    if (typeof localStorage !== 'undefined') {
      expect(localStorage.getItem(IS_SERVICE_WORKER_READY_INFORMED_KEY)).toBe('true');
    }
  });
});
