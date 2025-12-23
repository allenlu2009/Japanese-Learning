import { TestCategory } from './types';

// Category definitions
export const CATEGORIES: TestCategory[] = ['read', 'listen', 'write', 'speak'];

// Category labels for display
export const CATEGORY_LABELS: Record<TestCategory, string> = {
  read: 'Reading',
  listen: 'Listening',
  write: 'Writing',
  speak: 'Speaking',
};

// Category colors (matching Tailwind config)
export const CATEGORY_COLORS: Record<TestCategory, { bg: string; text: string; border: string }> = {
  read: {
    bg: 'bg-read/10',
    text: 'text-read',
    border: 'border-read',
  },
  listen: {
    bg: 'bg-listen/10',
    text: 'text-listen',
    border: 'border-listen',
  },
  write: {
    bg: 'bg-write/10',
    text: 'text-write',
    border: 'border-write',
  },
  speak: {
    bg: 'bg-speak/10',
    text: 'text-speak',
    border: 'border-speak',
  },
};

// Category icon colors (for charts)
export const CATEGORY_CHART_COLORS: Record<TestCategory, string> = {
  read: '#10b981',
  listen: '#f59e0b',
  write: '#8b5cf6',
  speak: '#ef4444',
};

// localStorage key
export const STORAGE_KEY = 'japanese-learning-tests';

// Storage version
export const STORAGE_VERSION = '1.0';

// Score range
export const MIN_SCORE = 0;
export const MAX_SCORE = 100;

// Description limits
export const MIN_DESCRIPTION_LENGTH = 1;
export const MAX_DESCRIPTION_LENGTH = 500;
