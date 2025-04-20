
import { Language } from '@/types/language';

export const getNavigationPath = (language: Language, path: string = '') => {
  return `/${language}${path}`;
};

export const isActiveLink = (currentPath: string, linkPath: string): boolean => {
  return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
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
  
  if (typeof current === 'object' && current !== null) {
    return JSON.stringify(current);
  }
  
  return current?.toString() || '';
};
