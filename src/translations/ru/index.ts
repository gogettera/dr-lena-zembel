
// This file serves as an entry point for the Russian translations
// We're using the same modular structure as the Hebrew and English translations

import botoxTreatmentsJson from './botoxTreatments.json';
import ruTranslations from '../ru.json';

// Export named exports for modular translations
export const botoxTreatments = botoxTreatmentsJson;

// Export a combined object with all translations
export default {
  ...ruTranslations,
  botoxTreatments: botoxTreatmentsJson
};
