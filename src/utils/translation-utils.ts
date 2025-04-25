
import { Language } from '@/types/language';

export type TranslationOptions = {
  returnObjects?: boolean;
  defaultValue?: string;
  context?: string;
  count?: number;
};

export type TranslationValue = string | Record<string, any> | string[];

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
        return opts.defaultValue || key;
      }
      
      // Check if we need to return objects (arrays, objects)
      if (opts.returnObjects && typeof translation === 'object') {
        return translation;
      }
      
      // For non-object values or when returnObjects is false, ensure we return a string
      if (typeof translation !== 'object') {
        return String(translation);
      }
      
      // For objects without returnObjects flag, convert to string or return key
      return opts.defaultValue || key;
    } catch (error) {
      console.error('Error in translation function:', error);
      return key;
    }
  };
};

// Format a translation with variables using the {{variable}} syntax
export const formatTranslation = (
  translation: string,
  variables?: Record<string, any>
): string => {
  if (!variables) {
    return translation;
  }
  
  return translation.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return variables[key] !== undefined ? String(variables[key]) : `{{${key}}}`;
  });
};

// Combines translations from multiple files into one object
export const combineTranslations = (translationModules: Record<string, any>) => {
  const combined: Record<string, any> = {};
  
  for (const [key, module] of Object.entries(translationModules)) {
    if (typeof module === 'object') {
      combined[key] = module;
    }
  }
  
  return combined;
};
