
/**
 * Utility functions for file handling and image operations
 */

/**
 * Validates an image file for size and type
 * @param file The file to validate
 * @param maxSizeMB Maximum file size in MB
 * @returns Object containing validation result and error message if any
 */
export const validateImageFile = (
  file: File | null, 
  maxSizeMB: number = 1
): { valid: boolean; message?: string } => {
  if (!file) {
    return { valid: false, message: "No file selected" };
  }

  // Check file type
  if (!file.type.startsWith('image/')) {
    return { 
      valid: false, 
      message: "Invalid file type. Please upload an image file (PNG, JPG, or SVG)" 
    };
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { 
      valid: false, 
      message: `File too large. Maximum size is ${maxSizeMB}MB` 
    };
  }

  return { valid: true };
};

/**
 * Creates a data URL from a file for preview
 * @param file The file to create a preview for
 * @returns Promise that resolves to the data URL
 */
export const createFilePreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Determines the appropriate favicon link tags based on file type
 * @param faviconUrl URL of the favicon
 * @param fileType MIME type of the favicon
 * @returns HTML string with appropriate link tags
 */
export const generateFaviconTags = (faviconUrl: string, fileType: string): string => {
  let tags = '';
  
  if (fileType === 'image/svg+xml') {
    tags = `
      <link rel="icon" href="${faviconUrl}" type="image/svg+xml">
      <link rel="alternate icon" href="${faviconUrl}" type="image/png">
    `;
  } else if (fileType === 'image/png') {
    tags = `
      <link rel="icon" href="${faviconUrl}" type="image/png">
      <link rel="apple-touch-icon" href="${faviconUrl}">
    `;
  } else if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
    tags = `
      <link rel="icon" href="${faviconUrl}" type="image/jpeg">
      <link rel="apple-touch-icon" href="${faviconUrl}">
    `;
  }
  
  return tags;
};
