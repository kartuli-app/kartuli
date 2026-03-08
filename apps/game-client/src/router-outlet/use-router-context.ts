import { useContext } from 'react';
import { RouterContext, type RouterContextValue } from './router-context';

export function useRouterContext(): RouterContextValue {
  const value = useContext(RouterContext);
  if (!value) {
    throw new Error('useRouterContext must be used within RouterProvider');
  }
  return value;
}
