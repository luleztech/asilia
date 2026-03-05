/**
 * Dr.Job - Auth context (JWT login/register/logout)
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';
import { apiLogin, apiRegister } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStoredAuth = useCallback(async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER),
      ]);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.warn('Load auth failed', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  const login = useCallback(async (phone, password) => {
    const res = await apiLogin({ phone, password });
    const { token: t, user: u } = res;
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.TOKEN, t),
      AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(u)),
    ]);
    setToken(t);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (name, phone, password) => {
    const res = await apiRegister({ name, phone, password });
    const { token: t, user: u } = res;
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.TOKEN, t),
      AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(u)),
    ]);
    setToken(t);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.USER),
    ]);
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    isLoggedIn: !!token,
    login,
    register,
    logout,
    refreshUser: loadStoredAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
