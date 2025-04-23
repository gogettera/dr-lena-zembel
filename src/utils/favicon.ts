
export const updateFavicon = (faviconUrl: string) => {
  if (!faviconUrl) return;
  
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
    
    // Update existing favicon links instead of removing and recreating them
    let link = document.querySelector('link#favicon-main') as HTMLLinkElement;
    if (link) {
      link.type = mimeType;
      link.href = faviconUrl;
    }
    
    let appleLink = document.querySelector('link#favicon-apple') as HTMLLinkElement;
    if (appleLink) {
      appleLink.href = faviconUrl;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating favicon:', error);
    return false;
  }
};
