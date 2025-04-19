
import type { Language } from '@/contexts/LanguageContext';

/**
 * Utility functions for RTL/LTR handling
 */

/**
 * Sets the document direction to RTL or LTR
 */
export const setDirection = (dir: 'rtl' | 'ltr') => {
  document.documentElement.dir = dir;
  
  // Set the language attribute based on the direction
  if (dir === 'rtl') {
    document.documentElement.lang = 'he'; // Default RTL language is Hebrew
  } else {
    document.documentElement.lang = 'en'; // Default LTR language is English
  }
};

/**
 * Sets up the document direction based on language
 */
export const setupDirectionByLanguage = (language: Language) => {
  // RTL languages: Hebrew and Arabic
  const rtlLanguages: Language[] = ['he', 'ar'];
  
  if (rtlLanguages.includes(language)) {
    setDirection('rtl');
  } else {
    setDirection('ltr');
  }
  
  document.documentElement.lang = language;
};

/**
 * Sets up the document for Hebrew RTL
 */
export const setupHebrewRTL = () => {
  setDirection('rtl');
  document.documentElement.lang = 'he';
};
