
/**
 * Update a meta tag in the document head
 */
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
