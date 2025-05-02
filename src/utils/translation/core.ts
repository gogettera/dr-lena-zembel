
import { Language } from '@/types/language';
import heTranslations from '@/translations/he';
import enTranslations from '@/translations/en';
import ruTranslations from '@/translations/ru';
import deTranslations from '@/translations/de';
import arTranslations from '@/translations/ar';
import { TranslationOptions, TranslationsType } from './types';

// Translations object with all languages
export const translations = {
  he: heTranslations,
  en: enTranslations,
  ru: ruTranslations,
  de: deTranslations,
  ar: arTranslations
};

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
 * Create a translation function
 */
export const createTranslationFunction = (
  language: Language,
  allTranslations: Record<Language, any>,
  defaultLanguage: Language = 'he'
) => {
  return (key: string, options?: string | TranslationOptions): any => {
    // Handle the case where options is a string (used as defaultValue)
    const opts: TranslationOptions = typeof options === 'string' 
      ? { defaultValue: options } 
      : options || {};
    
    const { defaultValue, returnObjects } = opts;
    
    // Get current language translations
    const currentTranslations = allTranslations[language] || {};
    
    // Try to get translation from current language
    let translationValue = getNestedProperty(currentTranslations, key);
    
    // If not found, try English as intermediate fallback (more likely to be complete than Hebrew for some users)
    if (translationValue === undefined && language !== 'en') {
      const enTranslations = allTranslations['en'] || {};
      translationValue = getNestedProperty(enTranslations, key);
    }
    
    // If still not found, try default language (Hebrew)
    if (translationValue === undefined && language !== defaultLanguage) {
      const defaultTranslations = allTranslations[defaultLanguage] || {};
      translationValue = getNestedProperty(defaultTranslations, key);
    }
    
    // If still not found, return defaultValue or key itself
    if (translationValue === undefined) {
      return defaultValue !== undefined ? defaultValue : key;
    }
    
    // Handle nested objects if needed for component-specific translations
    if (isNestedObject(translationValue) && !returnObjects) {
      return formatTranslationValue(translationValue);
    }
    
    // Format the value to a string
    return returnObjects ? translationValue : formatTranslationValue(translationValue);
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
  
  // Compare keys across languages
  const languages = Object.keys(allTranslations);
  const baseLanguage = languages[0];
  
  languages.slice(1).forEach(lang => {
    languageKeys[baseLanguage].forEach(key => {
      if (!languageKeys[lang].has(key)) {
        missingKeys.push(`${lang}:${key}`);
      }
    });
  });
  
  return missingKeys;
};
