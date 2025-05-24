
// This file serves as an entry point for the Russian translations
// Only importing files that actually exist

import commonJson from './common.json';
import navigationJson from './navigation.json';
import botoxTreatmentsJson from './botoxTreatments.json';

// Export a combined object with all available translations
export default {
  common: commonJson,
  navigation: navigationJson,
  botoxTreatments: botoxTreatmentsJson
};
