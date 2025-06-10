
import { translations } from '@/utils/translation/core';
import { Language } from '@/types/language';
import { AuditIssue } from './types';
import { 
  EXPECTED_TREATMENT_KEYS, 
  EXPECTED_UI_KEYS, 
  TREATMENT_TYPES, 
  SUPPORTED_LANGUAGES 
} from '../translationAudit/constants';
import { checkKeyExists, generateTreatmentKeys } from '../translationAudit/helpers';

export function runTranslationAudit(): Promise<AuditIssue[]> {
  return new Promise((resolve) => {
    const issues = auditTranslations();
    resolve(issues);
  });
}

export function auditTranslations(): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const allKeysToCheck: string[] = [];

  // Collect all expected keys
  EXPECTED_UI_KEYS.forEach(key => allKeysToCheck.push(key));
  TREATMENT_TYPES.forEach(treatment => {
    const treatmentKeys = generateTreatmentKeys(treatment);
    allKeysToCheck.push(...treatmentKeys);
  });

  // Check each key across all languages
  allKeysToCheck.forEach(key => {
    const missingLanguages: Language[] = [];
    
    SUPPORTED_LANGUAGES.forEach(language => {
      if (!checkKeyExists(translations, language, key)) {
        missingLanguages.push(language);
      }
    });

    if (missingLanguages.length > 0) {
      const severity = missingLanguages.length === SUPPORTED_LANGUAGES.length ? 'critical' :
                     missingLanguages.length > 2 ? 'high' : 'medium';
      
      issues.push({
        id: `translation-missing-${key}`,
        category: 'translation',
        severity,
        title: `Missing Translation Key: ${key}`,
        description: `Translation key "${key}" is missing in: ${missingLanguages.join(', ')}`,
        fixSuggestion: `Add translation for "${key}" in missing language files`,
        autoFixable: false
      });
    }
  });

  // Check for orphaned translation keys (exist in some languages but not others)
  SUPPORTED_LANGUAGES.forEach(language => {
    if (translations[language]) {
      const languageKeys = getAllKeysFromObject(translations[language]);
      languageKeys.forEach(key => {
        const existsInOtherLanguages = SUPPORTED_LANGUAGES
          .filter(lang => lang !== language)
          .some(lang => checkKeyExists(translations, lang, key));
        
        if (!existsInOtherLanguages) {
          issues.push({
            id: `translation-orphaned-${language}-${key}`,
            category: 'translation',
            severity: 'low',
            title: `Orphaned Translation Key: ${key}`,
            description: `Key "${key}" exists only in ${language} but not in other languages`,
            fixSuggestion: `Either add "${key}" to other languages or remove from ${language}`,
            autoFixable: false
          });
        }
      });
    }
  });

  return issues;
}

function getAllKeysFromObject(obj: any, prefix = ''): string[] {
  const keys: string[] = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys.push(...getAllKeysFromObject(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}
