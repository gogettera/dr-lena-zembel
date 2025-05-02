
// Main translation indexes - fully importing all translation files
import * as heTranslations from './he';
import * as enTranslations from './en';
import * as ruTranslations from './ru';
import * as deTranslations from './de';
import * as arTranslations from './ar';

// Export translations with proper namespaces
export default {
  he: heTranslations,
  en: enTranslations,
  ru: ruTranslations,
  de: deTranslations,
  ar: arTranslations
};

// Export validation utility to check for missing keys
export * from './utils/validation';
