
/**
 * Utility functions for formatting translation values
 */

import { TranslationContext } from './types';

/**
 * Function to replace placeholders in a string with values from context
 * Supports both {{key}} and {key} formats
 */
export const interpolate = (text: string, context?: TranslationContext): string => {
  if (!context || !text) return text;
  
  let result = text;
  
  // Replace {{key}} format
  result = result.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const value = context[key.trim()];
    return value !== undefined ? String(value) : match;
  });
  
  // Replace {key} format
  result = result.replace(/\{([^}]+)\}/g, (match, key) => {
    const value = context[key.trim()];
    return value !== undefined ? String(value) : match;
  });
  
  return result;
};

/**
 * Format a number according to a specific locale
 */
export const formatNumber = (value: number, locale: string = 'he-IL'): string => {
  try {
    return new Intl.NumberFormat(locale).format(value);
  } catch (error) {
    console.error('Error formatting number:', error);
    return String(value);
  }
};

/**
 * Format a date according to a specific locale
 */
export const formatDate = (
  value: Date | string | number,
  locale: string = 'he-IL',
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string => {
  try {
    const date = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(value);
  }
};

/**
 * Format a price with currency symbol
 */
export const formatPrice = (
  value: number,
  locale: string = 'he-IL',
  currency: string = 'ILS'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol'
    }).format(value);
  } catch (error) {
    console.error('Error formatting price:', error);
    return String(value);
  }
};

/**
 * Simple pluralization function
 */
export const pluralize = (
  count: number,
  singular: string,
  plural: string,
  zero?: string
): string => {
  if (count === 0 && zero !== undefined) {
    return zero;
  }
  return count === 1 ? singular : plural;
};
