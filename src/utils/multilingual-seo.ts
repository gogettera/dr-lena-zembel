import { Language } from '@/types/language';

export interface MultilingualSEOConfig {
  baseUrl: string;
  supportedLanguages: Language[];
  defaultLanguage: Language;
}

export interface LocalizedMetaTags {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  hreflang: Record<string, string>;
}

export interface TreatmentSEOData {
  slug: string;
  nameKey: string;
  descKey: string;
  keywords: string[];
}

// Multilingual SEO utilities for the dental clinic
export class MultilingualSEO {
  private config: MultilingualSEOConfig;

  constructor(config: MultilingualSEOConfig) {
    this.config = config;
  }

  // Generate hreflang tags for current page
  public generateHreflangTags(currentPath: string): Record<string, string> {
    const hreflangTags: Record<string, string> = {};
    
    // Remove language prefix from path to get base path
    const pathSegments = currentPath.split('/').filter(Boolean);
    const basePath = pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : '/';
    
    // Generate hreflang for each supported language
    this.config.supportedLanguages.forEach(lang => {
      const localizedPath = `${this.config.baseUrl}/${lang}${basePath}`;
      hreflangTags[lang] = localizedPath;
    });
    
    // Add x-default pointing to default language
    hreflangTags['x-default'] = `${this.config.baseUrl}/${this.config.defaultLanguage}${basePath}`;
    
    return hreflangTags;
  }

  // Apply hreflang tags to document head
  public applyHreflangTags(currentPath: string): void {
    if (typeof document === 'undefined') return;
    
    // Remove existing hreflang tags
    const existingTags = document.querySelectorAll('link[hreflang]');
    existingTags.forEach(tag => tag.remove());
    
    const hreflangTags = this.generateHreflangTags(currentPath);
    
    // Add new hreflang tags
    Object.entries(hreflangTags).forEach(([hreflang, href]) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    });
  }

  // Generate localized meta tags for treatment pages
  public generateTreatmentMetaTags(
    treatmentData: TreatmentSEOData,
    language: Language,
    translationFunction: (key: string, fallback?: string) => string
  ): LocalizedMetaTags {
    const treatmentName = translationFunction(treatmentData.nameKey, treatmentData.slug);
    const treatmentDesc = translationFunction(treatmentData.descKey, '');
    
    // Base clinic keywords by language
    const baseKeywords: Record<Language, string[]> = {
      he: ['רופא שיניים', 'מרפאת שיניים', 'ד״ר לנה זמבל', 'יפו', 'תל אביב'],
      en: ['dentist', 'dental clinic', 'Dr. Lena Zembel', 'Jaffa', 'Tel Aviv'],
      ru: ['стоматолог', 'стоматологическая клиника', 'Д-р Лена Цембель', 'Яффо', 'Тель-Авив'],
      de: ['Zahnarzt', 'Zahnarztpraxis', 'Dr. Lena Zembel', 'Jaffa', 'Tel Aviv'],
      ar: ['طبيب أسنان', 'عيادة أسنان', 'د. لينا زمبل', 'يافا', 'تل أبيب']
    };

    // Clinic name by language
    const clinicNames: Record<Language, string> = {
      he: 'מרפאת ד״ר לנה זמבל',
      en: 'Dr. Lena Zembel Dental Clinic',
      ru: 'Стоматологическая клиника д-ра Лены Цембель',
      de: 'Zahnarztpraxis Dr. Lena Zembel',
      ar: 'عيادة الأسنان د. لينا زمبل'
    };

    const clinicName = clinicNames[language];
    const keywords = [...baseKeywords[language], ...treatmentData.keywords];
    
    return {
      title: `${treatmentName} - ${clinicName}`,
      description: treatmentDesc || `${treatmentName} treatment at ${clinicName}. Professional dental care with advanced technology.`,
      ogTitle: `${treatmentName} | ${clinicName}`,
      ogDescription: treatmentDesc || `Professional ${treatmentName} treatment in Jaffa, Tel Aviv`,
      keywords,
      hreflang: this.generateHreflangTags(window.location.pathname)
    };
  }

  // Apply meta tags to document head
  public applyMetaTags(metaTags: LocalizedMetaTags): void {
    if (typeof document === 'undefined') return;
    
    // Update title
    document.title = metaTags.title;
    
    // Update or create meta tags
    this.updateMetaTag('description', metaTags.description);
    this.updateMetaTag('keywords', metaTags.keywords.join(', '));
    
    // Open Graph tags
    this.updateMetaProperty('og:title', metaTags.ogTitle);
    this.updateMetaProperty('og:description', metaTags.ogDescription);
    this.updateMetaProperty('og:type', 'website');
    
    // Apply hreflang tags
    this.applyHreflangTags(window.location.pathname);
  }

  // Helper to update meta tags
  private updateMetaTag(name: string, content: string): void {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  // Helper to update meta property tags (Open Graph)
  private updateMetaProperty(property: string, content: string): void {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  // Generate structured data for treatment pages
  public generateTreatmentStructuredData(
    treatmentData: TreatmentSEOData,
    language: Language,
    translationFunction: (key: string, fallback?: string) => string
  ): Record<string, any> {
    const treatmentName = translationFunction(treatmentData.nameKey, treatmentData.slug);
    
    return {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      "name": treatmentName,
      "description": translationFunction(treatmentData.descKey, ''),
      "performer": {
        "@type": "Dentist",
        "@id": `${this.config.baseUrl}/#dentist`,
        "name": "Dr. Lena Zembel",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ben Zvi Street 2",
          "addressLocality": "Jaffa",
          "addressRegion": "Tel Aviv",
          "addressCountry": "IL"
        },
        "telephone": "03-566-6915"
      },
      "availableService": {
        "@type": "MedicalService",
        "name": treatmentName,
        "provider": {
          "@type": "Dentist",
          "@id": `${this.config.baseUrl}/#dentist`
        }
      },
      "inLanguage": language
    };
  }

  // Apply structured data to document head
  public applyStructuredData(structuredData: Record<string, any>): void {
    if (typeof document === 'undefined') return;
    
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
}

// Default instance for the dental clinic
export const dentalClinicSEO = new MultilingualSEO({
  baseUrl: 'https://drlena.lovable.app',
  supportedLanguages: ['he', 'en', 'ru', 'de', 'ar'],
  defaultLanguage: 'he'
});

// Treatment-specific keywords by treatment type and language
export const treatmentKeywords: Record<string, Record<Language, string[]>> = {
  'root-canal': {
    he: ['טיפול שורש', 'כאב שיניים', 'הצלת שן', 'טיפול ללא כאב'],
    en: ['root canal', 'tooth pain', 'tooth salvation', 'painless treatment'],
    ru: ['лечение корневых каналов', 'зубная боль', 'спасение зуба', 'безболезненное лечение'],
    de: ['Wurzelkanalbehandlung', 'Zahnschmerzen', 'Zahnrettung', 'schmerzfreie Behandlung'],
    ar: ['علاج قناة الجذر', 'ألم الأسنان', 'إنقاذ السن', 'علاج بدون ألم']
  },
  'orthodontics': {
    he: ['יישור שיניים', 'אינביזיליין', 'גישרונים', 'יישור למבוגרים'],
    en: ['orthodontics', 'invisalign', 'braces', 'adult orthodontics'],
    ru: ['ортодонтия', 'инвизалайн', 'брекеты', 'ортодонтия для взрослых'],
    de: ['Kieferorthopädie', 'Invisalign', 'Zahnspangen', 'Erwachsenen-Kieferorthopädie'],
    ar: ['تقويم الأسنان', 'إنفيزالاين', 'تقويم الأسنان', 'تقويم أسنان البالغين']
  },
  'aesthetic-treatments': {
    he: ['ציפויי חרסינה', 'הלבנת שיניים', 'אסתטיקה דנטלית', 'חיוך הוליוודי'],
    en: ['porcelain veneers', 'teeth whitening', 'dental aesthetics', 'hollywood smile'],
    ru: ['керамические виниры', 'отбеливание зубов', 'эстетическая стоматология', 'голливудская улыбка'],
    de: ['Porzellanlaminat', 'Zahnaufhellung', 'Zahnästhetik', 'Hollywood-Lächeln'],
    ar: ['قشور البورسلين', 'تبييض الأسنان', 'جماليات الأسنان', 'ابتسامة هوليوود']
  }
};