import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setupDirectionByLanguage } from '@/utils/direction';
import { Language } from '@/types/language';
import { 
  TranslationOptions, 
  createTranslationFunction
} from '@/utils/translation';
import { translations } from '@/utils/translation/core';
import { logger } from '@/utils/logger';
import { dentalClinicLanguageDetection } from '@/utils/enhanced-language-detection';

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

// Enhanced language detection
const getInitialLanguage = (): Language => {
  const hints = dentalClinicLanguageDetection.getLanguageHints();
  logger.debug('Language detection hints:', hints);
  
  // URL has absolute priority
  if (hints.url) {
    logger.debug(`URL language detected: ${hints.url}`);
    return hints.url;
  }
  
  // Use enhanced detection for initial load
  const detected = dentalClinicLanguageDetection.detectLanguage();
  logger.debug(`Enhanced detection result: ${detected}`);
  return detected;
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Debug info
  if (typeof window !== "undefined") {
    console.log("[LanguageProvider] Initialized"); // תוודא שה-Provider נטען
  }
  
  // Get initial language using enhanced detection
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());
  const [isInitialized, setIsInitialized] = useState(false);

  // Derived state
  const isRTL = RTL_LANGUAGES.includes(language);

  // Handle language change with enhanced detection
  const setLanguage = (newLanguage: Language) => {
    if (AVAILABLE_LANGUAGES.includes(newLanguage) && newLanguage !== language) {
      logger.debug(`Changing language to: ${newLanguage}`);
      
      // Store preference using enhanced detection
      dentalClinicLanguageDetection.storeLanguagePreference(newLanguage);
      
      // Update state
      setLanguageState(newLanguage);
      
      // Update document direction
      setupDirectionByLanguage(newLanguage);
    }
  };

  // Enhanced language detection with priority system
  useEffect(() => {
    const updateCheck = dentalClinicLanguageDetection.shouldUpdateLanguage(language);
    
    if (updateCheck.shouldUpdate) {
      logger.debug(`Language update needed: ${updateCheck.reason}`);
      setLanguageState(updateCheck.suggestedLanguage);
      setupDirectionByLanguage(updateCheck.suggestedLanguage);
      dentalClinicLanguageDetection.storeLanguagePreference(updateCheck.suggestedLanguage);
    }
    
    if (!isInitialized) {
      setIsInitialized(true);
      logger.debug(`Initialized with language: ${language}`);
    }
  }, [language, isInitialized]);

  // Set up document direction on language change
  useEffect(() => {
    if (isInitialized) {
      setupDirectionByLanguage(language);
      logger.debug(`Language: ${language}, RTL: ${isRTL}`);
    }
  }, [language, isRTL, isInitialized]);

  // Listen for URL changes with enhanced detection
  useEffect(() => {
    const handlePopState = () => {
      const hints = dentalClinicLanguageDetection.getLanguageHints();
      if (hints.url && hints.url !== language) {
        logger.debug(`URL change detected: ${hints.url}`);
        setLanguageState(hints.url);
        setupDirectionByLanguage(hints.url);
        dentalClinicLanguageDetection.storeLanguagePreference(hints.url);
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
