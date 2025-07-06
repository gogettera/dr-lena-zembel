
// This file serves as an entry point for the English translations
// Only importing files that actually exist to prevent import errors

import commonJson from './common.json';
import navigationJson from './navigation.json';
import testimonialsJson from './testimonials.json';
import accessibilityJson from './accessibility.json';
import legalJson from './legal.json';
import clinicJson from './clinic.json';
import infoJson from './info.json';
import treatmentsJson from './treatments.json';
import rootCanalJson from './rootCanal.json';
import trustJson from './trust.json';
import aestheticTreatmentsJson from './aestheticTreatments.json';
import orthodonticsJson from './orthodontics.json';
import childrenDentistryJson from './childrenDentistry.json';
import botoxTreatmentsJson from './botoxTreatments.json';
import contactJson from './contact.json';
import aboutJson from './about.json';
import heroJson from './hero.json';
import homepageJson from './homepage.json';
import faqJson from './faq.json';
import sharedJson from './shared.json';
import socialJson from './social.json';
import securityJson from './security.json';
import adminJson from './admin.json';

// Export a combined object with all available translations
export default {
  common: commonJson,
  navigation: navigationJson,
  testimonials: testimonialsJson,
  accessibility: accessibilityJson,
  legal: legalJson,
  clinic: clinicJson,
  info: infoJson,
  treatments: treatmentsJson,
  rootCanal: rootCanalJson,
  trust: trustJson,
  aestheticTreatments: aestheticTreatmentsJson,
  orthodontics: orthodonticsJson,
  childrenDentistry: childrenDentistryJson,
  botoxTreatments: botoxTreatmentsJson,
  contact: contactJson,
  about: aboutJson,
  hero: heroJson,
  homepage: homepageJson,
  faq: faqJson,
  shared: sharedJson,
  social: socialJson,
  security: securityJson,
  admin: adminJson
};
