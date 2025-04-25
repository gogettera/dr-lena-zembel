
// Format a translation with variables using the {{variable}} syntax
export const formatTranslation = (
  translation: string,
  variables?: Record<string, any>
): string => {
  if (!variables) {
    return translation;
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

