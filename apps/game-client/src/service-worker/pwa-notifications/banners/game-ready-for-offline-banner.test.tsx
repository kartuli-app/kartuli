import { IS_SERVICE_WORKER_READY_INFORMED_KEY } from '@game-client/local-storage/is-service-worker-ready-informed-key';
import * as browser from '@game-client/utils/browser';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SW_READY_OFFLINE } from '../../service-worker-messages';
import { createMockRegistration, createMockSwContainer } from '../test-helpers';
import { GameReadyForOfflineBanner } from './game-ready-for-offline-banner';

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

  it('shows banner when SW sends SW_READY_OFFLINE and user not informed', async () => {
    const registration = createMockRegistration({ waiting: null });
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<GameReadyForOfflineBanner />);

    const messageHandler = vi
      .mocked(sw.addEventListener)
      .mock.calls.find((call) => call[0] === 'message')?.[1] as (e: MessageEvent) => void;
    expect(messageHandler).toBeDefined();
    messageHandler({ data: { type: SW_READY_OFFLINE } } as MessageEvent);

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

    const messageHandler = vi
      .mocked(sw.addEventListener)
      .mock.calls.find((call) => call[0] === 'message')?.[1] as (e: MessageEvent) => void;
    messageHandler?.({ data: { type: SW_READY_OFFLINE } } as MessageEvent);

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
