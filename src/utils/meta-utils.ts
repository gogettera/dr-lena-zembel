
import { supabase } from '@/integrations/supabase/client';

// Apply meta information to the document head
export const applyMetaTags = async () => {
  try {
    // Fetch site meta data
    const { data, error } = await supabase
      .from('site_meta')
      .select('*')
      .eq('id', 1)
      .maybeSingle();
      
    if (error) throw error;
    if (!data) {
      console.log('[Meta Utils] No meta row found for id 1');
      return;
    }
    console.log('[Meta Utils] Applying meta:', data);
    
    // Apply basic meta tags
    if (data.title) document.title = data.title;
    updateMetaTag('description', data.description);
    
    // Open Graph
    updateMetaTag('og:title', data.og_title, 'property');
    updateMetaTag('og:description', data.og_description, 'property');
    
    // Check if the og_image_url is a blob URL - if so, don't use it as these won't work between sessions
    const isBlobUrl = data.og_image_url && data.og_image_url.startsWith('blob:');
    if (data.og_image_url && !isBlobUrl) {
      updateMetaTag('og:image', data.og_image_url, 'property');
    }
    
    // Twitter
    updateMetaTag('twitter:card', data.twitter_card);
    updateMetaTag('twitter:title', data.twitter_title || data.og_title);
    updateMetaTag('twitter:description', data.twitter_description || data.og_description);
    
    // Only use og_image_url for Twitter if it's not a blob URL
    if (data.og_image_url && !isBlobUrl) {
      updateMetaTag('twitter:image', data.og_image_url);
    }

    // Set canonical URL with current path but no index.html/index.php
    // This helps prevent duplicate content issues
    const currentPath = window.location.pathname;
    let canonicalPath = currentPath;
    
    // Remove index.html or index.php if present
    if (canonicalPath.endsWith('index.html') || canonicalPath.endsWith('index.php')) {
      canonicalPath = canonicalPath.replace(/(index\.html|index\.php)$/, '');
    }
    
    // Ensure trailing slash consistency
    if (canonicalPath !== '/' && canonicalPath.endsWith('/')) {
      canonicalPath = canonicalPath.slice(0, -1);
    }
    
    // Build the full canonical URL
    const canonicalUrl = `https://dr-zembel.com${canonicalPath}`;
    
    // Canonical (set the current path as canonical or use default)
    updateCanonicalLink(canonicalUrl);
    
    // Favicon
    if (data.favicon_url) {
      updateFavicon(data.favicon_url);
    } else {
      updateFavicon('/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png');
    }
    
    // Apply Google Analytics if ID exists
    if (data.google_analytics_id) {
      applyGoogleAnalytics(data.google_analytics_id);
    }
    
    // Apply Facebook Pixel if ID exists
    if (data.facebook_pixel_id) {
      applyFacebookPixel(data.facebook_pixel_id);
    }
    
    console.log('[Meta Utils] Meta tags applied to <head>');
  } catch (err) {
    console.error('[Meta Utils] Error applying meta tags:', err);
  }
};

// Update a meta tag in the document head
export const updateMetaTag = (
  name: string, 
  content?: string | null,
  attrName: 'name' | 'property' = 'name'
) => {
  if (!content) return;
  
  let meta = document.querySelector(`meta[${attrName}="${name}"]`);
  
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = document.createElement('meta');
    meta.setAttribute(attrName, name);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
};

// Update or create canonical link
export const updateCanonicalLink = (canonicalUrl: string) => {
  if (!canonicalUrl) return;
  let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = canonicalUrl;
};

// Update favicons in the document head
export const updateFavicon = (faviconUrl: string) => {
  if (!faviconUrl) return;
  console.log('Updating favicon to:', faviconUrl);
  
  try {
    // Skip blob URLs
    if (faviconUrl.startsWith('blob:')) {
      console.warn('Skipping blob URL for favicon, using default instead');
      faviconUrl = '/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png';
    }
    
    // Get file extension to determine icon type
    const fileExtMatch = faviconUrl.match(/\.([^.]+)$/);
    const fileExt = fileExtMatch ? fileExtMatch[1].toLowerCase() : 'png';
    let mimeType = 'image/png'; // Default mime type
    
    // Set the appropriate mime type based on file extension
    if (fileExt === 'svg') {
      mimeType = 'image/svg+xml';
    } else if (fileExt === 'jpg' || fileExt === 'jpeg') {
      mimeType = 'image/jpeg';
    }
    
    // Remove existing favicon links
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach(favicon => favicon.remove());
    
    // Create standard favicon link
    let link = document.querySelector('link#favicon-main') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = 'favicon-main';
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = mimeType;
    link.href = faviconUrl;
    
    // Create Apple touch icon
    let appleLink = document.querySelector('link#favicon-apple') as HTMLLinkElement;
    if (!appleLink) {
      appleLink = document.createElement('link');
      appleLink.id = 'favicon-apple';
      appleLink.rel = 'apple-touch-icon';
      document.head.appendChild(appleLink);
    }
    appleLink.href = faviconUrl;
    
    console.log('Favicon updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating favicon:', error);
    return false;
  }
};

// Apply Google Analytics
const applyGoogleAnalytics = (gaId: string) => {
  if (!gaId || gaId.trim() === '') return;
  
  try {
    // Check if GA script already exists
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
      return; // Already loaded
    }
    
    // Create GA script
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(gaScript);
    
    // Create GA initialization script
    const gaInitScript = document.createElement('script');
    gaInitScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(gaInitScript);
    
    console.log(`Google Analytics initialized with ID: ${gaId}`);
  } catch (error) {
    console.error('Error applying Google Analytics:', error);
  }
};

// Apply Facebook Pixel
const applyFacebookPixel = (pixelId: string) => {
  if (!pixelId || pixelId.trim() === '') return;
  
  try {
    // Check if FB Pixel script already exists
    if (document.querySelector(`script[id="facebook-pixel-${pixelId}"]`)) {
      return; // Already loaded
    }
    
    // Create FB Pixel script
    const fbScript = document.createElement('script');
    fbScript.id = `facebook-pixel-${pixelId}`;
    fbScript.text = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbScript);
    
    // Create FB Pixel noscript fallback
    const fbNoscript = document.createElement('noscript');
    const fbImg = document.createElement('img');
    fbImg.height = 1;
    fbImg.width = 1;
    fbImg.style.display = 'none';
    fbImg.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    fbNoscript.appendChild(fbImg);
    document.body.appendChild(fbNoscript);
    
    console.log(`Facebook Pixel initialized with ID: ${pixelId}`);
  } catch (error) {
    console.error('Error applying Facebook Pixel:', error);
  }
};
