
import React, { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { applyMetaTags, updatePageMeta } from '@/utils/applyMetaTags';
import { MetaTagOptions } from '@/utils/meta-manager';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  metadata?: MetaTagOptions;
  className?: string;
}

/**
 * PageContainer - Wraps page content with common functionality:
 * - Scrolls to top on page change
 * - Updates document title and meta tags
 * - Applies consistent page padding
 */
const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  description,
  metadata = {},
  className = ''
}) => {
  const location = useLocation();
  const { t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    // Prepare meta tag data
    const metaData: MetaTagOptions = {
      ...metadata
    };
    
    // Set title if provided
    if (title) {
      const translatedTitle = t(title);
      document.title = `${translatedTitle} | ד״ר לנה זמבל`;
      metaData.title = translatedTitle;
    }
    
    // Set description if provided
    if (description) {
      metaData.description = t(description);
    }
    
    // Apply meta tags
    updatePageMeta(metaData);
    
    // Reset HTTP status code to 200 OK (useful for SPA navigation)
    const existingStatusMeta = document.querySelector('meta[name="http-status"]');
    if (existingStatusMeta) {
      existingStatusMeta.setAttribute('content', '200');
    }
  }, [location.pathname, title, description, metadata, t]);
  
  return (
    <div className={`page-container ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
