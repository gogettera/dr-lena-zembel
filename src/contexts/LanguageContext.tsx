import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { setupDirectionByLanguage } from '@/utils/direction';
import { Language } from '@/types/language';
import { 
  TranslationOptions, 
  createTranslationFunction
} from '@/utils/translation';
import { translations } from '@/utils/translation/core';

// Translation function type
type TranslationFunction = (key: string, options?: string | TranslationOptions) => any;

// Language context interface
interface LanguageContextType {
  language: Language;
  t: TranslationFunction;
  isRTL: boolean;
}

// Hebrew only configuration
const LANGUAGE: Language = 'he';
const IS_RTL = true;

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set up Hebrew RTL direction on mount
  useEffect(() => {
    setupDirectionByLanguage(LANGUAGE);
  }, []);

  // Create translation function for Hebrew
  const t = createTranslationFunction(LANGUAGE, translations, LANGUAGE);

  return (
    <LanguageContext.Provider value={{ language: LANGUAGE, t, isRTL: IS_RTL }}>
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
