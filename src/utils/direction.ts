
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
  
  // Add data attribute to enable CSS targeting
  document.documentElement.setAttribute('data-direction', direction);
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
    padding: isRTL ? 'pl-4 pr-2' : 'pr-4 pl-2',
    borderSide: isRTL ? 'border-r' : 'border-l',
    transformOrigin: isRTL ? 'origin-right' : 'origin-left',
    scroll: isRTL ? 'rtl-scrollbar' : '',
    order: {
      first: isRTL ? 'order-last' : 'order-first',
      last: isRTL ? 'order-first' : 'order-last',
      nav: isRTL ? 'flex-row-reverse' : 'flex-row',
    },
    icon: {
      chevron: isRTL ? 'rotate-180' : '',
      arrow: isRTL ? '-scale-x-100' : '',
    }
  };
};

/**
 * Debounce function to improve scroll performance
 * @param callback The function to debounce
 * @param wait Debounce timeout in ms
 */
export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
