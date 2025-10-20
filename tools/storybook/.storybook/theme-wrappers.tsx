import type React from 'react';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const GameThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <div
      style={
        {
          // Game theme overrides - matches apps/game-client/src/app/theme.css
          '--color-ink': 'oklch(64.884% 0.23697 26.959)',
          '--color-canvas': 'oklch(95.383% 0.20324 115.598)',
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
          // Backoffice theme overrides - matches apps/backoffice-client/src/app/theme.css
          '--color-ink': 'oklch(20.13% 0.05785 148.293)',
          '--color-canvas': 'oklch(80.668% 0.0999 252.641)',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
