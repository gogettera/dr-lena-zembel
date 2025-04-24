
/**
 * Security utility functions
 */

/**
 * Sanitizes text content to prevent XSS attacks
 * @param text Text to sanitize
 * @returns Sanitized text
 */
export const sanitizeText = (text: string | null | undefined): string => {
  if (!text) return '';
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Validates email address format
 * @param email Email address to validate
 * @returns Boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param password Password to validate
 * @returns Boolean indicating if password meets security requirements
 */
export const validatePassword = (password: string): boolean => {
  // At least 10 characters, 1 letter, 1 number, 1 special character
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/;
  return passwordRegex.test(password);
};

/**
 * Generates a CSRF token
 * @returns A random string to use as CSRF token
 */
export const generateCSRFToken = (): string => {
  const array = new Uint32Array(4);
  window.crypto.getRandomValues(array);
  return Array.from(array, n => n.toString(16).padStart(8, '0')).join('');
};

/**
 * Sanitizes a URL to prevent open redirect vulnerabilities
 * @param url URL to sanitize
 * @returns Sanitized URL
 */
export const sanitizeUrl = (url: string): string => {
  // Only allow relative paths or specific domains
  if (url.match(/^(https?:)?\/\/(?!example\.com|api\.example\.com)/i)) {
    return '/';
  }
  
  // Remove any potentially dangerous characters
  return url.replace(/[^\w\s\-._~:/?#[\]@!$&'()*+,;=]/g, '');
};

/**
 * Validates and sanitizes file information
 * @param file File to validate
 * @param allowedTypes Array of allowed MIME types
 * @param maxSizeBytes Maximum file size in bytes
 * @returns Object with validation results
 */
export const validateAndSanitizeFile = (
  file: File | null, 
  allowedTypes: string[] = ['image/jpeg', 'image/png'], 
  maxSizeBytes: number = 5 * 1024 * 1024
): { valid: boolean; error?: string; sanitizedName?: string } => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }
  
  // Check file size
  if (file.size > maxSizeBytes) {
    return { 
      valid: false, 
      error: `File too large. Maximum size is ${maxSizeBytes / 1024 / 1024}MB` 
    };
  }
  
  // Sanitize filename
  const fileExt = (file.name.match(/\.([^.]+)$/) || ['', 'bin'])[1].toLowerCase();
  const sanitizedName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  
  return { 
    valid: true,
    sanitizedName 
  };
};

/**
 * Tracks login attempts for rate limiting
 */
export const loginRateLimiter = {
  maxAttempts: 5,
  lockoutDuration: 60000, // 1 minute in milliseconds
  
  getAttempts(): number {
    const attempts = localStorage.getItem('loginAttempts');
    return attempts ? parseInt(attempts, 10) : 0;
  },
  
  getLastAttemptTime(): number {
    const time = localStorage.getItem('lastAttemptTime');
    return time ? parseInt(time, 10) : 0;
  },
  
  updateAttempts(attempts: number): void {
    localStorage.setItem('loginAttempts', attempts.toString());
  },
  
  updateLastAttemptTime(time: number = Date.now()): void {
    localStorage.setItem('lastAttemptTime', time.toString());
  },
  
  isRateLimited(): boolean {
    const attempts = this.getAttempts();
    const lastTime = this.getLastAttemptTime();
    const now = Date.now();
    
    return attempts >= this.maxAttempts && now - lastTime < this.lockoutDuration;
  },
  
  getRemainingLockoutTime(): number {
    if (!this.isRateLimited()) return 0;
    
    const lastTime = this.getLastAttemptTime();
    const now = Date.now();
    
    return Math.max(0, this.lockoutDuration - (now - lastTime));
  },
  
  recordAttempt(): void {
    const attempts = this.getAttempts();
    this.updateAttempts(attempts + 1);
    this.updateLastAttemptTime();
  },
  
  resetAttempts(): void {
    this.updateAttempts(0);
  }
};
