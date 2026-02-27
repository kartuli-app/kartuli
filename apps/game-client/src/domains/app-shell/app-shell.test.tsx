import { render, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as browser from '../utils/browser';
import { AppShell } from './app-shell';

vi.mock('../utils/browser', () => ({
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
}));

function renderShell(initialPath: string) {
  vi.mocked(browser.getLocationPathname).mockReturnValue(initialPath);
  return render(<AppShell initialPath={initialPath} />);
}

describe('AppShell', () => {
  it('renders HomePage for /en', () => {
    const { container } = renderShell('/en');
    expect(within(container).getByTestId('game-home')).toBeInTheDocument();
  });

  it('renders DebugPage for /en/debug', () => {
    const { container } = renderShell('/en/debug');
    expect(within(container).getByTestId('game-debug')).toBeInTheDocument();
  });

  it('renders LearnPage for /en/learn/lesson-1', () => {
    const { container } = renderShell('/en/learn/lesson-1');
    expect(within(container).getByTestId('game-learn')).toBeInTheDocument();
    expect(within(container).getByTestId('learn-lesson-id')).toHaveTextContent('lesson-1');
  });

  it('renders GamePage for /en/game/lesson-2', () => {
    const { container } = renderShell('/en/game/lesson-2');
    expect(within(container).getByTestId('game-game')).toBeInTheDocument();
    expect(within(container).getByTestId('game-lesson-id')).toHaveTextContent('lesson-2');
  });

  it('renders UserPage for /en/user', () => {
    const { container } = renderShell('/en/user');
    expect(within(container).getByTestId('game-user')).toBeInTheDocument();
  });

  it('falls back to HomePage for unknown path', () => {
    const { container } = renderShell('/en/unknown/segment');
    expect(within(container).getByTestId('game-home')).toBeInTheDocument();
  });
});
