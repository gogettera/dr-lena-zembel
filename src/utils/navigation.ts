
import { Language } from '@/types/language';

export const getNavigationPath = (language: Language, path: string = '') => {
  return `/${language}${path}`;
};

export const isActiveLink = (currentPath: string, linkPath: string): boolean => {
  return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
};
