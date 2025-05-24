
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setupDirectionByLanguage } from '@/utils/direction';
import { Language } from '@/types/language';
import { 
  TranslationOptions, 
  createTranslationFunction
} from '@/utils/translation';
import { translations } from '@/utils/translation/core';
import { logMissingTranslationKeys } from '@/translations/utils/validation';

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

// Get language from URL path
const getLanguageFromURL = (): Language | null => {
  const pathname = window.location.pathname;
  const pathLang = pathname.split('/')[1] as Language;
  
  if (pathLang && AVAILABLE_LANGUAGES.includes(pathLang)) {
    console.log(`Language detected from URL: ${pathLang}`);
    return pathLang;
  }
  
  console.log(`No valid language found in URL path: ${pathname}`);
  return null;
};

// Get initial language with proper priority
const getInitialLanguage = (): Language => {
  // 1. First priority: URL parameter
  const urlLang = getLanguageFromURL();
  if (urlLang) {
    return urlLang;
  }
  
  // 2. Second priority: localStorage
  const savedLang = localStorage.getItem('preferredLanguage') as Language;
  if (savedLang && AVAILABLE_LANGUAGES.includes(savedLang)) {
    console.log(`Language from localStorage: ${savedLang}`);
    return savedLang;
  }
  
  // 3. Third priority: browser language
  const browserLang = navigator.language.split('-')[0] as Language;
  if (AVAILABLE_LANGUAGES.includes(browserLang)) {
    console.log(`Language from browser: ${browserLang}`);
    return browserLang;
  }
  
  // 4. Default fallback
  console.log(`Using default language: ${DEFAULT_LANGUAGE}`);
  return DEFAULT_LANGUAGE;
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with proper language detection
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [isInitialized, setIsInitialized] = useState(false);

  // Derived state
  const isRTL = RTL_LANGUAGES.includes(language);

  // Handle language change
  const setLanguage = (newLanguage: Language) => {
    if (AVAILABLE_LANGUAGES.includes(newLanguage) && newLanguage !== language) {
      console.log(`Language changing from ${language} to ${newLanguage}`);
      
      // Save to localStorage
      localStorage.setItem('preferredLanguage', newLanguage);
      
      // Update state
      setLanguageState(newLanguage);
      
      // Update document direction
      setupDirectionByLanguage(newLanguage);
      
      console.log(`Language changed to: ${newLanguage}, RTL: ${RTL_LANGUAGES.includes(newLanguage)}`);
    }
  };

  // Monitor URL changes and sync language
  useEffect(() => {
    const syncLanguageWithURL = () => {
      const urlLang = getLanguageFromURL();
      
      if (urlLang && urlLang !== language) {
        console.log(`URL language mismatch detected. URL: ${urlLang}, Context: ${language}`);
        setLanguageState(urlLang);
        setupDirectionByLanguage(urlLang);
        
        // Update localStorage to match URL
        localStorage.setItem('preferredLanguage', urlLang);
      }
      
      if (!isInitialized) {
        setIsInitialized(true);
      }
    };

    // Initial sync
    syncLanguageWithURL();

    // Listen for URL changes (popstate for back/forward navigation)
    window.addEventListener('popstate', syncLanguageWithURL);
    
    return () => {
      window.removeEventListener('popstate', syncLanguageWithURL);
    };
  }, [language, isInitialized]);

  // Set up document direction on language change
  useEffect(() => {
    if (isInitialized) {
      setupDirectionByLanguage(language);
      
      // Log development information
      if (process.env.NODE_ENV === 'development') {
        console.log(`Current language: ${language}`);
        console.log(`RTL enabled: ${isRTL}`);
        console.log(`URL path: ${window.location.pathname}`);
        
        // Log missing translations
        logMissingTranslationKeys(translations);
      }
    }
  }, [language, isRTL, isInitialized]);

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
