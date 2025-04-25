
import { TranslationValue, TranslationOptions } from './types';
import { Language } from '@/types/language';
import { formatTranslation } from './format';

// Helper function to get a nested value from an object using dot notation
export const getNestedValue = (
  obj: Record<string, any>,
  path: string,
  defaultValue: any = undefined
): any => {
  try {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result === undefined || result === null || typeof result !== 'object') {
        return defaultValue;
      }
      result = result[key];
    }
    
    return result !== undefined ? result : defaultValue;
  } catch (error) {
    console.error('Error in getNestedValue:', error);
    return defaultValue;
  }
};

// Create a translation function for the given language
export const createTranslationFunction = (
  language: Language,
  translations: Record<Language, Record<string, any>>,
  defaultLanguage: Language = 'he'
) => {
  return (key: string, options?: string | TranslationOptions): any => {
    try {
      // Handle the case where options is a string (used as defaultValue)
      const opts = typeof options === 'string' 
        ? { defaultValue: options } 
        : options || {};
      
      // Try to get the translation from the current language
      const currentTranslations = translations[language] || {};
      let translation = getNestedValue(currentTranslations, key);
      
      // If not found, try the default language
      if (translation === undefined && language !== defaultLanguage) {
        const defaultTranslations = translations[defaultLanguage] || {};
        translation = getNestedValue(defaultTranslations, key);
      }
      
      // If still not found, use the provided default value or the key itself
      if (translation === undefined) {
        console.warn(`Translation key not found: ${key} in language ${language}`);
        return opts.defaultValue || key;
      }
      
      // Check if we need to return objects (arrays, objects)
      if (opts.returnObjects && typeof translation === 'object') {
        return translation;
      }
      
      // For non-object values or when returnObjects is false, ensure we return a string
      if (typeof translation !== 'object') {
        const result = String(translation);
        
        // Process variable replacements if context is provided
        if (opts.context !== undefined) {
          return formatTranslation(result, { name: opts.context });
        }
        
        return result;
      }
      
      // For objects without returnObjects flag, convert to string or return key
      return opts.defaultValue || key;
    } catch (error) {
      console.error('Error in translation function:', error);
      return opts?.defaultValue || key;
    }
  };
};

// Utility function to validate translation keys
export const validateTranslationKeys = (
  translations: Record<Language, Record<string, any>>,
  languages: Language[] = ['he', 'en', 'ru', 'de', 'ar']
): string[] => {
  const missingKeys: string[] = [];
  const baseLanguage = 'he';
  const baseTranslations = translations[baseLanguage] || {};
  
  // Extract all keys from base language
  const extractKeys = (obj: any, prefix = '') => {
    const keys: string[] = [];
    
    for (const key in obj) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        // Recursively extract keys for nested objects
        keys.push(...extractKeys(obj[key], currentPath));
      } else {
        // Add leaf node key
        keys.push(currentPath);
      }
    }
    
    return keys;
  };
  
  const baseKeys = extractKeys(baseTranslations);
  
  // Check all languages for missing keys
  languages.forEach(lang => {
    if (lang === baseLanguage) return;
    
    const langTranslations = translations[lang] || {};
    baseKeys.forEach(key => {
      if (getNestedValue(langTranslations, key) === undefined) {
        missingKeys.push(`${lang}:${key}`);
      }
    });
  });
  
  return missingKeys;
};
