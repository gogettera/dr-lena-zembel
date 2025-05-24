
// Main translation indexes - properly structured imports
import heTranslations from './he';
import enTranslations from './en';
import ruTranslations from './ru';
import deTranslations from './de';
import arTranslations from './ar';

// Export translations with flattened structure
export default {
  he: heTranslations,
  en: enTranslations,
  ru: ruTranslations,
  de: deTranslations,
  ar: arTranslations
};

// Export validation utility to check for missing keys
export * from './utils/validation';
