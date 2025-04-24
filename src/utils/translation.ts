
import { Language } from '@/types/language';

// Helper to create a flat structure from nested objects
export const flattenTranslations = (
  obj: Record<string, any>,
  prefix: string = ''
): Record<string, string> => {
  return Object.keys(obj).reduce((acc: Record<string, string>, key: string) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    
    if (
      typeof obj[key] === 'object' && 
      obj[key] !== null && 
      !Array.isArray(obj[key])
    ) {
      Object.assign(acc, flattenTranslations(obj[key], prefixedKey));
    } else {
      // Convert arrays and objects to JSON strings to preserve their structure
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        acc[prefixedKey] = JSON.stringify(obj[key]);
      } else {
        acc[prefixedKey] = obj[key]?.toString() || '';
      }
    }
    
    return acc;
  }, {});
};

// Helper to convert flat translations back to nested structure
export const unflattenTranslations = (
  flatObj: Record<string, string>
): Record<string, any> => {
  const result: Record<string, any> = {};
  
  Object.keys(flatObj).forEach((key) => {
    const parts = key.split('.');
    let current = result;
    
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    
    // Try to parse JSON strings back to objects when appropriate
    const value = flatObj[key];
    if (value && (value.startsWith('[') || value.startsWith('{'))) {
      try {
        current[parts[parts.length - 1]] = JSON.parse(value);
      } catch (e) {
        current[parts[parts.length - 1]] = value;
      }
    } else {
      current[parts[parts.length - 1]] = value;
    }
  });
  
  return result;
};

// Get a translation value from a flattened structure
export const getTranslation = (
  flatTranslations: Record<string, string>,
  key: string,
  fallback: string = ''
): string => {
  return flatTranslations[key] || fallback;
};

// Helper to convert translations to CSV format
export const translationsToCSV = (
  flatTranslations: Record<string, string>
): string => {
  const keys = Object.keys(flatTranslations).sort();
  const header = 'key,value';
  const rows = keys.map(key => 
    `"${key}","${flatTranslations[key].replace(/"/g, '""')}"`
  );
  
  return [header, ...rows].join('\n');
};

// Helper to convert CSV back to translations
export const csvToTranslations = (
  csv: string
): Record<string, string> => {
  const lines = csv.split('\n');
  const result: Record<string, string> = {};
  
  // Start from 1 to skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Handle quoted CSV properly
    const regex = /"([^"]*)"|([^,]*)/g;
    const matches = [...line.matchAll(regex)];
    
    if (matches.length >= 2) {
      const key = (matches[0][1] || matches[0][2] || '').trim();
      const value = (matches[1][1] || matches[1][2] || '').trim();
      
      if (key) {
        result[key] = value;
      }
    }
  }
  
  return result;
};

// Helper to merge translations
export const mergeTranslations = (
  base: Record<string, string>,
  override: Record<string, string>
): Record<string, string> => {
  return { ...base, ...override };
};

// Helper to find missing translations
export const findMissingTranslations = (
  source: Record<string, string>,
  target: Record<string, string>
): string[] => {
  return Object.keys(source).filter(key => !target[key]);
};

// Helper to generate a new translation key based on a pattern
export const generateTranslationKey = (
  prefix: string,
  name: string
): string => {
  return `${prefix}.${name.toLowerCase().replace(/\s+/g, '-')}`;
};

// Load translations from modular structure by language
export const loadModularTranslations = async (
  language: Language
): Promise<Record<string, any>> => {
  try {
    // List of modules to load
    const modules = [
      'common',
      'navigation',
      'treatments',
      'aestheticTreatments',
      'childrenDentistry',
      'about',
      'clinic',
      'contact',
      'info',
      'testimonials',
      'botoxTreatments'
    ];

    // Load all modules
    const translations: Record<string, any> = {};
    
    // Use Promise.all to load modules in parallel
    await Promise.all(
      modules.map(async (module) => {
        try {
          const moduleData = await import(`../translations/${language}/${module}.json`);
          translations[module] = moduleData.default || moduleData;
        } catch (error) {
          console.warn(`Failed to load ${module} translations for ${language}`);
          // Silently fail for missing modules
        }
      })
    );

    return translations;
  } catch (error) {
    console.error(`Error loading modular translations for ${language}:`, error);
    throw error;
  }
};

// Combine all translation modules into a single flat object
export const combineTranslations = (
  translations: Record<string, any>
): Record<string, string> => {
  const result: Record<string, string> = {};
  
  // For each module
  Object.keys(translations).forEach((module) => {
    const moduleData = translations[module];
    const flattened = flattenTranslations(moduleData);
    
    // Add all module translations to result
    Object.keys(flattened).forEach((key) => {
      result[key] = flattened[key];
    });
  });
  
  return result;
};
