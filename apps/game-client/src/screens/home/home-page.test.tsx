import { lessons } from '@game-client/core/library';
import { RouterProvider } from '@game-client/router-outlet/router-context';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { HomePage } from './home-page';

function renderHomePage(initialPath = '/en') {
  return render(
    <RouterProvider initialPath={initialPath}>
      <HomePage />
    </RouterProvider>,
  );
}

describe('Game Client Home Page', () => {
  it('renders Home heading and lesson list', () => {
    const { container } = renderHomePage();
    expect(document.contains(within(container).getByRole('heading', { name: /გამარჯობა /i }))).toBe(
      true,
    );
    expect(
      document.contains(within(container).getByRole('button', { name: lessons[0].title })),
    ).toBe(true);
    expect(
      document.contains(within(container).getByRole('button', { name: lessons[1].title })),
    ).toBe(true);
  });

  it('navigates to learn page when lesson is clicked', async () => {
    const pushStateSpy = vi.spyOn(globalThis.history, 'pushState');
    const user = userEvent.setup();
    const { container } = renderHomePage();
    await user.click(within(container).getByRole('button', { name: lessons[0].title }));
    expect(pushStateSpy).toHaveBeenCalledWith(
      null,
      '',
      `/en/learn/${encodeURIComponent(lessons[0].id)}`,
    );
    pushStateSpy.mockRestore();
  });
});
