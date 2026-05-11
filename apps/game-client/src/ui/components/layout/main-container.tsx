import type { ReactNode } from 'react';
import { ContentContainer } from './content-container';

export function MainContainer({ children }: Readonly<{ children: ReactNode }>) {
  return <ContentContainer>{children}</ContentContainer>;
}
