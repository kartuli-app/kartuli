'use client';

import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';

// ============================================================
// CONTEXT INTERFACE
// ============================================================

interface GlobalAppState {
  isSoundEnabled: boolean;
}

interface AppContextValue {
  // Global app state
  globalState: GlobalAppState;
  setGlobalState: (updater: (prev: GlobalAppState) => GlobalAppState) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// ============================================================
// PROVIDER
// ============================================================

interface AppProviderProps {
  children: ReactNode;
}

const initialGlobalState: GlobalAppState = {
  isSoundEnabled: true,
};

export function AppProvider({ children }: AppProviderProps) {
  const [globalState, setGlobalState] = useState<GlobalAppState>(initialGlobalState);

  const updateGlobalState = useCallback((updater: (prev: GlobalAppState) => GlobalAppState) => {
    setGlobalState(updater);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      globalState,
      setGlobalState: updateGlobalState,
    }),
    [globalState, updateGlobalState],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
