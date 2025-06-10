
export async function isUrlAccessible(url: string): Promise<boolean> {
  try {
    // Don't check data URLs or blob URLs
    if (url.startsWith('data:') || url.startsWith('blob:')) {
      return true;
    }

    // For relative URLs, convert to absolute
    const absoluteUrl = url.startsWith('http') ? url : new URL(url, window.location.origin).href;
    
    const response = await fetch(absoluteUrl, { 
      method: 'HEAD',
      mode: 'no-cors' // This allows checking cross-origin resources
    });
    
    // no-cors mode doesn't give us status, so we assume success if no error
    return true;
  } catch (error) {
    // If fetch fails, try a different approach for local URLs
    if (!url.startsWith('http')) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    }
    return false;
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export function isImageFile(filename: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
  return imageExtensions.includes(getFileExtension(filename).toLowerCase());
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'קובץ חייב להיות תמונה' };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: 'גודל הקובץ חייב להיות קטן מ-10MB' };
  }

  // Check file extension
  if (!isImageFile(file.name)) {
    return { valid: false, error: 'סוג קובץ לא נתמך' };
  }

  return { valid: true };
}
