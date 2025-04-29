
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface UsePageTitleOptions {
  titleKey?: string;
  title?: string;
  suffix?: string;
}

export const usePageTitle = (options: UsePageTitleOptions = {}) => {
  const { t } = useLanguage();
  const { titleKey, title, suffix = '| Dr. Zembel Clinic' } = options;

  useEffect(() => {
    let pageTitle = '';
    
    if (titleKey) {
      pageTitle = t(titleKey);
    } else if (title) {
      pageTitle = title;
    }

    if (pageTitle) {
      document.title = `${pageTitle} ${suffix}`;
    }

    return () => {
      // Optionally reset title
    };
  }, [t, titleKey, title, suffix]);
};
