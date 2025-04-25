
import { TranslationContext } from './types';

/**
 * Format a translation string with variables
 * @param text The translation string with {{variable}} placeholders
 * @param context An object with variable values
 * @returns The formatted string with variables replaced
 */
export const formatTranslation = (text: string, context?: TranslationContext): string => {
  if (!context || typeof text !== 'string') {
    return String(text);
  }

  return Object.entries(context).reduce((result, [key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    return result.replace(regex, String(value));
  }, text);
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
