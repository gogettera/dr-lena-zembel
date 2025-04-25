
// This file serves as an entry point for the English translations
// It allows for dynamically importing all translation modules

import commonJson from './common.json';
import navigationJson from './navigation.json';
import treatmentsJson from './treatments.json';
import aestheticTreatmentsJson from './aestheticTreatments.json';
import botoxTreatmentsJson from './botoxTreatments.json';

// Export a combined object with all translations
export default {
  ...commonJson,
  ...navigationJson,
  ...treatmentsJson,
  ...aestheticTreatmentsJson,
  ...botoxTreatmentsJson
};
