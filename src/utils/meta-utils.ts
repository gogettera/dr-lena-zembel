
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
    if (!data) return;
    
    // Apply basic meta tags
    if (data.title) document.title = data.title;
    updateMetaTag('description', data.description);
    
    // Apply Open Graph meta tags
    updateMetaTag('og:title', data.og_title, 'property');
    updateMetaTag('og:description', data.og_description, 'property');
    updateMetaTag('og:image', data.og_image_url, 'property');
    
    // Apply Twitter meta tags
    updateMetaTag('twitter:card', data.twitter_card);
    updateMetaTag('twitter:title', data.twitter_title || data.og_title);
    updateMetaTag('twitter:description', data.twitter_description || data.og_description);
    updateMetaTag('twitter:image', data.og_image_url);
    
    // Update favicon if available
    if (data.favicon_url) {
      updateFavicon(data.favicon_url);
    }
  } catch (err) {
    console.error('Error applying meta tags:', err);
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
  // Update main favicon
  const mainFavicon = document.getElementById('favicon-main') as HTMLLinkElement;
  if (mainFavicon) {
    mainFavicon.href = faviconUrl;
  }
  
  // Update Apple touch icon
  const appleFavicon = document.getElementById('favicon-apple') as HTMLLinkElement;
  if (appleFavicon) {
    appleFavicon.href = faviconUrl;
  }
};
