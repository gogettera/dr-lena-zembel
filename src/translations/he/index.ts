
// This file serves as an entry point for the Hebrew translations
// It allows for dynamically importing all translation modules

import commonJson from './common.json';
import navigationJson from './navigation.json';
import treatmentsJson from './treatments.json';
import aestheticTreatmentsJson from './aestheticTreatments.json';
import childrenDentistryJson from './childrenDentistry.json';
import aboutJson from './about.json';
import clinicJson from './clinic.json';
import contactJson from './contact.json';
import infoJson from './info.json';
import testimonialsJson from './testimonials.json';

// Re-export all translations as named exports
export const common = commonJson;
export const navigation = navigationJson;
export const treatments = treatmentsJson;
export const aestheticTreatments = aestheticTreatmentsJson;
export const childrenDentistry = childrenDentistryJson;
export const about = aboutJson;
export const clinic = clinicJson;
export const contact = contactJson;
export const info = infoJson;
export const testimonials = testimonialsJson;

// Export a combined object with all translations
export default {
  common: commonJson,
  navigation: navigationJson,
  treatments: treatmentsJson,
  aestheticTreatments: aestheticTreatmentsJson,
  childrenDentistry: childrenDentistryJson,
  about: aboutJson,
  clinic: clinicJson,
  contact: contactJson,
  info: infoJson,
  testimonials: testimonialsJson
};
