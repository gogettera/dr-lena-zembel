
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Custom hook for working with Hebrew text and RTL content
 */
export const useHebrewText = () => {
  const { language, isRTL } = useLanguage();
  
  /**
   * Returns the correct text direction class based on the current language
   */
  const getTextDirectionClass = (): string => {
    return isRTL ? 'text-right' : 'text-left';
  };

  /**
   * Returns whether the current language is Hebrew
   */
  const isHebrew = (): boolean => {
    return language === 'he';
  };
  
  /**
   * Formats a number according to Hebrew locale if in Hebrew mode
   */
  const formatNumber = (number: number): string => {
    return isHebrew() 
      ? new Intl.NumberFormat('he-IL').format(number)
      : new Intl.NumberFormat().format(number);
  };
  
  /**
   * Formats a date according to Hebrew locale if in Hebrew mode
   */
  const formatDate = (date: Date): string => {
    return isHebrew()
      ? new Intl.DateTimeFormat('he-IL').format(date)
      : new Intl.DateTimeFormat().format(date);
  };
  
  return {
    isHebrew,
    isRTL,
    getTextDirectionClass,
    formatNumber,
    formatDate
  };
};

/**
 * Function to extract Hebrew text correctly even with combining marks
 */
export const extractHebrewText = (text: string): string => {
  // This regex matches Hebrew characters
  const hebrewRegex = /[\u0590-\u05FF\u200f\uFB1D-\uFB4F]+/g;
  const matches = text.match(hebrewRegex);
  return matches ? matches.join(' ') : '';
};

/**
 * Helper function to determine if a string contains Hebrew characters
 */
export const containsHebrew = (text: string): boolean => {
  // Regex to test for Hebrew characters
  const hebrewRegex = /[\u0590-\u05FF\uFB1D-\uFB4F]/;
  return hebrewRegex.test(text);
};

/**
 * Helper function to handle bidirectional text properly
 */
export const wrapBidi = (text: string): string => {
  if (!text) return '';
  
  // Add RLM (Right-to-Left Mark) if the text contains Hebrew characters
  if (containsHebrew(text)) {
    // \u200F is the Right-to-Left Mark (RLM)
    return `\u200F${text}`;
  }
  
  return text;
};
