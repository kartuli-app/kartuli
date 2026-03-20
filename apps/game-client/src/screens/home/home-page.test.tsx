import { RootQueryClientProvider } from '@game-client/root-layout/root-query-client-provider';
import { RouterProvider } from '@game-client/router-outlet/router-context';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HomePage } from './home-page';
import { mockHomeModulesListData } from './home-page-modules-mock';
import { useModulesList } from './use-modules-list';

vi.mock('./use-modules-list', () => ({
  useModulesList: vi.fn(),
}));

function renderHomePage(initialPath = '/en') {
  return render(
    <RootQueryClientProvider>
      <RouterProvider initialPath={initialPath}>
        <HomePage />
      </RouterProvider>
    </RootQueryClientProvider>,
  );
}

describe('Game Client Home Page', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.mocked(useModulesList).mockReturnValue({
      data: [...mockHomeModulesListData],
      isLoading: false,
      isError: false,
      addViewEventsForLessonItems: vi.fn().mockResolvedValue(undefined),
    });
  });

  it('renders Home heading and lesson list', async () => {
    const { container } = renderHomePage();
    expect(document.contains(within(container).getByRole('heading', { name: /გამარჯობა /i }))).toBe(
      true,
    );
    const firstLessonButton = await screen.findByRole(
      'button',
      { name: /the five vowels/i },
      { timeout: 3000 },
    );
    expect(document.contains(firstLessonButton)).toBe(true);
    const secondLessonButton = screen.getByRole('button', { name: /sounds you know/i });
    expect(document.contains(secondLessonButton)).toBe(true);
  });

  it('navigates to learn page when lesson is clicked', async () => {
    const pushStateSpy = vi.spyOn(globalThis.history, 'pushState');
    const user = userEvent.setup();
    renderHomePage();
    const firstLessonButton = await screen.findByRole(
      'button',
      { name: /the five vowels/i },
      { timeout: 3000 },
    );
    await user.click(firstLessonButton);
    expect(pushStateSpy).toHaveBeenCalledWith(
      null,
      '',
      `/en/learn/${encodeURIComponent('lesson-alphabet-vowels')}`,
    );
    pushStateSpy.mockRestore();
  });
});
