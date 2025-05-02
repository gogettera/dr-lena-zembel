
import { Language } from '@/types/language';

/**
 * Log missing translation keys to help identify gaps in translation coverage
 */
export const logMissingTranslationKeys = (translations: Record<Language, Record<string, any>>) => {
  // Only run in development mode
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Get all supported languages
  const languages = Object.keys(translations) as Language[];
  
  // Skip if we don't have proper translation data
  if (languages.length < 2) return;

  // Use Hebrew (or first language) as the baseline
  const baseLanguage = 'he' in translations ? 'he' : languages[0];
  const baseTranslations = translations[baseLanguage];

  // Extract all translation keys from the baseline
  const baseKeys: string[] = [];
  
  // Helper function to recursively extract keys
  const extractKeys = (obj: any, prefix = '') => {
    if (!obj || typeof obj !== 'object') return;
    
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        extractKeys(value, fullKey);
      } else {
        baseKeys.push(fullKey);
      }
    });
  };
  
  extractKeys(baseTranslations);
  
  // Check each language against the baseline
  const missingTranslations: Record<Language, string[]> = {
    he: [],
    en: [],
    ru: [],
    de: [],
    ar: []
  };
  
  languages.forEach(lang => {
    if (lang === baseLanguage) return;
    
    const missingKeys = baseKeys.filter(key => {
      const keyParts = key.split('.');
      let current = translations[lang];
      
      for (const part of keyParts) {
        if (!current || typeof current !== 'object') {
          return true;
        }
        current = current[part];
        if (current === undefined) {
          return true;
        }
      }
      
      return false;
    });
    
    if (missingKeys.length > 0) {
      missingTranslations[lang] = missingKeys;
    }
  });
  
  // Log results
  if (Object.keys(missingTranslations).some(lang => missingTranslations[lang as Language].length > 0)) {
    console.group('Missing Translation Keys:');
    Object.entries(missingTranslations).forEach(([lang, keys]) => {
      if (keys.length > 0) {
        console.log(`${lang}: ${keys.length} missing keys`);
        console.log(keys);
      }
    });
    console.groupEnd();
  }
};
