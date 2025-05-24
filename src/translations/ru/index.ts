
// This file serves as an entry point for the Russian translations

import commonJson from './common.json';
import navigationJson from './navigation.json';
import botoxTreatmentsJson from './botoxTreatments.json';

// Export named exports for modular translations
export const common = commonJson;
export const navigation = navigationJson;
export const botoxTreatments = botoxTreatmentsJson;

// Export a combined object with all translations
export default {
  common: commonJson,
  navigation: navigationJson,
  botoxTreatments: botoxTreatmentsJson
};
