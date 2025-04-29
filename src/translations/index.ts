
// Main translation indexes
import heCommon from './he/common.json';
import heTranslations from './he/treatments.json';
import enCommon from './en/common.json';
import enTranslations from './en/treatments.json';
import arCommon from './ar/common.json';
import ruCommon from './ru/common.json';
import deCommon from './de/common.json';

// Export translations with proper namespaces
export default {
  he: {
    common: heCommon,
    treatments: heTranslations,
    // Add other Hebrew namespaces
  },
  en: {
    common: enCommon,
    treatments: enTranslations,
    // Add other English namespaces
  },
  ar: {
    common: arCommon,
    // Add other Arabic namespaces
  },
  ru: {
    common: ruCommon,
    // Add other Russian namespaces
  },
  de: {
    common: deCommon,
    // Add other German namespaces
  },
};
