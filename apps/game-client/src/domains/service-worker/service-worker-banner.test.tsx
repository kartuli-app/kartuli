import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as browser from '../utils/browser';
import { ServiceWorkerBanner } from './service-worker-banner';

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

vi.mock('../utils/browser', () => ({
  getServiceWorkerContainer: vi.fn(() => null),
  reloadWindow: vi.fn(),
}));

describe('ServiceWorkerBanner', () => {
  beforeEach(() => {
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when there is no service worker container', () => {
    render(<ServiceWorkerBanner />);
    expect(screen.queryByTestId('sw-banner')).not.toBeInTheDocument();
  });

  it('shows "ready for offline" when SW is registered and user not informed', async () => {
    const registration = createMockRegistration({ waiting: null });
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<ServiceWorkerBanner />);

    await waitFor(() => {
      expect(screen.queryAllByText(/ready to be played offline/i).length).toBeGreaterThan(0);
    });
  });

  it('shows "update" when registration has a waiting worker', async () => {
    const registration = createMockRegistration({ waiting: { state: 'installed' } });
    const sw = createMockSwContainer(registration);
    vi.mocked(browser.getServiceWorkerContainer).mockReturnValue(
      sw as unknown as ServiceWorkerContainer,
    );

    render(<ServiceWorkerBanner />);

    await waitFor(() => {
      expect(screen.getByText(/new version is available/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /go to next version/i })).toBeInTheDocument();
    });
  });
});
