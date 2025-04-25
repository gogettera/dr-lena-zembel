
import { Language } from '@/types/language';

/**
 * Types of translation return values
 */
export type TranslationValue = string | number | boolean | null | undefined | object | any[];
export type TranslationOptions = {
  returnObjects?: boolean;
  defaultValue?: string;
  context?: string;
  count?: number;
  [key: string]: any;
};

/**
 * Debug function to help track translation issues
 */
const debugTranslation = (key: string, language: string, value: any, path: string[] = []): void => {
  if (process.env.NODE_ENV === 'development' && !value && key !== '') {
    console.warn(
      `[Translation] Key "${key}" not found in language "${language}". ` +
        `Path attempted: ${path.join(' -> ')}`
    );
  }
};

/**
 * Safely accesses a nested property in an object using a dot notation path
 * 
 * @param obj The object to access
 * @param path The path in dot notation (e.g. 'user.profile.name')
 * @returns The value at the path or undefined if not found
 */
export function getNestedValue(obj: any, path: string): TranslationValue {
  if (!obj || typeof obj !== 'object') return undefined;
  
  const parts = path.split('.');
  let current = obj;
  const pathTraversed: string[] = [];
  
  for (const part of parts) {
    pathTraversed.push(part);
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = current[part];
  }
  
  return current;
}

/**
 * Safely formats a translation value for display
 * 
 * @param value Any translation value
 * @returns A string representation suitable for display
 */
export function formatTranslationValue(value: TranslationValue): string {
  if (value === undefined || value === null) {
    return '';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  // For simple primitives, convert to string
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  // For objects and arrays, return a placeholder instead of trying to stringify
  if (typeof value === 'object') {
    return '[Complex Object]';
  }
  
  return String(value);
}

/**
 * Determines if a value is a complex object (not null and not an array)
 * 
 * @param value The value to check
 * @returns True if the value is a complex object
 */
export function isComplexObject(value: TranslationValue): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Determines if a value is an array
 * 
 * @param value The value to check
 * @returns True if the value is an array
 */
export function isArrayValue(value: TranslationValue): boolean {
  return Array.isArray(value);
}

/**
 * Gets a translation from the given translations object
 * 
 * @param translations The translations object
 * @param key The translation key in dot notation
 * @param options Translation options
 * @returns The translated value
 */
export function getTranslation(
  translations: Record<string, any>,
  key: string,
  options?: string | TranslationOptions,
  language: string = 'unknown'
): any {
  // Handle options
  const opts = typeof options === 'string' ? { defaultValue: options } : options || {};
  const { returnObjects, defaultValue } = opts as TranslationOptions;
  
  // Get the value at the path
  const value = getNestedValue(translations, key);
  
  // If not found, log in development and return the default value or the key
  if (value === undefined) {
    debugTranslation(key, language, value, key.split('.'));
    return defaultValue || key;
  }
  
  // If returnObjects is true and value is an object/array, return it directly
  if (returnObjects && (typeof value === 'object')) {
    return value;
  }
  
  // Otherwise, format it as a string
  return formatTranslationValue(value);
}

/**
 * Creates a translation function for the specified language
 * 
 * @param language The current language
 * @param translations All available translations
 * @param defaultLanguage The fallback language
 * @returns A translation function
 */
export function createTranslationFunction(
  language: Language,
  translations: Record<Language, Record<string, any>>,
  defaultLanguage: Language = 'he'
) {
  return function translate(key: string, options?: string | TranslationOptions): any {
    // Try in current language
    const currentTranslations = translations[language] || {};
    const value = getTranslation(currentTranslations, key, options, language);
    
    // If the result is the key itself, try the default language
    if (value === key && language !== defaultLanguage) {
      const defaultTranslations = translations[defaultLanguage] || {};
      return getTranslation(defaultTranslations, key, options, defaultLanguage);
    }
    
    return value;
  };
}
