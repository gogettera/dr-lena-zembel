
// Main translation indexes - simplified structure without flattening
import heTranslations from './he';
import enTranslations from './en';
import ruTranslations from './ru';
import deTranslations from './de';
import arTranslations from './ar';

// Direct export without complex transformation
export default {
  he: heTranslations,
  en: enTranslations,
  ru: ruTranslations,
  de: deTranslations,
  ar: arTranslations
};

// Export validation utility
export * from './utils/validation';
