
// File validation utilities for image uploads

// Allowed image MIME types and file size limits for security
export const ALLOWED_MIME_TYPES = [
  "image/jpeg", 
  "image/png", 
  "image/webp", 
  "image/gif", 
  "image/svg+xml"
];

export const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function useImageValidation() {
  const validateFile = (file: File): ValidationResult => {
    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return { 
        valid: false, 
        error: `Unsupported file type: ${file.type}. Allowed types: JPEG, PNG, WebP, GIF, SVG`
      };
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File too large. Maximum size: ${MAX_FILE_SIZE/1024/1024}MB`
      };
    }
    
    return { valid: true };
  };

  const validateFileExtension = (fileExt: string): ValidationResult => {
    // Validate file extension against allowed types as double-check
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return {
        valid: false,
        error: `File extension .${fileExt} is not allowed`
      };
    }
    
    return { valid: true };
  };

  return {
    validateFile,
    validateFileExtension
  };
}
