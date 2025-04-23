
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
