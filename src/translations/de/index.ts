
// This file serves as an entry point for the German translations

import commonJson from './common.json';
import navigationJson from './navigation.json';

// Export named exports for modular translations
export const common = commonJson;
export const navigation = navigationJson;

// Export a combined object with all translations
export default {
  common: commonJson,
  navigation: navigationJson
};
