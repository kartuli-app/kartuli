import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe.sequential('React Testing Library cleanup', () => {
  it('renders a marker for the current test', () => {
    render(<div>backoffice cleanup marker</div>);

    expect(screen.getByText('backoffice cleanup marker')).not.toBeNull();
  });

  it('starts the next test without the previous rendered DOM', () => {
    expect(screen.queryByText('backoffice cleanup marker')).toBeNull();
  });
});
