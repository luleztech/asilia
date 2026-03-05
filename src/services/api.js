/**
 * Dr.Job - API service (REST + JWT + cache)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  API_BASE_URL,
  STORAGE_KEYS,
} from '../utils/constants';
import {
  getCachedData,
  setCachedData,
  isCacheValid,
  setCacheTimestamp,
} from '../utils/helpers';

const getToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
  } catch {
    return null;
  }
};

const request = async (endpoint, options = {}) => {
  const token = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || data.error || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
};

// Auth
export const apiRegister = (body) =>
  request('/register', { method: 'POST', body: JSON.stringify(body) });

export const apiLogin = (body) =>
  request('/login', { method: 'POST', body: JSON.stringify(body) });

// Diseases (with optional cache)
export const apiGetDiseases = async (useCache = true) => {
  if (useCache) {
    const valid = await isCacheValid();
    if (valid) {
      const cached = await getCachedData(STORAGE_KEYS.CACHE_DISEASES);
      if (cached) return cached;
    }
  }
  const data = await request('/diseases');
  await setCachedData(STORAGE_KEYS.CACHE_DISEASES, data);
  await setCacheTimestamp();
  return data;
};

export const apiGetDisease = (id) => request(`/disease/${id}`);

// Herbs (with optional cache)
export const apiGetHerbs = async (useCache = true) => {
  if (useCache) {
    const valid = await isCacheValid();
    if (valid) {
      const cached = await getCachedData(STORAGE_KEYS.CACHE_HERBS);
      if (cached) return cached;
    }
  }
  const data = await request('/herbs');
  await setCachedData(STORAGE_KEYS.CACHE_HERBS, data);
  await setCacheTimestamp();
  return data;
};

export const apiGetHerb = (id) => request(`/herb/${id}`);

// Symptoms
export const apiGetSymptoms = async (useCache = true) => {
  if (useCache) {
    const valid = await isCacheValid();
    if (valid) {
      const cached = await getCachedData(STORAGE_KEYS.CACHE_SYMPTOMS);
      if (cached) return cached;
    }
  }
  const data = await request('/symptoms');
  await setCachedData(STORAGE_KEYS.CACHE_SYMPTOMS, data);
  await setCacheTimestamp();
  return data;
};

export const apiSymptomCheck = (body) =>
  request('/symptom-check', { method: 'POST', body: JSON.stringify(body) });

// Media
export const apiGetVideos = () => request('/videos');
export const apiGetAudios = () => request('/audios');
