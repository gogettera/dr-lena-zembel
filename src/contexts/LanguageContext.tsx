
import React, { createContext, useState, useContext, useEffect } from 'react';
import { setDirection } from '@/utils/direction';
import { supportedLanguages } from '@/utils/languageRoutes';
import { Language } from '@/types/language';
import { getNestedTranslation } from '@/utils/translation-helpers';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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
  const [translations, setTranslations] = useState<Record<string, any>>({});

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
    
    if (lang === 'he' || lang === 'ar') {
      setDirection('rtl');
    } else {
      setDirection('ltr');
    }
  };

  const loadTranslations = async (lang: Language) => {
    try {
      const translations = await import(`../translations/${lang}.json`);
      setTranslations(translations.default);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      if (lang !== 'he') {
        const heTranslations = await import(`../translations/he.json`);
        setTranslations(heTranslations.default);
      }
    }
  };

  const t = (key: string): string => {
    if (!key) return '';
    
    // Always use getNestedTranslation to safely handle nested properties
    const result = getNestedTranslation(translations, key);
    
    // Return empty string if translation is not found
    return result || '';
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
    
    if (initialLanguage === 'he' || initialLanguage === 'ar') {
      setDirection('rtl');
    } else {
      setDirection('ltr');
    }
  }, []);

  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
