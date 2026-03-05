/**
 * Dr.Job - App constants (Swahili health app)
 */

export const APP_NAME = 'Dr.Job';

export const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:8000'  // Android emulator - run backend: cd backend/api && php -S 0.0.0.0:8000
  : 'https://your-api-domain.com/api';

export const STORAGE_KEYS = {
  TOKEN: '@drjob_token',
  USER: '@drjob_user',
  CACHE_DISEASES: '@drjob_cache_diseases',
  CACHE_HERBS: '@drjob_cache_herbs',
  CACHE_SYMPTOMS: '@drjob_cache_symptoms',
  CACHE_TIMESTAMP: '@drjob_cache_ts',
};

export const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export const COLORS = {
  primary: '#16a34a',
  primaryDark: '#15803d',
  background: '#f9fafb',
  card: '#ffffff',
  text: '#111827',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  error: '#dc2626',
  success: '#16a34a',
};

export const PREMIUM_PRICE_TSH = 2000;
export const PREMIUM_PRICE_LABEL = '2,000 Tsh / mwezi';
