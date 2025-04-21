
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
    
    if (key.includes('.')) {
      return getNestedTranslation(translations, key);
    }
    
    const value = translations[key];
    
    // Make sure we don't return an object directly as a React child
    if (typeof value === 'object' && value !== null) {
      console.warn(`Translation key "${key}" is an object, not a string`);
      return key; // Return the key instead of the object
    }
    
    return value || key;
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
