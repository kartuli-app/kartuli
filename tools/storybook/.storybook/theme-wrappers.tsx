import type React from 'react';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const PrimaryGreenThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <div
      style={
        {
          '--color-primary': '#00FF00',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export const PrimaryRedThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <div
      style={
        {
          '--color-primary': 'red',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
