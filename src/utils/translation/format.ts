
// Format a translation with variables using the {{variable}} syntax
export const formatTranslation = (
  translation: string,
  variables?: Record<string, any>
): string => {
  if (!variables || !translation) {
    return translation || '';
  }
  
  return translation.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return variables[key] !== undefined ? String(variables[key]) : `{{${key}}}`;
  });
};

// Helper to ensure safe string output for any value
export const safeString = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return '[Complex Object]';
    }
  }
  
  return String(value);
};

// Check if a value is a nested object
export const isNestedObject = (value: any): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

// Format a translation value, handling nested objects
export const formatTranslationValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (isNestedObject(value)) {
    try {
      return JSON.stringify(value);
    } catch {
      return '[Complex Object]';
    }
  }

  return String(value);
};

// Access nested translation properties safely
export const getNestedTranslationValue = (
  obj: Record<string, any>,
  path: string,
  defaultValue: string = ''
): string => {
  try {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (!current || typeof current !== 'object') {
        return defaultValue;
      }
      current = current[key];
    }
    
    return formatTranslationValue(current) || defaultValue;
  } catch (error) {
    console.warn(`Error accessing translation path: ${path}`, error);
    return defaultValue;
  }
};

// Safely format nested translation objects for displaying in components
export const formatNestedTranslation = (
  obj: Record<string, any>,
  prefix: string = '',
  result: Record<string, string> = {}
): Record<string, string> => {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (isNestedObject(value)) {
      formatNestedTranslation(value, newKey, result);
    } else {
      result[newKey] = formatTranslationValue(value);
    }
  }
  
  return result;
};
