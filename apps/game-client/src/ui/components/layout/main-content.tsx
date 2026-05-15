import type { ReactNode } from 'react';
import { ContentContainer } from './content-container';

export function MainContent({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="bg-main-content-bg flex-1">
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
}
