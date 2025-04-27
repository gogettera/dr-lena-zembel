
/**
 * Formats a translation value for display, handling nested objects
 * 
 * @param value Any translation value that might be a string, nested object, or other type
 * @returns A string representation appropriate for display
 */
export const formatTranslation = (value: any): string => {
  if (value === undefined || value === null) {
    return '';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'object') {
    try {
      // For nested objects, convert to JSON string with indentation for better readability
      return '[Complex Object]'; // Return a placeholder instead of the object
    } catch (e) {
      // Fallback in case of circular references or other JSON stringify issues
      return '[Complex Object]';
    }
  }
  
  return String(value);
};

/**
 * A safe way to convert any value to a string for display
 */
export const safeString = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'object') {
    return '[Object]';
  }
  
  return String(value);
};
