
import type { Language } from '@/contexts/LanguageContext';

// Helper function to get language path prefix
export const getLanguagePath = (language: Language): string => {
  return `/${language}`;
};

// Helper function to create a language-specific path
export const createLocalizedPath = (language: Language, path: string): string => {
  return `${getLanguagePath(language)}${path.startsWith('/') ? path : `/${path}`}`;
};

// List of supported languages
export const supportedLanguages: Language[] = ['he', 'en', 'ru', 'de', 'ar'];

// Get browser language or default to Hebrew
export const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0] as Language;
  return supportedLanguages.includes(browserLang) ? browserLang : 'he';
};
