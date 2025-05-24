
// Main translation indexes - properly structured imports with flattened exports
import heTranslations from './he';
import enTranslations from './en';
import ruTranslations from './ru';
import deTranslations from './de';
import arTranslations from './ar';

// Flatten the imported translations to ensure proper structure
const flattenTranslations = (translations: any) => {
  if (!translations || typeof translations !== 'object') {
    console.error('Invalid translations object:', translations);
    return {};
  }
  
  // If it's already the expected flat structure, return as-is
  if (translations.common || translations.navigation) {
    return translations;
  }
  
  // If it has a default export that contains the actual translations, use that
  if (translations.default && typeof translations.default === 'object') {
    return translations.default;
  }
  
  return translations;
};

// Export translations with properly flattened structure
export default {
  he: flattenTranslations(heTranslations),
  en: flattenTranslations(enTranslations),
  ru: flattenTranslations(ruTranslations),
  de: flattenTranslations(deTranslations),
  ar: flattenTranslations(arTranslations)
};

// Export validation utility to check for missing keys
export * from './utils/validation';
