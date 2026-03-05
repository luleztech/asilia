/**
 * Dr.Job - User context (profile, subscription)
 */

import React, { createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;

  const isPremium = !!user?.subscription_status && user.subscription_status === 'active';

  const value = {
    user,
    isPremium,
    subscriptionStatus: user?.subscription_status || null,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
