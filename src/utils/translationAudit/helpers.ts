
import { translations } from '@/utils/translation/core';
import { Language } from '@/types/language';
import { EXPECTED_TREATMENT_KEYS } from './constants';

export function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

export function checkKeyExists(translations: any, language: Language, key: string): boolean {
  const langTranslations = translations[language];
  if (!langTranslations) return false;
  
  const value = getNestedValue(langTranslations, key);
  return value !== undefined && value !== null && value !== '';
}

export function generateTreatmentKeys(treatment: string): string[] {
  return EXPECTED_TREATMENT_KEYS.map(key => key.replace('{treatment}', treatment));
}

export function getKeyPriority(key: string): 'high' | 'medium' | 'low' {
  if (key.includes('.faq.') || key.includes('.testimonials.')) {
    return 'medium';
  }
  if (key.includes('.contact.') || key.includes('.bookVisit.')) {
    return 'low';
  }
  return 'high';
}
