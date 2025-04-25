
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { setupDirectionByLanguage } from '@/utils/direction';
import { Language } from '@/types/language';
import { 
  TranslationOptions, 
  createTranslationFunction, 
  TranslationValue 
} from '@/utils/translation-utils';

// Import all translations
import heTranslations from '@/translations/he';
import enTranslations from '@/translations/en.json';
import ruTranslations from '@/translations/ru.json';
import deTranslations from '@/translations/de.json';
import arTranslations from '@/translations/ar.json';

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

// All translations
const translations = {
  he: heTranslations,
  en: enTranslations,
  ru: ruTranslations,
  de: deTranslations,
  ar: arTranslations
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get language from URL params or localStorage
  const { lang } = useParams<{ lang?: string }>();
  
  // Initialize with language from URL or localStorage or default
  const [language, setLanguageState] = useState<Language>(() => {
    // Check URL first
    if (lang && AVAILABLE_LANGUAGES.includes(lang as Language)) {
      return lang as Language;
    }
    
    // Then check localStorage
    const savedLang = localStorage.getItem('preferredLanguage') as Language;
    if (savedLang && AVAILABLE_LANGUAGES.includes(savedLang)) {
      return savedLang;
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
    }
  };

  // Set up document direction on mount and language change
  useEffect(() => {
    setupDirectionByLanguage(language);
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
