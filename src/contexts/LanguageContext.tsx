
import React, { createContext, useState, useContext, useEffect } from 'react';
import { setDirection } from '@/utils/direction';

export type Language = 'he' | 'en' | 'ru' | 'de' | 'ar';

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
    
    // Set the direction based on the language
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
      // Fallback to Hebrew if translations fail to load
      if (lang !== 'he') {
        const heTranslations = await import(`../translations/he.json`);
        setTranslations(heTranslations.default);
      }
    }
  };

  // Translate function that handles nested keys like "clinicInfo.name"
  const t = (key: string): string => {
    if (key.includes('.')) {
      const keys = key.split('.');
      let current: any = translations;
      
      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        } else {
          return key; // Return the key if path doesn't exist
        }
      }
      
      return typeof current === 'string' ? current : key;
    }
    
    return translations[key] || key;
  };

  useEffect(() => {
    // Load stored language preference or use Hebrew as default
    const storedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    const browserLanguage = navigator.language.split('-')[0] as Language;
    const supportedLanguages: Language[] = ['he', 'en', 'ru', 'de', 'ar'];
    
    let initialLanguage: Language = 'he';
    
    if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
      initialLanguage = storedLanguage;
    } else if (supportedLanguages.includes(browserLanguage as Language)) {
      initialLanguage = browserLanguage as Language;
    }
    
    setLanguageState(initialLanguage);
    
    // Set initial direction
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
