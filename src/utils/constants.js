/**
 * Asilia (Dr.Job) - App constants & theme from afyabora design
 * Backend/API unchanged (Node + Railway).
 */

export const APP_NAME = 'Dr.Job';

export const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:8000'
  : 'https://asilia.up.railway.app';

export const STORAGE_KEYS = {
  TOKEN: '@drjob_token',
  USER: '@drjob_user',
  CACHE_DISEASES: '@drjob_cache_diseases',
  CACHE_HERBS: '@drjob_cache_herbs',
  CACHE_SYMPTOMS: '@drjob_cache_symptoms',
  CACHE_TIMESTAMP: '@drjob_cache_ts',
};

export const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;

/** Afyabora theme - HSL mapped to hex for RN */
export const COLORS = {
  primary: '#16a34a',
  primaryForeground: '#ffffff',
  primaryDark: '#15803d',
  primaryLight: '#dcfce7',
  background: '#f0fdf4',
  backgroundAlt: '#ecfdf5',
  card: '#ffffff',
  cardForeground: '#14532d',
  text: '#14532d',
  textSecondary: '#64748b',
  muted: '#f0fdf4',
  mutedForeground: '#64748b',
  secondary: '#dcfce7',
  secondaryForeground: '#166534',
  accent: '#eab308',
  accentForeground: '#ffffff',
  border: '#dcfce7',
  destructive: '#dc2626',
  error: '#dc2626',
  success: '#16a34a',
  warning: '#d97706',
  overlay: 'rgba(15, 23, 42, 0.5)',
};

/** 8pt grid */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const FONTS = {
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

export const SHADOW = {
  card: {
    shadowColor: '#14532d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHover: {
    shadowColor: '#14532d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  button: {
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
};

export const PREMIUM_PRICE_TSH = 2000;
export const PREMIUM_PRICE_LABEL = '2,000 Tsh / mwezi';
