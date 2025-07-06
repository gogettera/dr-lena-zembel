import { Language } from '@/types/language';

export interface LanguageDetectionOptions {
  supportedLanguages: Language[];
  defaultLanguage: Language;
  enableGeolocation?: boolean;
  enableBrowserDetection?: boolean;
  enableStorageDetection?: boolean;
}

export interface LanguageHints {
  url?: Language;
  stored?: Language;
  browser?: Language;
  geo?: Language;
  timezone?: string;
}

// Enhanced language detection with multiple fallback strategies
export class EnhancedLanguageDetection {
  private options: Required<LanguageDetectionOptions>;

  constructor(options: LanguageDetectionOptions) {
    this.options = {
      enableGeolocation: true,
      enableBrowserDetection: true,
      enableStorageDetection: true,
      ...options
    };
  }

  // Get language from URL path (highest priority)
  private getUrlLanguage(): Language | null {
    if (typeof window === 'undefined') return null;
    
    const pathname = window.location.pathname;
    const pathLang = pathname.split('/')[1] as Language;
    
    return this.options.supportedLanguages.includes(pathLang) ? pathLang : null;
  }

  // Get stored language preference
  private getStoredLanguage(): Language | null {
    if (!this.options.enableStorageDetection || typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem('preferredLanguage') as Language;
      return this.options.supportedLanguages.includes(stored) ? stored : null;
    } catch {
      return null;
    }
  }

  // Get browser language with better matching
  private getBrowserLanguage(): Language | null {
    if (!this.options.enableBrowserDetection || typeof navigator === 'undefined') return null;
    
    const languages = Array.isArray(navigator.languages) 
      ? navigator.languages 
      : [navigator.language];

    for (const lang of languages) {
      // Try exact match first
      const exactMatch = lang.toLowerCase() as Language;
      if (this.options.supportedLanguages.includes(exactMatch)) {
        return exactMatch;
      }
      
      // Try language code only (e.g., 'en-US' -> 'en')
      const langCode = lang.split('-')[0].toLowerCase() as Language;
      if (this.options.supportedLanguages.includes(langCode)) {
        return langCode;
      }
    }
    
    return null;
  }

  // Get geographic hint from timezone
  private getTimezoneHint(): Language | null {
    if (!this.options.enableGeolocation || typeof Intl === 'undefined') return null;
    
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Geographic language hints based on timezone
      const timezoneHints: Record<string, Language> = {
        'Asia/Jerusalem': 'he',
        'Europe/Berlin': 'de',
        'Europe/Moscow': 'ru',
        'Asia/Dubai': 'ar',
        'Asia/Riyadh': 'ar',
        'Europe/London': 'en',
        'America/New_York': 'en'
      };
      
      const hint = timezoneHints[timezone];
      return this.options.supportedLanguages.includes(hint) ? hint : null;
    } catch {
      return null;
    }
  }

  // Collect all language hints
  public getLanguageHints(): LanguageHints {
    return {
      url: this.getUrlLanguage(),
      stored: this.getStoredLanguage(),
      browser: this.getBrowserLanguage(),
      geo: this.getTimezoneHint(),
      timezone: typeof Intl !== 'undefined' 
        ? Intl.DateTimeFormat().resolvedOptions().timeZone 
        : undefined
    };
  }

  // Detect best language with priority system
  public detectLanguage(): Language {
    const hints = this.getLanguageHints();
    
    // Priority order: URL > Stored > Browser > Geographic > Default
    return (
      hints.url ||
      hints.stored ||
      hints.browser ||
      hints.geo ||
      this.options.defaultLanguage
    );
  }

  // Store language preference
  public storeLanguagePreference(language: Language): void {
    if (!this.options.enableStorageDetection || typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('preferredLanguage', language);
    } catch (error) {
      console.warn('Failed to store language preference:', error);
    }
  }

  // Check if language should be updated based on context
  public shouldUpdateLanguage(currentLanguage: Language): {
    shouldUpdate: boolean;
    suggestedLanguage: Language;
    reason: string;
  } {
    const hints = this.getLanguageHints();
    
    // URL always takes precedence
    if (hints.url && hints.url !== currentLanguage) {
      return {
        shouldUpdate: true,
        suggestedLanguage: hints.url,
        reason: 'URL language change detected'
      };
    }
    
    return {
      shouldUpdate: false,
      suggestedLanguage: currentLanguage,
      reason: 'Current language is appropriate'
    };
  }
}

// Default instance for the dental clinic
export const dentalClinicLanguageDetection = new EnhancedLanguageDetection({
  supportedLanguages: ['he', 'en', 'ru', 'de', 'ar'],
  defaultLanguage: 'he',
  enableGeolocation: true,
  enableBrowserDetection: true,
  enableStorageDetection: true
});