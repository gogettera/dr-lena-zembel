
/**
 * Helper functions for working with translation modules
 */

import { TranslationModules } from './types';

/**
 * Combine multiple translation modules into a single object
 */
export const combineTranslations = (
  modules: TranslationModules | Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};
  
  // Combine all modules into a single object
  Object.entries(modules).forEach(([key, value]) => {
    if (key === 'default') {
      // Handle default export
      if (typeof value === 'object' && value !== null) {
        Object.assign(result, value);
      }
    } else if (key.startsWith('_') || typeof value === 'function') {
      // Skip internal properties and functions
      return;
    } else {
      // Add module as a namespaced key
      result[key] = value;
    }
  });
  
  return result;
};

/**
 * Check if a module is a valid translation module
 */
export const isValidTranslationModule = (module: any): boolean => {
  return module !== null && 
    typeof module === 'object' && 
    !Array.isArray(module) &&
    Object.keys(module).length > 0;
};

/**
 * Get a specific translation module by name
 */
export const getTranslationModule = (
  allModules: TranslationModules,
  moduleName: string
): Record<string, any> | undefined => {
  return allModules[moduleName];
};
