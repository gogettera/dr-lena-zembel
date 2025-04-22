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
    updateMetaTag('og:image', data.og_image_url, 'property');
    
    // Twitter
    updateMetaTag('twitter:card', data.twitter_card);
    updateMetaTag('twitter:title', data.twitter_title || data.og_title);
    updateMetaTag('twitter:description', data.twitter_description || data.og_description);
    updateMetaTag('twitter:image', data.og_image_url);
    
    // Favicon
    if (data.favicon_url) {
      updateFavicon(data.favicon_url);
    } else {
      updateFavicon('/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png');
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

// Update favicons in the document head
export const updateFavicon = (faviconUrl: string) => {
  if (!faviconUrl) return;
  console.log('Updating favicon to:', faviconUrl);
  
  try {
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
