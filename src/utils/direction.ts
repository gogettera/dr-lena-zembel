
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Set the text direction of the document
 * @param direction 'rtl' or 'ltr'
 */
export const setDirection = (direction: 'rtl' | 'ltr'): void => {
  document.documentElement.dir = direction;
  document.documentElement.lang = direction === 'rtl' ? 'he' : 'en';
  
  // Add appropriate class to body for styling
  document.body.classList.remove('rtl', 'ltr');
  document.body.classList.add(direction);
};

/**
 * Setup direction based on the current language
 * @param language Current language code
 */
export const setupDirectionByLanguage = (language: string): void => {
  if (language === 'he' || language === 'ar') {
    setDirection('rtl');
  } else {
    setDirection('ltr');
  }
};

/**
 * A hook to get the correct CSS class for directional styles
 * @returns CSS classes for RTL/LTR support
 */
export const useDirectionalStyles = () => {
  const { isRTL } = useLanguage();
  
  return {
    textAlign: isRTL ? 'text-right' : 'text-left',
    spaceDir: isRTL ? 'space-x-reverse' : '',
    flexDir: isRTL ? 'flex-row-reverse' : 'flex-row',
    marginLeft: isRTL ? 'ml-auto' : '',
    marginRight: isRTL ? 'mr-auto' : '',
    left: isRTL ? 'right-0' : 'left-0',
    right: isRTL ? 'left-0' : 'right-0',
  };
};
