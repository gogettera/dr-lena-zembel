
// Main export file for translation utilities
// This centralizes all translation-related exports to avoid import errors

// Types
export * from './types';

// Core translation functionality
export {
  translations,
  createTranslationFunction,
  getNestedProperty,
  getNestedValue,
  validateTranslationKeys,
  isNestedObject,
  formatTranslationValue
} from './core';

// Format helpers
export * from './format';

// Translation modules
export * from './modules';
