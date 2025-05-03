
/**
 * Helper functions for formatting translation values
 */

/**
 * Format a translation value into a string
 */
export const formatTranslationValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value.toString();
  }

  if (isNestedObject(value)) {
    return safeString(JSON.stringify(value));
  }

  return String(value);
};

/**
 * Check if a value is a nested object (not null, an object, and not an array)
 */
export const isNestedObject = (value: any): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Convert any value to a safe string representation
 */
export const safeString = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  try {
    return String(value);
  } catch (error) {
    console.error('Error converting value to string:', error);
    return '';
  }
};

/**
 * Format a translation entry (typically from i18next)
 * Handles nested objects and arrays safely
 */
export const formatTranslation = (translationValue: any): string => {
  if (translationValue === null || translationValue === undefined) {
    return '';
  }

  if (typeof translationValue === 'string') {
    return translationValue;
  }

  if (typeof translationValue === 'number' || typeof translationValue === 'boolean') {
    return String(translationValue);
  }

  if (Array.isArray(translationValue)) {
    return translationValue.map(formatTranslation).join(', ');
  }

  if (isNestedObject(translationValue)) {
    try {
      return JSON.stringify(translationValue);
    } catch (error) {
      console.error('Error stringifying object:', error);
      return '[Complex Object]';
    }
  }

  return String(translationValue);
};
