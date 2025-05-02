
import { useLanguage } from '@/contexts/LanguageContext';

export const useHebrewText = () => {
  const { language, isRTL } = useLanguage();

  /**
   * Get the appropriate text direction CSS class based on current language
   */
  const getTextDirectionClass = () => {
    return isRTL ? 'text-right' : 'text-left';
  };

  /**
   * Get the appropriate dir attribute value based on current language
   */
  const getTextDirection = () => {
    return isRTL ? 'rtl' : 'ltr';
  };

  /**
   * Get additional CSS classes for RTL/LTR layout
   */
  const getRTLClasses = () => {
    return {
      flexDirection: isRTL ? 'flex-row-reverse' : 'flex-row',
      textAlign: isRTL ? 'text-right' : 'text-left',
      margin: isRTL ? 'mr-auto' : 'ml-auto',
      padding: isRTL ? 'pr-4' : 'pl-4'
    };
  };

  /**
   * Check if text contains Hebrew characters
   */
  const containsHebrew = (text: string) => {
    // Hebrew Unicode range
    const hebrewPattern = /[\u0590-\u05FF\uFB1D-\uFB4F]/;
    return hebrewPattern.test(text);
  };

  return {
    isRTL,
    getTextDirectionClass,
    getTextDirection,
    getRTLClasses,
    containsHebrew,
    currentLanguage: language
  };
};
