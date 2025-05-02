
import type { Language } from '@/types/language';

/**
 * Validates that all translation keys in the reference language exist in the target language
 * @param translations The complete translations object
 * @param referenceLanguage The language to use as reference (typically 'en' or 'he')
 * @param targetLanguage The language to check against the reference 
 * @returns An array of missing key paths
 */
export function validateTranslationKeys(
  translations: Record<Language, any>,
  referenceLanguage: Language = 'he',
  targetLanguage?: Language
): string[] {
  const missingKeys: string[] = [];
  const referenceObj = translations[referenceLanguage];
  
  if (!referenceObj) {
    console.warn(`Reference language '${referenceLanguage}' not found in translations.`);
    return missingKeys;
  }

  // Check all languages if no specific target language is provided
  const languagesToCheck = targetLanguage 
    ? [targetLanguage]
    : (Object.keys(translations) as Language[]).filter(lang => lang !== referenceLanguage);
  
  // Helper function to recursively check keys
  function checkKeysRecursively(refObj: any, targetObj: any, keyPath: string = '') {
    if (!refObj || typeof refObj !== 'object') return;
    if (!targetObj || typeof targetObj !== 'object') {
      missingKeys.push(keyPath || 'root');
      return;
    }

    Object.keys(refObj).forEach(key => {
      const newPath = keyPath ? `${keyPath}.${key}` : key;
      
      if (!(key in targetObj)) {
        missingKeys.push(newPath);
      } else if (
        typeof refObj[key] === 'object' && 
        refObj[key] !== null &&
        !Array.isArray(refObj[key])
      ) {
        checkKeysRecursively(refObj[key], targetObj[key], newPath);
      }
    });
  }

  // Check each language against the reference
  languagesToCheck.forEach(lang => {
    const langObj = translations[lang];
    if (!langObj) {
      console.warn(`Language '${lang}' not found in translations.`);
      return;
    }
    
    checkKeysRecursively(referenceObj, langObj);
  });

  return missingKeys;
}

/**
 * Logs missing translation keys in a clean format during development
 * @param translations The complete translations object
 */
export function logMissingTranslationKeys(translations: Record<Language, any>): void {
  if (process.env.NODE_ENV !== 'development') return;

  const referenceLanguages = ['he', 'en'] as Language[];
  
  // Check with each reference language
  referenceLanguages.forEach(refLang => {
    const otherLanguages = (Object.keys(translations) as Language[])
      .filter(lang => lang !== refLang);
    
    otherLanguages.forEach(lang => {
      const missing = validateTranslationKeys(translations, refLang, lang);
      if (missing.length > 0) {
        console.warn(`Missing translations in '${lang}' (compared to '${refLang}'):`, 
          missing.slice(0, 15), 
          missing.length > 15 ? `... and ${missing.length - 15} more` : '');
      }
    });
  });
}
