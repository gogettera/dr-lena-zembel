
import type { Language } from '@/types/language';

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
  console.log('getBrowserLanguage called');
  
  // First check localStorage
  const storedLanguage = localStorage.getItem('preferredLanguage') as Language;
  if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
    console.log(`Found stored language: ${storedLanguage}`);
    return storedLanguage;
  }

  // Then check browser language
  const browserLang = navigator.language.split('-')[0] as Language;
  console.log(`Browser language detected: ${browserLang}`);
  
  if (supportedLanguages.includes(browserLang)) {
    console.log(`Using browser language: ${browserLang}`);
    return browserLang;
  }

  // Default to Hebrew
  console.log('Using default language: he');
  return 'he';
};
