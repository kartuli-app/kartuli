import type React from 'react';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const GameThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <div
      style={
        {
          // Game theme overrides
          '--color-ink': 'oklch(15% 0 0)',
          '--color-canvas': 'oklch(99% 0 0)',
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
          // Backoffice theme overrides
          '--color-ink': 'oklch(20% 0 0)',
          '--color-canvas': 'oklch(98% 0 0)',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
