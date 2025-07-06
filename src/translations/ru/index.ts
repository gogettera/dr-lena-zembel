
// This file serves as an entry point for the Russian translations
// Only importing files that actually exist

import commonJson from './common.json';
import navigationJson from './navigation.json';
import botoxTreatmentsJson from './botoxTreatments.json';
import treatmentsJson from './treatments.json';
import rootCanalJson from './rootCanal.json';
import aestheticTreatmentsJson from './aestheticTreatments.json';
import childrenDentistryJson from './childrenDentistry.json';
import orthodonticsJson from './orthodontics.json';
import preventiveMedicineJson from './preventiveMedicine.json';

// Export a combined object with all available translations
export default {
  common: commonJson,
  navigation: navigationJson,
  botoxTreatments: botoxTreatmentsJson,
  treatments: treatmentsJson,
  rootCanal: rootCanalJson,
  aestheticTreatments: aestheticTreatmentsJson,
  childrenDentistry: childrenDentistryJson,
  orthodontics: orthodonticsJson,
  preventiveMedicine: preventiveMedicineJson
};
