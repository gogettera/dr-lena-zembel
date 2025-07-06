
// This file serves as an entry point for the German translations

import commonJson from './common.json';
import navigationJson from './navigation.json';
import treatmentsJson from './treatments.json';
import rootCanalJson from './rootCanal.json';
import trustJson from './trust.json';
import botoxTreatmentsJson from './botoxTreatments.json';

// Export a combined object with all translations - this is the structure the translation function expects
export default {
  common: commonJson,
  navigation: navigationJson,
  treatments: treatmentsJson,
  rootCanal: rootCanalJson,
  trust: trustJson,
  botoxTreatments: botoxTreatmentsJson
};
