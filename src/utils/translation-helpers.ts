
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
    // For nested objects, we return a placeholder with object info
    const keys = Object.keys(value);
    return `[Nested Object: ${keys.join(', ')}]`;
  }
  
  return String(value);
};

/**
 * Determines if a value is a nested object (and not null or an array)
 */
export const isNestedObject = (value: any): boolean => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};
