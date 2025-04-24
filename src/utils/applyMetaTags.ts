
import { setMetaTags, MetaTagOptions } from './meta-manager';

/**
 * Default site metadata
 */
const DEFAULT_META: MetaTagOptions = {
  siteName: 'מרפאת השיניים של ד״ר לנה זמבל',
  author: 'ד״ר לנה זמבל',
  locale: 'he_IL',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  themeColor: '#1E3A8A'
};

/**
 * Applies meta tags for the current page
 * 
 * @param customMeta Custom metadata to override defaults
 */
export function applyMetaTags(customMeta: MetaTagOptions = {}): void {
  // Get current URL for og:url and canonical
  const currentUrl = window.location.href;
  
  // Merge default and custom meta
  const meta = {
    ...DEFAULT_META,
    ogUrl: currentUrl,
    canonicalUrl: currentUrl,
    ...customMeta
  };
  
  // Set all meta tags
  setMetaTags(meta);
}

/**
 * Updates meta tags during SPA navigation
 * 
 * @param pageMeta Page-specific metadata
 */
export function updatePageMeta(pageMeta: MetaTagOptions = {}): void {
  applyMetaTags(pageMeta);
}
