/**
 * Dr.Job - Helper utilities
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, CACHE_DURATION_MS } from './constants';

export const getCachedData = async (key) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setCachedData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Cache write failed', e);
  }
};

export const isCacheValid = async () => {
  try {
    const ts = await AsyncStorage.getItem(STORAGE_KEYS.CACHE_TIMESTAMP);
    if (!ts) return false;
    return Date.now() - parseInt(ts, 10) < CACHE_DURATION_MS;
  } catch {
    return false;
  }
};

export const setCacheTimestamp = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CACHE_TIMESTAMP, String(Date.now()));
  } catch (e) {
    console.warn('Cache timestamp failed', e);
  }
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('sw-TZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const truncate = (str, len = 80) => {
  if (!str || typeof str !== 'string') return '';
  return str.length <= len ? str : str.slice(0, len).trim() + '...';
};
