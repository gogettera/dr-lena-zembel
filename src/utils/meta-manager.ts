
/**
 * MetaTagOptions - Configuration options for setting meta tags
 */
export interface MetaTagOptions {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  locale?: string;
  siteName?: string;
  themeColor?: string;
  [key: string]: string | boolean | undefined;
}

/**
 * Updates or creates a meta tag
 * 
 * @param name Meta tag name or property
 * @param content Meta tag content
 * @param isProperty Whether this is a property attribute (like og:title) rather than a name attribute
 */
export function updateMetaTag(
  name: string,
  content: string | undefined,
  isProperty: boolean = false
): void {
  // Skip if no content
  if (content === undefined || content === null) return;
  
  // Determine attribute name (name or property)
  const attributeName = isProperty ? 'property' : 'name';
  
  // Look for existing meta tag
  let metaTag = document.querySelector(`meta[${attributeName}="${name}"]`);
  
  if (metaTag) {
    // Update existing tag
    metaTag.setAttribute('content', content);
  } else {
    // Create new tag
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attributeName, name);
    metaTag.setAttribute('content', content);
    document.head.appendChild(metaTag);
  }
}

/**
 * Updates the document title
 * 
 * @param title The new title
 * @param suffix Optional suffix to append (like site name)
 */
export function updateTitle(title: string, suffix?: string): void {
  document.title = suffix ? `${title} | ${suffix}` : title;
}

/**
 * Updates the canonical link
 * 
 * @param url The canonical URL
 */
export function updateCanonicalLink(url: string): void {
  if (!url) return;
  
  let link = document.querySelector('link[rel="canonical"]');
  
  if (link) {
    link.setAttribute('href', url);
  } else {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }
}

/**
 * Updates the robots meta tag
 * 
 * @param noindex Whether to set noindex
 * @param nofollow Whether to set nofollow
 */
export function updateRobotsTag(noindex?: boolean, nofollow?: boolean): void {
  const values: string[] = [];
  
  if (noindex) values.push('noindex');
  else values.push('index');
  
  if (nofollow) values.push('nofollow');
  else values.push('follow');
  
  updateMetaTag('robots', values.join(', '));
}

/**
 * Sets all meta tags from the provided options
 * 
 * @param options Meta tag options
 */
export function setMetaTags(options: MetaTagOptions): void {
  const {
    title,
    description,
    keywords,
    author,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType,
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterCard,
    canonicalUrl,
    noindex,
    nofollow,
    locale,
    siteName,
    themeColor,
    ...rest
  } = options;
  
  // Basic meta
  if (title) updateTitle(title, siteName);
  if (description) updateMetaTag('description', description);
  if (keywords) updateMetaTag('keywords', keywords);
  if (author) updateMetaTag('author', author);
  if (themeColor) updateMetaTag('theme-color', themeColor);
  
  // OpenGraph
  if (ogTitle || title) updateMetaTag('og:title', ogTitle || title, true);
  if (ogDescription || description) updateMetaTag('og:description', ogDescription || description, true);
  if (ogImage) updateMetaTag('og:image', ogImage, true);
  if (ogUrl) updateMetaTag('og:url', ogUrl, true);
  if (ogType) updateMetaTag('og:type', ogType, true);
  if (siteName) updateMetaTag('og:site_name', siteName, true);
  if (locale) updateMetaTag('og:locale', locale, true);
  
  // Twitter
  if (twitterTitle || ogTitle || title) updateMetaTag('twitter:title', twitterTitle || ogTitle || title);
  if (twitterDescription || ogDescription || description) updateMetaTag('twitter:description', twitterDescription || ogDescription || description);
  if (twitterImage || ogImage) updateMetaTag('twitter:image', twitterImage || ogImage);
  if (twitterCard) updateMetaTag('twitter:card', twitterCard);
  
  // Canonical
  if (canonicalUrl) updateCanonicalLink(canonicalUrl);
  
  // Robots
  updateRobotsTag(noindex, nofollow);
  
  // Any additional meta tags
  Object.entries(rest).forEach(([key, value]) => {
    if (typeof value === 'string') {
      updateMetaTag(key, value);
    }
  });
}
