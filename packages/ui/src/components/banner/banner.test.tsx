import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Banner, BannerMessage } from './banner';

describe('Banner', () => {
  const defaultProps = {
    onDismiss: vi.fn(),
    dismissLabel: 'Dismiss',
    children: <BannerMessage>Test message</BannerMessage>,
  };

  it('renders children', () => {
    render(<Banner {...defaultProps} />);
    expect(document.contains(screen.getByText('Test message'))).toBe(true);
  });

  it('renders dismiss button when showDismissButton is true', () => {
    render(<Banner {...defaultProps} />);
    expect(document.contains(screen.getByRole('button', { name: /dismiss/i }))).toBe(true);
  });

  it('does not render dismiss button when showDismissButton is false', () => {
    render(<Banner {...defaultProps} showDismissButton={false} />);
    expect(screen.queryByRole('button', { name: /dismiss/i })).toBeNull();
  });

  it('calls onDismiss when dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    render(<Banner {...defaultProps} onDismiss={onDismiss} />);

    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders actions when provided', () => {
    const onAction = vi.fn();
    render(
      <Banner
        {...defaultProps}
        actions={[
          { label: 'Accept', onClick: onAction },
          { label: 'Decline', onClick: vi.fn() },
        ]}
      />,
    );
    expect(document.contains(screen.getByRole('button', { name: /accept/i }))).toBe(true);
    expect(document.contains(screen.getByRole('button', { name: /decline/i }))).toBe(true);
  });

  it('calls action onClick when action button is clicked', () => {
    const onAction = vi.fn();
    render(<Banner {...defaultProps} actions={[{ label: 'Submit', onClick: onAction }]} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders with testId when provided', () => {
    render(<Banner {...defaultProps} testId="my-banner" />);
    expect(screen.getByTestId('my-banner')).toBeTruthy();
  });

  it('renders root with aria-live when provided', () => {
    const { container } = render(<Banner {...defaultProps} ariaLive="assertive" />);
    const output = container.querySelector('[aria-live="assertive"]');
    expect(output).toBeTruthy();
  });
});

describe('BannerMessage', () => {
  it('renders children', () => {
    render(<BannerMessage>Hello</BannerMessage>);
    expect(document.contains(screen.getByText('Hello'))).toBe(true);
  });

  it('applies default and custom className', () => {
    const { container } = render(<BannerMessage className="custom">Text</BannerMessage>);
    const p = container.querySelector('p');
    expect(p?.className).toMatch(/font-bold/);
    expect(p?.className).toMatch(/custom/);
  });
});
