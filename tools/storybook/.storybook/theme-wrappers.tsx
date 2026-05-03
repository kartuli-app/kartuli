import type React from 'react';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const GameThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <div
      style={
        {
          '--color-color-token-test-primary': 'oklch(64.884% 0.23697 26.959)',
          '--color-color-token-test-neutral': 'oklch(95.383% 0.20324 115.598)',
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
          '--color-color-token-test-primary': 'oklch(20.13% 0.05785 148.293)',
          '--color-color-token-test-neutral': 'oklch(80.668% 0.0999 252.641)',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
