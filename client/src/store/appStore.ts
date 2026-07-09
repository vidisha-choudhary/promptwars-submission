import { useState, useEffect } from 'react';

export interface AppState {
  userRole: 'fan' | 'operator' | 'organizer' | null;
  notifications: string[];
}

let state: AppState = {
  userRole: null,
  notifications: [],
};

const listeners = new Set<(s: AppState) => void>();

const updateState = (nextState: Partial<AppState>) => {
  state = { ...state, ...nextState };
  listeners.forEach((listener) => listener(state));
};

export const appStore = {
  getState: () => state,
  setUserRole: (role: 'fan' | 'operator' | 'organizer' | null) => {
    updateState({ userRole: role });
  },
  addNotification: (msg: string) => {
    updateState({ notifications: [...state.notifications, msg] });
  },
  clearNotifications: () => {
    updateState({ notifications: [] });
  },
};

export const useAppStore = () => {
  const [localState, setLocalState] = useState(state);

  useEffect(() => {
    const listener = (next: AppState) => setLocalState(next);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    state: localState,
    actions: appStore,
  };
};
