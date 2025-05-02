
// A simple script to check for missing translation keys
// Run with: node scripts/check-translations.js

import { translations } from '../src/utils/translation/core.js';
import { logMissingTranslationKeys } from '../src/translations/utils/validation.js';

console.log('Checking for missing translation keys...');
logMissingTranslationKeys(translations);
console.log('Translation check complete.');
