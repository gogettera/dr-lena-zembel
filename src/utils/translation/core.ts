
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
  // Debug: Log translation structure in development
  console.log(`[Translation Debug] Creating translation function for language: ${language}`);
  console.log(`[Translation Debug] Available languages:`, Object.keys(allTranslations));
  console.log(`[Translation Debug] Current language translation structure:`, allTranslations[language]);
  console.log(`[Translation Debug] Sample translation lookup test:`, getNestedProperty(allTranslations[language], 'common.clinicName'));

  return (key: string, options?: string | TranslationOptions): any => {
    // Handle the case where options is a string (used as defaultValue)
    const opts: TranslationOptions = typeof options === 'string' 
      ? { defaultValue: options } 
      : options || {};
    
    const { 
      defaultValue, 
      returnObjects = false,
      returnNull = false,
      showDebug = true // Force debug for now to see what's happening
    } = opts;
    
    console.log(`[Translation Debug] Looking up key: ${key} for language: ${language}`);
    
    // Lookup chain: current language -> intermediate fallbacks -> default language -> default value/key
    const languageChain: Language[] = [];
    
    // Start with the requested language
    languageChain.push(language);
    
    // English as common intermediate fallback (unless it's already the current language)
    if (language !== 'en') {
      languageChain.push('en');
    }
    
    // Default language as final fallback (unless already checked)
    if (defaultLanguage !== language && defaultLanguage !== 'en') {
      languageChain.push(defaultLanguage);
    }
    
    // Try to get translation from the language chain
    let translationValue: any = undefined;
    let sourceLanguage: Language | undefined = undefined;
    
    for (const lang of languageChain) {
      const langTranslations = allTranslations[lang];
      console.log(`[Translation Debug] Checking language ${lang}, has translations:`, !!langTranslations);
      
      if (!langTranslations) {
        console.warn(`[Translation Debug] No translations found for language: ${lang}`);
        continue;
      }
      
      const value = getNestedProperty(langTranslations, key);
      console.log(`[Translation Debug] Key ${key} in ${lang}:`, value);
      
      if (value !== undefined) {
        translationValue = value;
        sourceLanguage = lang;
        console.log(`[Translation Debug] Found translation in ${lang}:`, value);
        break;
      }
    }
    
    // If no translation found in any language, return fallback
    if (translationValue === undefined) {
      console.warn(`[Translation Debug] Missing translation for key: ${key} in all languages`);
      // If returnNull is true, return null instead of defaultValue/key
      if (returnNull) return null;
      
      const fallback = defaultValue !== undefined ? defaultValue : `[${language}:${key}]`;
      console.log(`[Translation Debug] Using fallback:`, fallback);
      return fallback;
    }
    
    // Handle nested objects if needed
    if (isNestedObject(translationValue) && !returnObjects) {
      return formatTranslationValue(translationValue);
    }
    
    // If source language is different from requested language and in dev mode, log a warning
    if (sourceLanguage !== language) {
      console.info(`[Translation Debug] Used fallback for '${key}': ${language} -> ${sourceLanguage}`);
    }
    
    // Format the value to a string or return object if requested
    const result = returnObjects ? translationValue : formatTranslationValue(translationValue);
    console.log(`[Translation Debug] Final result for ${key}:`, result);
    return result;
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
