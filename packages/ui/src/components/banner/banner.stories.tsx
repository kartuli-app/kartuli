import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner, BannerMessage } from './banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dismissable banner with optional message, primary actions, and close button. Used for PWA notifications, alerts, and status messages.',
      },
    },
  },
  argTypes: {
    onDismiss: { action: 'dismissed' },
    dismissLabel: { control: 'text', description: 'Label for the close button' },
    showDismissButton: {
      control: 'boolean',
      description: 'When false, the close button is hidden',
    },
    testId: { control: 'text', description: 'data-testid for the root output element' },
    ariaLive: {
      control: 'select',
      options: ['polite', 'assertive'],
      description: 'aria-live value for screen readers',
    },
  },
  args: {
    dismissLabel: 'Dismiss',
    onDismiss: () => {},
    showDismissButton: true,
    ariaLive: 'polite',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <BannerMessage>Your changes have been saved.</BannerMessage>,
  },
};

export const WithActions: Story = {
  args: {
    children: <BannerMessage>A new version is available.</BannerMessage>,
    actions: [
      { label: 'Refresh', onClick: () => {} },
      { label: 'Learn more', onClick: () => {} },
    ],
  },
};

export const SingleAction: Story = {
  args: {
    children: <BannerMessage>The game is ready to be played offline.</BannerMessage>,
    actions: [{ label: 'Got it', onClick: () => {} }],
  },
};

export const NotDismissable: Story = {
  args: {
    children: <BannerMessage>This message cannot be dismissed.</BannerMessage>,
    showDismissButton: false,
  },
};

export const CustomContent: Story = {
  args: {
    children: (
      <div>
        <BannerMessage>Custom block</BannerMessage>
        <p className="text-sm opacity-90 mt-1">Additional description or rich content.</p>
      </div>
    ),
  },
};

export const WithTestId: Story = {
  args: {
    testId: 'demo-banner',
    children: <BannerMessage>Banner with testId for testing.</BannerMessage>,
  },
};
