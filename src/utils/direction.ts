
import type { Language } from '@/contexts/LanguageContext';

export const setDirection = (dir: 'rtl' | 'ltr') => {
  document.documentElement.dir = dir;
  document.documentElement.lang = dir === 'rtl' ? 'he' : 'en';
  
  // Add RTL-specific CSS class for better styling control
  if (dir === 'rtl') {
    document.documentElement.classList.add('rtl');
  } else {
    document.documentElement.classList.remove('rtl');
  }
};

export const setupDirectionByLanguage = (language: Language) => {
  const rtlLanguages: Language[] = ['he', 'ar'];
  
  if (rtlLanguages.includes(language)) {
    setDirection('rtl');
  } else {
    setDirection('ltr');
  }
  
  document.documentElement.lang = language;
};

// Helper function to handle RTL text in specific contexts
export const getTextDirection = (language: Language): 'rtl' | 'ltr' => {
  return ['he', 'ar'].includes(language) ? 'rtl' : 'ltr';
};
