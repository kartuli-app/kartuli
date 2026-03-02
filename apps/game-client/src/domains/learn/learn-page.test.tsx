import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { RouterProvider } from '../app-shell/router-context';
import { LearnPage } from './learn-page';

function renderLearnPage(lessonId: string, initialPath = '/en/learn/lesson-1') {
  return render(
    <RouterProvider initialPath={initialPath}>
      <LearnPage lessonId={lessonId} />
    </RouterProvider>,
  );
}

describe('LearnPage', () => {
  it('renders Learn heading and lesson id', () => {
    const { container } = renderLearnPage('lesson-1');
    expect(document.contains(within(container).getByRole('heading', { name: /learn/i }))).toBe(
      true,
    );
    expect(within(container).getByTestId('learn-lesson-id').textContent).toContain('lesson-1');
  });

  it('has Play and Back buttons', () => {
    const { container } = renderLearnPage('lesson-2');
    expect(document.contains(within(container).getByRole('button', { name: /play/i }))).toBe(true);
    expect(document.contains(within(container).getByRole('button', { name: /back/i }))).toBe(true);
  });

  it('navigates to game when Play is clicked', async () => {
    const pushStateSpy = vi.spyOn(globalThis.history, 'pushState');
    const user = userEvent.setup();
    const { container } = renderLearnPage('lesson-1');
    await user.click(within(container).getByRole('button', { name: /play/i }));
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '/en/game/lesson-1');
    pushStateSpy.mockRestore();
  });
});
