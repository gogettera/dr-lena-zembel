import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setupDirectionByLanguage } from '@/utils/direction';
import { Language } from '@/types/language';
import { 
  TranslationOptions, 
  createTranslationFunction
} from '@/utils/translation';
import { translations } from '@/utils/translation/core';
import { logger } from '@/utils/logger';

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

// Get language from URL path with absolute priority
const getLanguageFromURL = (): Language | null => {
  const pathname = window.location.pathname;
  const pathLang = pathname.split('/')[1] as Language;
  
  if (pathLang && AVAILABLE_LANGUAGES.includes(pathLang)) {
    logger.debug(`URL language detected: ${pathLang}`);
    return pathLang;
  }
  
  return null;
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Debug info
  if (typeof window !== "undefined") {
    console.log("[LanguageProvider] Initialized"); // תוודא שה-Provider נטען
  }
  
  // Get initial language with URL having absolute priority
  const urlLanguage = getLanguageFromURL();
  const [language, setLanguageState] = useState<Language>(urlLanguage || DEFAULT_LANGUAGE);
  const [isInitialized, setIsInitialized] = useState(false);

  // Derived state
  const isRTL = RTL_LANGUAGES.includes(language);

  // Handle language change
  const setLanguage = (newLanguage: Language) => {
    if (AVAILABLE_LANGUAGES.includes(newLanguage) && newLanguage !== language) {
      logger.debug(`Changing language to: ${newLanguage}`);
      
      // Save to localStorage
      localStorage.setItem('preferredLanguage', newLanguage);
      
      // Update state
      setLanguageState(newLanguage);
      
      // Update document direction
      setupDirectionByLanguage(newLanguage);
    }
  };

  // URL language detection with absolute priority
  useEffect(() => {
    const currentUrlLang = getLanguageFromURL();
    
    // URL language ALWAYS takes precedence
    if (currentUrlLang && currentUrlLang !== language) {
      logger.debug(`URL language override: ${language} -> ${currentUrlLang}`);
      setLanguageState(currentUrlLang);
      setupDirectionByLanguage(currentUrlLang);
      localStorage.setItem('preferredLanguage', currentUrlLang);
    }
    
    if (!isInitialized) {
      setIsInitialized(true);
      logger.debug(`Initialized with language: ${currentUrlLang || language}`);
    }
  }, [language, isInitialized]);

  // Set up document direction on language change
  useEffect(() => {
    if (isInitialized) {
      setupDirectionByLanguage(language);
      logger.debug(`Language: ${language}, RTL: ${isRTL}`);
    }
  }, [language, isRTL, isInitialized]);

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      const newUrlLang = getLanguageFromURL();
      if (newUrlLang && newUrlLang !== language) {
        logger.debug(`URL change detected: ${newUrlLang}`);
        setLanguageState(newUrlLang);
        setupDirectionByLanguage(newUrlLang);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language]);

  // Create translation function
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
