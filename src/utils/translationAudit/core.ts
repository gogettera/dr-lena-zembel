
import { translations } from '@/utils/translation/core';
import { Language } from '@/types/language';
import { TranslationAuditReport, MissingTranslationKey } from './types';
import { EXPECTED_UI_KEYS, TREATMENT_TYPES, SUPPORTED_LANGUAGES } from './constants';
import { checkKeyExists, generateTreatmentKeys, getKeyPriority } from './helpers';

export function auditSpecificTreatment(treatmentType: string): TranslationAuditReport {
  const missingKeys: MissingTranslationKey[] = [];
  const languages = SUPPORTED_LANGUAGES;
  const completionByLanguage: Record<Language, number> = {} as Record<Language, number>;
  const categorySummary: Record<string, number> = {};
  
  // Generate keys for specific treatment
  const treatmentKeys = generateTreatmentKeys(treatmentType);
  const allKeysToCheck: Array<{key: string, category: string, priority: 'high' | 'medium' | 'low'}> = [];
  
  // Add treatment-specific keys
  treatmentKeys.forEach(key => {
    const priority = getKeyPriority(key);
    
    allKeysToCheck.push({
      key,
      category: `Treatment: ${treatmentType}`,
      priority
    });
  });
  
  // Check each key across all languages
  allKeysToCheck.forEach(({key, category, priority}) => {
    const missingInLanguages: Language[] = [];
    
    languages.forEach(language => {
      if (!checkKeyExists(translations, language, key)) {
        missingInLanguages.push(language);
      }
    });
    
    if (missingInLanguages.length > 0) {
      missingKeys.push({
        key,
        missingInLanguages,
        usedInFiles: [], // Will be populated by file analysis
        category,
        priority
      });
      
      categorySummary[category] = (categorySummary[category] || 0) + 1;
    }
  });
  
  // Calculate completion percentage by language
  languages.forEach(language => {
    const totalKeys = allKeysToCheck.length;
    const missingInThisLanguage = missingKeys.filter(mk => 
      mk.missingInLanguages.includes(language)
    ).length;
    completionByLanguage[language] = Math.round(((totalKeys - missingInThisLanguage) / totalKeys) * 100);
  });
  
  return {
    totalKeysChecked: allKeysToCheck.length,
    missingKeys,
    completionByLanguage,
    categorySummary
  };
}

export function auditTranslationKeys(): TranslationAuditReport {
  const missingKeys: MissingTranslationKey[] = [];
  const languages = SUPPORTED_LANGUAGES;
  const completionByLanguage: Record<Language, number> = {} as Record<Language, number>;
  const categorySummary: Record<string, number> = {};
  
  // Collect all keys to check
  const allKeysToCheck: Array<{key: string, category: string, priority: 'high' | 'medium' | 'low'}> = [];
  
  // Add UI keys
  EXPECTED_UI_KEYS.forEach(key => {
    allKeysToCheck.push({
      key,
      category: 'UI Components',
      priority: 'high'
    });
  });
  
  // Add treatment-specific keys
  TREATMENT_TYPES.forEach(treatment => {
    const treatmentKeys = generateTreatmentKeys(treatment);
    treatmentKeys.forEach(key => {
      allKeysToCheck.push({
        key,
        category: `Treatment: ${treatment}`,
        priority: key.includes('.faq.') ? 'medium' : 'high'
      });
    });
  });
  
  // Check each key across all languages
  allKeysToCheck.forEach(({key, category, priority}) => {
    const missingInLanguages: Language[] = [];
    
    languages.forEach(language => {
      if (!checkKeyExists(translations, language, key)) {
        missingInLanguages.push(language);
      }
    });
    
    if (missingInLanguages.length > 0) {
      missingKeys.push({
        key,
        missingInLanguages,
        usedInFiles: [], // Will be populated by file analysis
        category,
        priority
      });
      
      categorySummary[category] = (categorySummary[category] || 0) + 1;
    }
  });
  
  // Calculate completion percentage by language
  languages.forEach(language => {
    const totalKeys = allKeysToCheck.length;
    const missingInThisLanguage = missingKeys.filter(mk => 
      mk.missingInLanguages.includes(language)
    ).length;
    completionByLanguage[language] = Math.round(((totalKeys - missingInThisLanguage) / totalKeys) * 100);
  });
  
  return {
    totalKeysChecked: allKeysToCheck.length,
    missingKeys,
    completionByLanguage,
    categorySummary
  };
}
