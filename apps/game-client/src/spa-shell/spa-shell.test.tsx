import { defaultLng } from '@game-client/i18n/default-locale';
import { PREFERRED_LOCALE_KEY } from '@game-client/local-storage/preferred-locale-key';
import { RootQueryClientProvider } from '@game-client/root-layout/root-query-client-provider';
import * as browser from '@game-client/utils/browser';
import { render, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SpaShell } from './spa-shell';

const pageNotFoundHarness = vi.hoisted(() => ({
  spy: vi.fn(),
}));

vi.mock('@game-client/screens/page-not-found/page-not-found', () => ({
  PageNotFound: (props: { readonly attemptedPath: string }) => {
    pageNotFoundHarness.spy(props);
    return <div data-testid="page-not-found" />;
  },
}));

const replaceStateMock = vi.fn();
const pushStateMock = vi.fn();

const defaultMockLocation = { pathname: '', search: '', hash: '' };

vi.mock('@game-client/utils/browser', () => ({
  getLocationPathname: vi.fn(),
  getBrowserGlobal: vi.fn(() => ({
    location: { ...defaultMockLocation },
    history: {
      pushState: pushStateMock,
      replaceState: replaceStateMock,
      back: vi.fn(),
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
  navigateBack: vi.fn(),
  getServiceWorkerContainer: vi.fn(() => null),
  reloadWindow: vi.fn(),
  setDocumentLang: vi.fn(),
}));

function setMockLocation(partial: Partial<typeof defaultMockLocation>) {
  vi.mocked(browser.getBrowserGlobal).mockReturnValue({
    location: { ...defaultMockLocation, ...partial },
    history: {
      pushState: pushStateMock,
      replaceState: replaceStateMock,
      back: vi.fn(),
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
}

function renderShell(initialPath: string) {
  setMockLocation({ pathname: initialPath });
  vi.mocked(browser.getLocationPathname).mockReturnValue(initialPath);
  return render(
    <RootQueryClientProvider>
      <SpaShell initialPath={initialPath} />
    </RootQueryClientProvider>,
  );
}

async function expectShellRendersPage(path: string, testId: string) {
  const { container } = renderShell(path);
  await waitFor(() => {
    expect(document.contains(within(container).getByTestId(testId))).toBe(true);
  });
  return { container };
}

describe('SpaShell', () => {
  beforeEach(() => {
    try {
      globalThis.localStorage?.removeItem(PREFERRED_LOCALE_KEY);
    } catch {
      // ignore (e.g. disabled storage)
    }
    pageNotFoundHarness.spy.mockClear();
    replaceStateMock.mockClear();
    pushStateMock.mockClear();
    vi.mocked(browser.getBrowserGlobal).mockReturnValue({
      location: { ...defaultMockLocation },
      history: {
        pushState: pushStateMock,
        replaceState: replaceStateMock,
        back: vi.fn(),
      },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it('resolves / to default locale before outlet; PageNotFound is never mounted', async () => {
    vi.mocked(browser.getLocationPathname).mockReturnValue('/');
    setMockLocation({ pathname: '/' });
    const { container } = render(
      <RootQueryClientProvider>
        <SpaShell initialPath="/" />
      </RootQueryClientProvider>,
    );
    await waitFor(() => {
      expect(document.contains(within(container).getByTestId('game-home'))).toBe(true);
    });
    expect(replaceStateMock).toHaveBeenCalledWith(null, '', `/${defaultLng}`);
    expect(pageNotFoundHarness.spy).not.toHaveBeenCalled();
    expect(document.contains(within(container).queryByTestId('page-not-found'))).toBe(false);
  });

  it('preserves search and hash when normalizing pathname', async () => {
    vi.mocked(browser.getLocationPathname).mockReturnValue('/debug');
    setMockLocation({ pathname: '/debug', search: '?from=pwa', hash: '#cta' });
    const { container } = render(
      <RootQueryClientProvider>
        <SpaShell initialPath="/debug" />
      </RootQueryClientProvider>,
    );
    await waitFor(() => {
      expect(document.contains(within(container).getByTestId('game-debug'))).toBe(true);
    });
    expect(replaceStateMock).toHaveBeenCalledWith(null, '', `/${defaultLng}/debug?from=pwa#cta`);
  });

  it('renders HomePage for /en', async () => {
    await expectShellRendersPage('/en', 'game-home');
  });

  it('renders DebugPage for /en/debug', async () => {
    await expectShellRendersPage('/en/debug', 'game-debug');
  });

  it('renders LearnPage for /en/learn/lesson-1', async () => {
    const { container } = await expectShellRendersPage('/en/learn/lesson-1', 'game-learn');
    expect(within(container).getByTestId('learn-lesson-id').textContent ?? '').toContain(
      'lesson-1',
    );
  });

  it('renders GamePage for /en/game/lesson-2', async () => {
    const { container } = await expectShellRendersPage('/en/game/lesson-2', 'game-game');
    expect(within(container).getByTestId('game-lesson-id').textContent ?? '').toContain('lesson-2');
  });

  it('renders UserPage for /en/user', async () => {
    await expectShellRendersPage('/en/user', 'game-user');
  });

  it('renders HomePage for /ru', async () => {
    await expectShellRendersPage('/ru', 'game-home');
  });

  it('renders DebugPage for /ru/debug', async () => {
    await expectShellRendersPage('/ru/debug', 'game-debug');
  });

  it('renders UserPage for /ru/user', async () => {
    await expectShellRendersPage('/ru/user', 'game-user');
  });

  it('renders GamePage for /ru/game/:id', async () => {
    const { container } = await expectShellRendersPage('/ru/game/lesson-1', 'game-game');
    expect(within(container).getByTestId('game-lesson-id').textContent ?? '').toContain('lesson-1');
  });

  it('renders PageNotFound for unknown localized path', async () => {
    await expectShellRendersPage('/en/unknown/segment', 'page-not-found');
    expect(pageNotFoundHarness.spy).toHaveBeenCalledWith(
      expect.objectContaining({ attemptedPath: '/en/unknown/segment' }),
    );
  });

  it('normalizes unlocalized path with replaceState and shows PageNotFound', async () => {
    vi.mocked(browser.getLocationPathname).mockReturnValue('/banana-e2e-random');
    setMockLocation({ pathname: '/banana-e2e-random' });
    const { container } = render(
      <RootQueryClientProvider>
        <SpaShell initialPath="/banana-e2e-random" />
      </RootQueryClientProvider>,
    );
    await waitFor(() => {
      expect(document.contains(within(container).getByTestId('page-not-found'))).toBe(true);
    });
    expect(replaceStateMock).toHaveBeenCalledWith(null, '', `/${defaultLng}/banana-e2e-random`);
    expect(pageNotFoundHarness.spy).toHaveBeenCalledWith(
      expect.objectContaining({ attemptedPath: `/${defaultLng}/banana-e2e-random` }),
    );
  });
});
