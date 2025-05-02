
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setupDirectionByLanguage } from '@/utils/direction';
import { Language } from '@/types/language';
import { 
  TranslationOptions, 
  createTranslationFunction
} from '@/utils/translation';
import { translations } from '@/utils/translation/core';
import { validateTranslationKeys } from '@/utils/translation/core';

// Translation function type
type TranslationFunction = (key: string, options?: string | TranslationOptions) => any;

// Language context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationFunction;
  isRTL: boolean;
  availableLanguages: Language[];
}

// Available languages
const AVAILABLE_LANGUAGES: Language[] = ['he', 'en', 'ru', 'de', 'ar'];
const DEFAULT_LANGUAGE: Language = 'he';
const RTL_LANGUAGES: Language[] = ['he', 'ar'];

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with language from localStorage or default
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from URL path
    const pathname = window.location.pathname;
    const pathLang = pathname.split('/')[1] as Language;
    
    if (pathLang && AVAILABLE_LANGUAGES.includes(pathLang)) {
      return pathLang;
    }
    
    // Check localStorage next
    const savedLang = localStorage.getItem('preferredLanguage') as Language;
    if (savedLang && AVAILABLE_LANGUAGES.includes(savedLang)) {
      return savedLang;
    }
    
    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0] as Language;
    if (AVAILABLE_LANGUAGES.includes(browserLang)) {
      return browserLang;
    }
    
    // Default to Hebrew
    return DEFAULT_LANGUAGE;
  });

  // Derived state
  const isRTL = RTL_LANGUAGES.includes(language);

  // Handle language change
  const setLanguage = (newLanguage: Language) => {
    if (AVAILABLE_LANGUAGES.includes(newLanguage) && newLanguage !== language) {
      // Save to localStorage
      localStorage.setItem('preferredLanguage', newLanguage);
      // Update state
      setLanguageState(newLanguage);
      // Update document direction
      setupDirectionByLanguage(newLanguage);
      // Log language change
      console.log(`Language changed to: ${newLanguage}, RTL: ${RTL_LANGUAGES.includes(newLanguage)}`);
    }
  };

  // Set up document direction on mount and language change
  useEffect(() => {
    setupDirectionByLanguage(language);
    
    // Log any missing translations in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Current language: ${language}`);
      console.log(`Current translations are loaded:`, translations[language] !== undefined);
      
      const missingKeys = validateTranslationKeys(translations);
      if (missingKeys.length > 0) {
        console.warn('Missing translation keys:', missingKeys);
      }
    }
  }, [language]);

  // Create translation function using our utility
  const t = createTranslationFunction(language, translations, DEFAULT_LANGUAGE);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, availableLanguages: AVAILABLE_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
