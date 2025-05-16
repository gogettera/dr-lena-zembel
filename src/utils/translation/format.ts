
import { TranslationOptions } from './types';

/**
 * Format a date according to the specified locale
 * 
 * @param date The date to format
 * @param locale The locale to use for formatting
 * @returns A formatted date string
 */
export const formatDate = (date: Date, locale: string = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale).format(date);
};

/**
 * Format a number according to the specified locale
 * 
 * @param num The number to format
 * @param locale The locale to use for formatting
 * @returns A formatted number string
 */
export const formatNumber = (num: number, locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Format a currency value according to the specified locale and currency
 * 
 * @param value The number to format as currency
 * @param locale The locale to use for formatting
 * @param currency The currency code (e.g., 'USD', 'EUR', 'ILS')
 * @returns A formatted currency string
 */
export const formatCurrency = (
  value: number, 
  locale: string = 'en-US', 
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Check if the object is a nested object
 * 
 * @param value The value to check
 * @returns True if the value is a nested object
 */
export const isNestedObject = (value: any): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Format a translation value based on options
 * 
 * @param value The translation value
 * @param options Options for formatting
 * @returns The formatted string
 */
export const formatTranslationValue = (
  value: any, 
  options?: TranslationOptions
): string => {
  // For now, just return the value - we can add more formatting options later
  return safeString(value);
};

/**
 * Safely convert any value to a string
 * 
 * @param value The value to convert to a string
 * @returns A string representation of the value
 */
export const safeString = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch (e) {
      // Handle circular references or other stringify errors
      return '[Complex Object]';
    }
  }
  
  return String(value);
};

/**
 * Format a translation string with variables
 * 
 * @param text The text to format with {{variableName}} placeholders
 * @param variables Object containing variable values
 * @returns Formatted string with variables replaced
 */
export const formatTranslation = (
  text: string,
  variables?: Record<string, any> | null
): string => {
  if (!text) return '';
  if (!variables) return text;

  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = variables[key];
    return value !== undefined ? safeString(value) : match;
  });
};
