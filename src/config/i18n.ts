
import { Language } from '@/types/language';

// List of supported languages
export const languages: Language[] = ['he', 'en', 'de', 'ru', 'ar'];

// Default language
export const defaultLanguage: Language = 'he';

// Language display names
export const languageNames: Record<Language, string> = {
  'he': 'עברית',
  'en': 'English',
  'de': 'Deutsch',
  'ru': 'Русский',
  'ar': 'العربية'
};

// RTL languages
export const rtlLanguages: Language[] = ['he', 'ar'];

// Language direction
export const getLanguageDirection = (language: Language): 'rtl' | 'ltr' => {
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
};
