
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface UsePageMetaOptions {
  titleKey?: string;
  title?: string;
  descriptionKey?: string;
  description?: string;
  imageUrl?: string;
  canonicalUrl?: string;
}

export const usePageMeta = (options: UsePageMetaOptions = {}) => {
  const { t } = useLanguage();
  const { 
    titleKey, 
    title, 
    descriptionKey, 
    description,
    imageUrl,
    canonicalUrl
  } = options;

  useEffect(() => {
    // Handle title
    let pageTitle = '';
    if (titleKey) {
      pageTitle = t(titleKey);
    } else if (title) {
      pageTitle = title;
    }
    
    if (pageTitle) {
      document.title = pageTitle;
    }

    // Handle meta description
    let pageDescription = '';
    if (descriptionKey) {
      pageDescription = t(descriptionKey);
    } else if (description) {
      pageDescription = description;
    }
    
    if (pageDescription) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', pageDescription);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = pageDescription;
        document.head.appendChild(meta);
      }
    }

    // Handle OG image
    if (imageUrl) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', imageUrl);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.content = imageUrl;
        document.head.appendChild(meta);
      }
    }

    // Handle canonical URL
    if (canonicalUrl) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute('href', canonicalUrl);
      } else {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        canonicalTag.setAttribute('href', canonicalUrl);
        document.head.appendChild(canonicalTag);
      }
    }

    return () => {
      // Cleanup could be added if needed
    };
  }, [t, titleKey, title, descriptionKey, description, imageUrl, canonicalUrl]);
};
