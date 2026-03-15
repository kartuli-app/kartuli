import { RootQueryClientProvider } from '@game-client/root-layout/root-query-client-provider';
import * as browser from '@game-client/utils/browser';
import { render, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SpaShell } from './spa-shell';

vi.mock('@game-client/utils/browser', () => ({
  getLocationPathname: vi.fn(),
  getBrowserGlobal: vi.fn(() => ({
    location: { pathname: '' },
    history: { pushState: vi.fn(), back: vi.fn() },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
  navigateBack: vi.fn(),
  getServiceWorkerContainer: vi.fn(() => null),
  reloadWindow: vi.fn(),
  setDocumentLang: vi.fn(),
}));

function renderShell(initialPath: string) {
  vi.mocked(browser.getLocationPathname).mockReturnValue(initialPath);
  return render(
    <RootQueryClientProvider>
      <SpaShell initialPath={initialPath} />
    </RootQueryClientProvider>,
  );
}

function expectShellRendersPage(path: string, testId: string) {
  const { container } = renderShell(path);
  expect(document.contains(within(container).getByTestId(testId))).toBe(true);
  return { container };
}

describe('SpaShell', () => {
  it('renders HomePage for /en', () => {
    expectShellRendersPage('/en', 'game-home');
  });

  it('renders DebugPage for /en/debug', () => {
    expectShellRendersPage('/en/debug', 'game-debug');
  });

  it('renders LearnPage for /en/learn/lesson-1', () => {
    const { container } = expectShellRendersPage('/en/learn/lesson-1', 'game-learn');
    expect(within(container).getByTestId('learn-lesson-id').textContent ?? '').toContain(
      'lesson-1',
    );
  });

  it('renders GamePage for /en/game/lesson-2', () => {
    const { container } = expectShellRendersPage('/en/game/lesson-2', 'game-game');
    expect(within(container).getByTestId('game-lesson-id').textContent ?? '').toContain('lesson-2');
  });

  it('renders UserPage for /en/user', () => {
    expectShellRendersPage('/en/user', 'game-user');
  });

  it('renders HomePage for /ru', () => {
    expectShellRendersPage('/ru', 'game-home');
  });

  it('renders DebugPage for /ru/debug', () => {
    expectShellRendersPage('/ru/debug', 'game-debug');
  });

  it('renders UserPage for /ru/user', () => {
    expectShellRendersPage('/ru/user', 'game-user');
  });

  it('renders GamePage for /ru/game/:id', () => {
    const { container } = expectShellRendersPage('/ru/game/lesson-1', 'game-game');
    expect(within(container).getByTestId('game-lesson-id').textContent ?? '').toContain('lesson-1');
  });

  it('falls back to HomePage for unknown path', () => {
    expectShellRendersPage('/en/unknown/segment', 'game-home');
  });
});
