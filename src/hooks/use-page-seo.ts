import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { dentalClinicSEO } from '@/utils/multilingual-seo';

// Simple hook for basic page SEO (hreflang tags)
export const usePageSEO = () => {
  const location = useLocation();

  useEffect(() => {
    // Apply hreflang tags for current page
    dentalClinicSEO.applyHreflangTags(location.pathname);
  }, [location.pathname]);

  return {
    applyHreflangTags: (path: string) => dentalClinicSEO.applyHreflangTags(path),
    generateHreflangTags: (path: string) => dentalClinicSEO.generateHreflangTags(path)
  };
};