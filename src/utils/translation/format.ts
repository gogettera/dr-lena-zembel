
import { TranslationContext } from './types';

/**
 * Format a translation string with variables
 * @param text The translation string with {{variable}} placeholders
 * @param context An object with variable values
 * @returns The formatted string with variables replaced
 */
export const formatTranslation = (text: string, context?: TranslationContext): string => {
  if (!context || typeof text !== 'string') {
    return String(text || '');
  }

  return Object.entries(context).reduce((result, [key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    return result.replace(regex, String(value));
  }, text);
};

/**
 * Check if a value is a nested object (not null, not array, but object)
 * @param value The value to check
 * @returns true if the value is a nested object
 */
export const isNestedObject = (value: any): boolean => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Format a translation value for display, handling objects and other types
 * @param value Any translation value
 * @returns A string representation of the value
 */
export const formatTranslationValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  if (isNestedObject(value)) {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return '[Complex Object]';
    }
  }
  
  return String(value);
};

/**
 * Ensure translation output is always a string
 * @param input Any translation output
 * @param defaultValue Fallback if input cannot be converted to string
 * @returns A string representation of the input
 */
export const ensureString = (input: any, defaultValue = ''): string => {
  if (input === null || input === undefined) {
    return defaultValue;
  }
  
  if (typeof input === 'string') {
    return input;
  }
  
  if (typeof input === 'number' || typeof input === 'boolean') {
    return String(input);
  }
  
  if (typeof input === 'object') {
    try {
      return JSON.stringify(input);
    } catch (e) {
      return defaultValue;
    }
  }
  
  return defaultValue;
};

/**
 * Safely stringify a value, handling circular references
 * @param value Any value to convert to string
 * @returns String representation of the value
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
      // Use replacer to handle circular references
      return JSON.stringify(value, (key, val) => {
        if (typeof val === 'object' && val !== null) {
          if (seen.has(val)) return '[Circular Reference]';
          seen.add(val);
        }
        return val;
      });
    } catch (e) {
      return '[Complex Object]';
    }
    
    // Helper variable to detect circular references
    const seen = new WeakSet();
  }
  
  return String(value);
};
