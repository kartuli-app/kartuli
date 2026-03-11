import * as browser from '@game-client/utils/browser';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ServiceWorkerInstalledInDevelopmentModeBanner } from './service-worker-installed-in-development-mode-banner';

function createMockRegistration() {
  return {
    installing: null,
    waiting: null,
    active: {},
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
}

function createMockSwContainer(registration: ReturnType<typeof createMockRegistration> | null) {
  return {
    getRegistration: vi.fn(() => Promise.resolve(null)),
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

describe('ServiceWorkerInstalledInDevelopmentModeBanner', () => {
  const env = process.env as { NODE_ENV?: string };
  const originalNodeEnv = env.NODE_ENV;

  beforeEach(() => {
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(null);
    env.NODE_ENV = 'development';
  });

  afterEach(() => {
    env.NODE_ENV = originalNodeEnv;
    vi.clearAllMocks();
  });

  it('renders nothing when there is no service worker container', () => {
    render(<ServiceWorkerInstalledInDevelopmentModeBanner />);
    expect(screen.queryByTestId('pwa-notification-dev-mode')).toBeNull();
  });

  it('renders nothing when not in development', async () => {
    env.NODE_ENV = 'production';
    const registration = createMockRegistration();
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<ServiceWorkerInstalledInDevelopmentModeBanner />);

    await waitFor(() => {
      vi.mocked(sw.getRegistrations).mockResolvedValue([registration] as Awaited<
        ReturnType<typeof sw.getRegistrations>
      >);
    });

    expect(screen.queryByTestId('pwa-notification-dev-mode')).toBeNull();
  });

  it('shows banner when in development and at least one SW is registered', async () => {
    const registration = createMockRegistration();
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<ServiceWorkerInstalledInDevelopmentModeBanner />);

    await waitFor(() => {
      expect(screen.getByTestId('pwa-notification-dev-mode')).toBeTruthy();
    });
    expect(document.contains(screen.getByText(/service worker is installed/i))).toBe(true);
    expect(document.contains(screen.getByRole('button', { name: /unregister/i }))).toBe(true);
    expect(document.contains(screen.getByRole('button', { name: /dismiss/i }))).toBe(true);
  });

  it('hides banner after dismiss is clicked', async () => {
    const user = userEvent.setup();
    const registration = createMockRegistration();
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<ServiceWorkerInstalledInDevelopmentModeBanner />);

    await waitFor(() => {
      expect(screen.getByTestId('pwa-notification-dev-mode')).toBeTruthy();
    });

    const banners = screen.getAllByTestId('pwa-notification-dev-mode');
    for (const banner of banners) {
      await user.click(within(banner).getByRole('button', { name: /dismiss/i }));
    }

    await waitFor(() => {
      expect(screen.queryByTestId('pwa-notification-dev-mode')).toBeNull();
    });
  });
});
