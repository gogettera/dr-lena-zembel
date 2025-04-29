
// This file serves as an entry point for the English translations
// We're using the same modular structure as the Hebrew translations

import commonJson from './common.json';
import navigationJson from './navigation.json';
import treatmentsJson from './treatments.json';
import aestheticTreatmentsJson from './aestheticTreatments.json';
import botoxTreatmentsJson from './botoxTreatments.json';
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

// Re-export all translations as named exports
export const common = commonJson;
export const navigation = navigationJson;
export const treatments = treatmentsJson;
export const aestheticTreatments = aestheticTreatmentsJson;
export const botoxTreatments = botoxTreatmentsJson;
export const orthodontics = orthodonticsJson;
export const rootCanal = rootCanalJson;
export const childrenDentistry = childrenDentistryJson;
export const about = aboutJson;
export const clinic = clinicJson;
export const contact = contactJson;
export const info = infoJson;
export const testimonials = testimonialsJson;
export const accessibility = accessibilityJson;
export const legal = legalJson;

// Export a combined object with all translations
export default {
  common: commonJson,
  navigation: navigationJson,
  treatments: treatmentsJson,
  aestheticTreatments: aestheticTreatmentsJson,
  botoxTreatments: botoxTreatmentsJson,
  orthodontics: orthodonticsJson,
  rootCanal: rootCanalJson,
  childrenDentistry: childrenDentistryJson,
  about: aboutJson,
  clinic: clinicJson,
  contact: contactJson,
  info: infoJson,
  testimonials: testimonialsJson,
  accessibility: accessibilityJson,
  legal: legalJson
};
