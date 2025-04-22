
import React, { createContext, useState, useContext, useEffect } from 'react';
import { setDirection } from '@/utils/direction';
import { supportedLanguages } from '@/utils/languageRoutes';
import { Language } from '@/types/language';
import { flattenTranslations, getTranslation, loadModularTranslations, combineTranslations } from '@/utils/translation';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('he');
  const [flatTranslations, setFlatTranslations] = useState<Record<string, string>>({});
  const [isRTL, setIsRTL] = useState<boolean>(true);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
    
    const isRightToLeft = lang === 'he' || lang === 'ar';
    setIsRTL(isRightToLeft);
    
    if (isRightToLeft) {
      setDirection('rtl');
    } else {
      setDirection('ltr');
    }
  };

  const loadTranslations = async (lang: Language) => {
    try {
      if (lang === 'he') {
        // Modular for Hebrew only
        try {
          const moduleTranslations = await loadModularTranslations(lang);
          const combinedTranslations = combineTranslations(moduleTranslations);
          setFlatTranslations(combinedTranslations);
          return;
        } catch (moduleError) {
          console.warn(`Failed to load modular translations for ${lang}, falling back to legacy format:`, moduleError);
        }
        // Fallback to legacy Hebrew
        const translations = await import(`../translations/${lang}.json`);
        const flattened = flattenTranslations(translations.default);
        setFlatTranslations(flattened);
      } else {
        // For ALL other languages, use only the .json file - never modular import!
        const translations = await import(`../translations/${lang}.json`);
        const flattened = flattenTranslations(translations.default);
        setFlatTranslations(flattened);
      }
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      // Fallback logic: try Hebrew default if not already tried
      if (lang !== 'he') {
        try {
          const heModules = await import('../translations/he');
          const heFlattened = combineTranslations(heModules);
          setFlatTranslations(heFlattened);
        } catch (heModuleError) {
          console.error('Could not load Hebrew translations as fallback:', heModuleError);
          setFlatTranslations({});
        }
      } else {
        setFlatTranslations({});
      }
    }
  };

  const t = (key: string, fallback: string = ''): string => {
    if (!key) return fallback;
    return getTranslation(flatTranslations, key, fallback);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    const browserLanguage = navigator.language.split('-')[0] as Language;
    
    let initialLanguage: Language = 'he';
    
    if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
      initialLanguage = storedLanguage;
    } else if (supportedLanguages.includes(browserLanguage)) {
      initialLanguage = browserLanguage;
      localStorage.setItem('preferredLanguage', browserLanguage);
    }
    
    setLanguageState(initialLanguage);
    
    const isRightToLeft = initialLanguage === 'he' || initialLanguage === 'ar';
    setIsRTL(isRightToLeft);
    
    if (isRightToLeft) {
      setDirection('rtl');
    } else {
      setDirection('ltr');
    }
  }, []);

  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

