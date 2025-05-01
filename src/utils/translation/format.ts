
import { TranslationContext } from './types';
import { isNestedObject } from './core';

/**
 * Format a string with interpolation values
 */
export const formatInterpolation = (
  text: string,
  context?: TranslationContext
): string => {
  if (!context || !text.includes('{{')) return text;

  return text.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    const value = context[key.trim()];
    return value !== undefined ? String(value) : '';
  });
};

/**
 * Format number according to locale
 */
export const formatNumber = (
  value: number,
  locale: string = 'he-IL'
): string => {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Format date according to locale
 */
export const formatDate = (
  value: Date | string | number,
  locale: string = 'he-IL',
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }
): string => {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, options).format(date);
};

/**
 * Safe string conversion for any value
 */
export const safeString = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(safeString).join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

/**
 * Format a translation with context and pluralization
 */
export const formatTranslation = (
  translation: string,
  context?: any,
  count?: number
): string => {
  // Handle empty translations
  if (!translation) return '';
  
  // Handle simple translations without context
  if (!context && count === undefined) return translation;

  // Apply pluralization if count is provided
  let result = translation;
  
  // Apply context interpolation
  if (context) {
    result = formatInterpolation(result, context);
  }
  
  return result;
};

/**
 * Re-export isNestedObject for use in tests
 */
export { isNestedObject } from './core';

/**
 * Format a translation value, handling objects and other types safely
 */
export const formatTranslationValue = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (isNestedObject(value)) {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return '[Complex Object]';
    }
  }
  return String(value);
};
