
// This file serves as an entry point for the Arabic translations

import commonJson from './common.json';
import navigationJson from './navigation.json';
import botoxTreatmentsJson from './botoxTreatments.json';
import rootCanalJson from './rootCanal.json';
import treatmentsJson from './treatments.json';
import aestheticTreatmentsJson from './aestheticTreatments.json';

// Export a combined object with all translations - this is the structure the translation function expects
export default {
  common: commonJson,
  navigation: navigationJson,
  botoxTreatments: botoxTreatmentsJson,
  rootCanal: rootCanalJson,
  treatments: treatmentsJson,
  aestheticTreatments: aestheticTreatmentsJson
};
