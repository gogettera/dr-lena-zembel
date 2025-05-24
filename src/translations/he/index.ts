
// This file serves as an entry point for the Hebrew translations
// It allows for dynamically importing all translation modules

import commonJson from './common.json';
import navigationJson from './navigation.json';
import treatmentsJson from './treatments.json';
import aestheticTreatmentsJson from './aestheticTreatments.json';
import orthodonticsJson from './orthodontics.json';
import rootCanalJson from './rootCanal.json';
import childrenDentistryJson from './childrenDentistry.json';
import aboutJson from './about.json';
import clinicJson from './clinic.json';
import contactJson from './contact.json';
import infoJson from './info.json';
import testimonialsJson from './testimonials.json';
import accessibilityJson from './accessibility.json';
import legalJson from './legal.json';
import botoxTreatmentsJson from './botoxTreatments.json';
import adminJson from './admin.json';
import securityJson from './security.json';
import sharedJson from './shared.json';
import socialJson from './social.json';

// Export a combined object with all translations - this is the structure the translation function expects
export default {
  common: commonJson,
  navigation: navigationJson,
  treatments: treatmentsJson,
  aestheticTreatments: aestheticTreatmentsJson,
  orthodontics: orthodonticsJson,
  rootCanal: rootCanalJson,
  childrenDentistry: childrenDentistryJson,
  about: aboutJson,
  clinic: clinicJson,
  contact: contactJson,
  info: infoJson,
  testimonials: testimonialsJson,
  accessibility: accessibilityJson,
  legal: legalJson,
  botoxTreatments: botoxTreatmentsJson,
  admin: adminJson,
  security: securityJson,
  shared: sharedJson,
  social: socialJson
};
