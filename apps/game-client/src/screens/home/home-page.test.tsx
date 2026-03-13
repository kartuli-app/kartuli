import { getDefaultRepository, getHomeModulesView } from '@game-client/core/library';
import { RouterProvider } from '@game-client/router-outlet/router-context';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { HomePage } from './home-page';

function renderHomePage(initialPath = '/en') {
  return render(
    <RouterProvider initialPath={initialPath}>
      <HomePage />
    </RouterProvider>,
  );
}

describe('Game Client Home Page', () => {
  let firstLessonId: string;
  let firstLessonTitleEn: string;

  beforeAll(async () => {
    const repo = getDefaultRepository();
    const view = await getHomeModulesView(repo, 'en');
    const first = view[0]?.lessons[0];
    if (!first) throw new Error('Library has no modules or lessons');
    firstLessonId = first.id;
    firstLessonTitleEn = first.title;
  });

  it('renders Home heading and lesson list', async () => {
    const { container } = renderHomePage();
    expect(document.contains(within(container).getByRole('heading', { name: /გამარჯობა /i }))).toBe(
      true,
    );
    const firstLessonButton = await screen.findByRole(
      'button',
      { name: firstLessonTitleEn },
      { timeout: 3000 },
    );
    expect(document.contains(firstLessonButton)).toBe(true);
    const secondLessonButton = screen.getByRole('button', { name: 'Sounds You Know' });
    expect(document.contains(secondLessonButton)).toBe(true);
  });

  it('navigates to learn page when lesson is clicked', async () => {
    const pushStateSpy = vi.spyOn(globalThis.history, 'pushState');
    const user = userEvent.setup();
    renderHomePage();
    const firstLessonButton = await screen.findByRole(
      'button',
      { name: firstLessonTitleEn },
      { timeout: 3000 },
    );
    await user.click(firstLessonButton);
    expect(pushStateSpy).toHaveBeenCalledWith(
      null,
      '',
      `/en/learn/${encodeURIComponent(firstLessonId)}`,
    );
    pushStateSpy.mockRestore();
  });
});
