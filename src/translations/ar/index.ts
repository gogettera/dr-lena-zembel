
// This file serves as an entry point for the Arabic translations
// We're using the same modular structure as the Hebrew and English translations

import botoxTreatmentsJson from './botoxTreatments.json';
import arTranslations from '../ar.json';

// Export named exports for modular translations
export const botoxTreatments = botoxTreatmentsJson;

// Export a combined object with all translations
export default {
  ...arTranslations,
  botoxTreatments: botoxTreatmentsJson
};
