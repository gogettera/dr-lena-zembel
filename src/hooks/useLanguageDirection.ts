
import { useLayoutEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const useLanguageDirection = () => {
  const { isRTL, language } = useLanguage();
  
  useLayoutEffect(() => {
    // Update HTML dir attribute
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Add/remove RTL class on body for global styling
    if (isRTL) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
    
    return () => {
      // Cleanup not needed since this is app-wide
    };
  }, [isRTL, language]);
  
  return { isRTL, language };
};
