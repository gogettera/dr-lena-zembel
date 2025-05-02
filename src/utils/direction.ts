
import React from 'react';
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
  
  // Log direction change
  console.log(`Document direction set to: ${direction}`);
};

/**
 * Setup direction based on the current language
 * @param language Current language code
 */
export const setupDirectionByLanguage = (language: string): void => {
  const isRTL = language === 'he' || language === 'ar';
  setDirection(isRTL ? 'rtl' : 'ltr');
  
  // Log the direction change
  console.log(`Direction set based on language ${language}: ${isRTL ? 'RTL' : 'LTR'}`);
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
      header: {
        phone: isRTL ? 'order-3' : 'order-1',
        logo: 'order-2',
        nav: isRTL ? 'order-1' : 'order-3'
      }
    },
    icon: {
      chevron: isRTL ? 'rotate-180' : '',
      arrow: isRTL ? '-scale-x-100' : '',
    },
    // Fix for RTL/LTR global page structure
    global: {
      htmlDir: isRTL ? 'rtl' : 'ltr',
      bodyClass: isRTL ? 'rtl' : 'ltr',
      contentFlow: isRTL ? 'flow-rtl' : 'flow-ltr',
      textDirection: isRTL ? 'text-right' : 'text-left',
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

/**
 * Create a wrapper element with the correct direction
 * @param isRTL Whether the direction is RTL
 * @returns JSX element with the correct direction
 */
export const createDirectionalWrapper = (
  isRTL: boolean, 
  children: React.ReactNode,
  className?: string
) => {
  // Use React.createElement instead of JSX syntax
  return React.createElement(
    'div',
    {
      dir: isRTL ? 'rtl' : 'ltr',
      className: className,
      'data-direction': isRTL ? 'rtl' : 'ltr'
    },
    children
  );
};
