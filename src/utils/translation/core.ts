
import { isNestedObject } from './utils';
import { formatTranslation } from './format';
import { NestedObject, TranslationsType, TranslationOptions } from './types';

/**
 * Gets a nested value from an object using a dot-notation path
 */
export const getNestedValue = (obj: NestedObject, path: string): any => {
  if (!obj || !path) return undefined;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === undefined || current === null) return undefined;
    current = current[key];
  }
  
  return current;
};

/**
 * A function to safely access a value from translations using a key path
 * 
 * @param translations The translations object
 * @param key The key path (e.g. 'common.buttons.submit')
 * @returns The translation value or undefined if not found
 */
export const getTranslation = (
  translations: TranslationsType, 
  key: string
): any => {
  return getNestedValue(translations, key);
};

/**
 * Formats a translation value for display
 */
export const formatTranslationValue = (value: any): string => {
  if (value === undefined || value === null) {
    return '';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'object') {
    return '[Complex Object]';
  }
  
  return String(value);
};

/**
 * Interpolates parameters into a translation string
 * 
 * @param text The translation string with placeholders like {{name}}
 * @param params Object containing the parameter values
 * @returns The interpolated string
 */
export const interpolateParams = (
  text: string, 
  params?: Record<string, string>
): string => {
  if (!params || typeof text !== 'string') return text;
  
  return Object.entries(params).reduce((result, [key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    return result.replace(regex, value);
  }, text);
};

/**
 * Main translation function
 * 
 * @param translations The translations object
 * @param key The key path (e.g. 'common.buttons.submit')
 * @param options Options for translation (namespace, params, fallback)
 * @returns The translated string
 */
export const translate = (
  translations: TranslationsType, 
  key: string, 
  options?: TranslationOptions
): string => {
  const namespace = options?.namespace || '';
  const params = options?.params || {};
  const fallback = options?.fallback || key;
  
  const fullKey = namespace ? `${namespace}.${key}` : key;
  const value = getTranslation(translations, fullKey);
  
  if (value === undefined || value === null) {
    return fallback;
  }
  
  if (typeof value === 'string') {
    return interpolateParams(value, params);
  }
  
  return formatTranslation(value);
};
