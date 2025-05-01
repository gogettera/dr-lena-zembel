
import { Language } from '@/types/language';
import { formatTranslationValue, isNestedObject } from '@/utils/translation';

export const getNavigationPath = (language: Language, path: string = '') => {
  return `/${language}${path}`;
};

/**
 * Smarter active link detection: supports fragments, nested, and trailing slashes
 */
export const isActiveLink = (currentPath: string, linkPath: string): boolean => {
  // Handle fragment links (e.g., /he#contact)
  if (linkPath.includes("#")) {
    const basePath = linkPath.split("#")[0];
    return currentPath === basePath || currentPath === `${basePath}/`;
  }
  // Exact match, or match with trailing slash
  if (currentPath === linkPath || currentPath === `${linkPath}/`) {
    return true;
  }
  // Nested route (but exclude root "/")
  if (linkPath !== "/" && currentPath.startsWith(linkPath)) {
    return true;
  }
  return false;
};

// Helper for safely accessing nested properties in translation objects
export const getNestedTranslationValue = (obj: any, path: string): string => {
  if (!obj || typeof obj !== 'object') return '';
  
  const parts = path.split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return '';
    }
    current = current[part];
  }
  
  if (isNestedObject(current)) {
    return formatTranslationValue(current);
  }
  
  return current?.toString() || '';
};

// Safe way to display nested objects as strings in any context
export const safelyStringifyIfObject = (value: any): string => {
  return formatTranslationValue(value);
};
