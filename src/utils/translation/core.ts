
import { Language } from '@/types/language';
import { TranslationOptions, TranslationsType } from './types';
import { logMissingTranslationKeys } from '@/translations/utils/validation';

// Import all translations
import translations from '@/translations';

// Export translations for use in other modules
export { translations };

/**
 * Get a nested property from an object using a dot-separated path
 */
export const getNestedProperty = (obj: any, path: string, defaultValue: any = undefined): any => {
  if (!obj || !path) return defaultValue;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return defaultValue;
    }
    
    current = current[key];
    
    if (current === undefined) {
      return defaultValue;
    }
  }
  
  return current !== undefined ? current : defaultValue;
};

// Also export with alternative name for backward compatibility
export const getNestedValue = getNestedProperty;

/**
 * Check if the object is a nested object
 */
export const isNestedObject = (value: any): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Format a translation value
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
  
  return '';
};

/**
 * Create a translation function with improved fallback handling and debugging
 */
export const createTranslationFunction = (
  language: Language,
  allTranslations: Record<Language, any>,
  defaultLanguage: Language = 'he'
) => {
  console.log(`[Translation] Creating function for language: ${language}`);
  console.log(`[Translation] Available languages:`, Object.keys(allTranslations));

  return (key: string, options?: string | TranslationOptions): any => {
    // Handle the case where options is a string (used as defaultValue)
    const opts: TranslationOptions = typeof options === 'string' 
      ? { defaultValue: options } 
      : options || {};
    
    const { 
      defaultValue, 
      returnObjects = false,
      returnNull = false
    } = opts;
    
    // Try to get translation from current language first
    const currentLangTranslations = allTranslations[language];
    if (currentLangTranslations) {
      const value = getNestedProperty(currentLangTranslations, key);
      if (value !== undefined) {
        console.log(`[Translation] Found key "${key}" in ${language}:`, value);
        return returnObjects ? value : formatTranslationValue(value);
      }
    }
    
    // Fallback to English if not the current language
    if (language !== 'en') {
      const enTranslations = allTranslations['en'];
      if (enTranslations) {
        const value = getNestedProperty(enTranslations, key);
        if (value !== undefined) {
          console.log(`[Translation] Fallback to English for "${key}":`, value);
          return returnObjects ? value : formatTranslationValue(value);
        }
      }
    }
    
    // Fallback to default language if different from current and English
    if (language !== defaultLanguage && defaultLanguage !== 'en') {
      const defaultTranslations = allTranslations[defaultLanguage];
      if (defaultTranslations) {
        const value = getNestedProperty(defaultTranslations, key);
        if (value !== undefined) {
          console.log(`[Translation] Fallback to ${defaultLanguage} for "${key}":`, value);
          return returnObjects ? value : formatTranslationValue(value);
        }
      }
    }
    
    // Final fallback
    console.warn(`[Translation] Missing key "${key}" in all languages`);
    if (returnNull) return null;
    return defaultValue !== undefined ? defaultValue : `[${language}:${key}]`;
  };
};

/**
 * Validate translation keys for development
 */
export const validateTranslationKeys = (
  allTranslations: Record<Language, TranslationsType>
): string[] => {
  const missingKeys: string[] = [];
  const languageKeys: Record<string, Set<string>> = {};
  
  // Collect all keys from all languages
  Object.entries(allTranslations).forEach(([lang, translations]) => {
    languageKeys[lang] = new Set();
    
    const collectKeys = (obj: any, prefix = '') => {
      if (!obj || typeof obj !== 'object') return;
      
      Object.entries(obj).forEach(([key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        
        if (isNestedObject(value)) {
          collectKeys(value, fullKey);
        } else {
          languageKeys[lang].add(fullKey);
        }
      });
    };
    
    collectKeys(translations);
  });
  
  return missingKeys;
};
