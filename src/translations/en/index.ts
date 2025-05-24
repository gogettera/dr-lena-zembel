
// This file serves as an entry point for the English translations
// Only importing files that actually exist to prevent import errors

import commonJson from './common.json';
import navigationJson from './navigation.json';
import testimonialsJson from './testimonials.json';
import accessibilityJson from './accessibility.json';
import legalJson from './legal.json';
import clinicJson from './clinic.json';
import infoJson from './info.json';

// Export a combined object with all available translations
export default {
  common: commonJson,
  navigation: navigationJson,
  testimonials: testimonialsJson,
  accessibility: accessibilityJson,
  legal: legalJson,
  clinic: clinicJson,
  info: infoJson
};
