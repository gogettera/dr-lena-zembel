
import React, { createContext, useState, useContext, useEffect } from 'react';
import { setDirection } from '@/utils/direction';
import { supportedLanguages } from '@/utils/languageRoutes';
import { Language } from '@/types/language';
import { flattenTranslations, getTranslation, loadModularTranslations, combineTranslations } from '@/utils/translation';

interface TranslationOptions {
  returnObjects?: boolean;
  [key: string]: any;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: string | TranslationOptions) => any;
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
    // Security: Validate language input against supported languages
    if (!supportedLanguages.includes(lang)) {
      console.error(`Invalid language attempted: ${lang}`);
      return;
    }
    
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
      // Security: Validate language again before loading translations
      if (!supportedLanguages.includes(lang)) {
        console.error(`Invalid language attempted while loading translations: ${lang}`);
        return;
      }
      
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

  const t = (key: string, options?: string | TranslationOptions): any => {
    if (!key) return options instanceof Object ? (options.returnObjects ? [] : '') : '';
    
    // Handle string fallback
    if (typeof options === 'string') {
      return getTranslation(flatTranslations, key, options);
    }
    
    // Handle options object with returnObjects
    if (options?.returnObjects) {
      try {
        const value = flatTranslations[key];
        if (!value) return [];
        return JSON.parse(value);
      } catch (e) {
        console.error(`Error parsing translation for key ${key}:`, e);
        return [];
      }
    }
    
    return getTranslation(flatTranslations, key, '');
  };

  useEffect(() => {
    // Always default to Hebrew, regardless of browser language
    const storedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    
    if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    } else {
      setLanguageState('he');
      localStorage.setItem('preferredLanguage', 'he');
    }
    
    const isRightToLeft = storedLanguage === 'he' || storedLanguage === 'ar';
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
