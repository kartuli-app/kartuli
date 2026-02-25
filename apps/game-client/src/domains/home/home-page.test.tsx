import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { RouterProvider } from '../app-shell/router-context';
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
    expect(within(container).getByRole('heading', { name: /home/i })).toBeInTheDocument();
    expect(within(container).getByRole('button', { name: 'lesson-1' })).toBeInTheDocument();
    expect(within(container).getByRole('button', { name: 'lesson-2' })).toBeInTheDocument();
  });

  it('navigates to learn page when lesson is clicked', async () => {
    const pushStateSpy = vi.spyOn(globalThis.history, 'pushState');
    const user = userEvent.setup();
    const { container } = renderHomePage();
    await user.click(within(container).getByRole('button', { name: 'lesson-1' }));
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '/en/learn/lesson-1');
    pushStateSpy.mockRestore();
  });
});
