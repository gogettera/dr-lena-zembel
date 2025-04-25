
// This file serves as an entry point for the Russian translations

import botoxTreatmentsJson from './botoxTreatments.json';
import navigationJson from './navigation.json';
import commonJson from './common.json';
import ruTranslations from '../ru.json';

// Export named exports for modular translations
export const botoxTreatments = botoxTreatmentsJson;
export const navigation = navigationJson;
export const common = commonJson;

// Export a combined object with all translations
export default {
  ...ruTranslations,
  botoxTreatments: botoxTreatmentsJson,
  navigation: navigationJson,
  common: commonJson
};
