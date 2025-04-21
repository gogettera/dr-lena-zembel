
/**
 * Formats a translation value for display, handling nested objects
 * 
 * @param value Any translation value that might be a string, nested object, or other type
 * @returns A string representation appropriate for display
 */
export const formatTranslationValue = (value: any): string => {
  if (value === undefined || value === null) {
    return '';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'object') {
    try {
      // For nested objects, convert to JSON string with indentation for better readability
      return JSON.stringify(value, null, 2);
    } catch (e) {
      // Fallback in case of circular references or other JSON stringify issues
      return '[Complex Object]';
    }
  }
  
  return String(value);
};

/**
 * Determines if a value is a nested object (and not null or an array)
 */
export const isNestedObject = (value: any): boolean => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Safe way to access and display a nested object property or sub-property
 * Avoids the "Objects are not valid as React child" error
 */
export const safeDisplayObject = (obj: any): string => {
  if (obj === null || obj === undefined) {
    return '';
  }
  
  if (typeof obj !== 'object') {
    return String(obj);
  }
  
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return '[Complex Object]';
  }
};

/**
 * Safely access a nested property in a translation object using dot notation
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
  
  if (typeof current === 'object') {
    return safeDisplayObject(current);
  }
  
  return current?.toString() || '';
};
