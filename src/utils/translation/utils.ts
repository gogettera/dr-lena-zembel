
/**
 * Determines if a value is a nested object (and not null or an array)
 */
export const isNestedObject = (value: any): boolean => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Safe way to access a nested property in a translation object using dot notation
 * For example: getNestedTranslation(translations, 'aestheticTreatments.headline1')
 */
export const getNestedTranslation = (obj: any, path: string): string => {
  if (!obj || !path) return '';
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === undefined || current === null) return '';
    current = current[key];
  }
  
  if (typeof current === 'object' && current !== null) {
    // If we get an object, return empty string instead of trying to render it
    return '';
  }
  
  return current?.toString() || '';
};
