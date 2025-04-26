
import { supabase } from '@/integrations/supabase/client';
import { getCachedMeta, setCachedMeta } from './meta-cache';
import { updateMetaTag } from './meta-tag';
import { updateCanonicalLink } from './canonical';
import { updateFavicon } from './favicon';
import { applyGoogleAnalytics, applyFacebookPixel } from './analytics';

export const applyMetaTags = async () => {
  try {
    let data = getCachedMeta();
    if (!data) {
      const startTime = performance.now();
      const response = await supabase
        .from('site_meta')
        .select('*')
        .eq('id', 1)
        .maybeSingle();
      if (response.error) throw response.error;
      data = response.data;
      if (!data) {
        console.log('[Meta Utils] No meta row found for id 1');
        return;
      }
      setCachedMeta(data);
      const endTime = performance.now();
      console.log(`[Meta Utils] Fetched meta in ${endTime - startTime}ms:`, data);
    } else {
      console.log('[Meta Utils] Using cached meta data');
    }

    // Apply basic meta tags
    if (data.title) document.title = data.title;
    updateMetaTag('description', data.description);

    // Open Graph
    updateMetaTag('og:title', data.og_title, 'property');
    updateMetaTag('og:description', data.og_description, 'property');

    // Check if the og_image_url is a blob URL
    const isBlobUrl = data.og_image_url && data.og_image_url.startsWith('blob:');
    if (data.og_image_url && !isBlobUrl) {
      updateMetaTag('og:image', data.og_image_url, 'property');
    }

    // Twitter
    updateMetaTag('twitter:card', data.twitter_card);
    updateMetaTag('twitter:title', data.twitter_title || data.og_title);
    updateMetaTag('twitter:description', data.twitter_description || data.og_description);

    if (data.og_image_url && !isBlobUrl) {
      updateMetaTag('twitter:image', data.og_image_url);
    }

    // Canonical
    const currentPath = window.location.pathname;
    let canonicalPath = currentPath;
    if (canonicalPath.endsWith('index.html') || canonicalPath.endsWith('index.php')) {
      canonicalPath = canonicalPath.replace(/(index\.html|index\.php)$/, '');
    }
    if (canonicalPath !== '/' && canonicalPath.endsWith('/')) {
      canonicalPath = canonicalPath.slice(0, -1);
    }
    const canonicalUrl = `https://dr-zembel.com${canonicalPath}`;
    updateCanonicalLink(canonicalUrl);

    // Favicon
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        if (data.favicon_url) {
          updateFavicon(data.favicon_url);
        } else {
          updateFavicon('/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png');
        }
      });
    } else {
      setTimeout(() => {
        if (data.favicon_url) {
          updateFavicon(data.favicon_url);
        } else {
          updateFavicon('/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png');
        }
      }, 200);
    }

    // Google Analytics
    if (data.google_analytics_id) {
      setTimeout(() => {
        applyGoogleAnalytics(data.google_analytics_id);
      }, 1000);
    }

    // Facebook Pixel
    if (data.facebook_pixel_id) {
      setTimeout(() => {
        applyFacebookPixel(data.facebook_pixel_id);
      }, 1500);
    }
  } catch (err) {
    console.error('[Meta Utils] Error applying meta tags:', err);
  }
};
