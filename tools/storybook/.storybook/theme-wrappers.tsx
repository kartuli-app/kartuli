import type React from 'react';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const GameThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <div
      style={
        {
          // Override primary color for game branding
          '--color-primary-500': 'oklch(60% 0.25 280)',
          '--color-primary-600': 'oklch(52% 0.23 280)',
          // Game-specific accent
          '--color-secondary-500': 'oklch(70% 0.22 340)',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export const BackofficeThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <div
      style={
        {
          // Override primary color for backoffice branding
          '--color-primary-500': 'oklch(50% 0.18 200)',
          '--color-primary-600': 'oklch(42% 0.16 200)',
          // Professional, muted secondary
          '--color-secondary-500': 'oklch(60% 0.12 180)',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
