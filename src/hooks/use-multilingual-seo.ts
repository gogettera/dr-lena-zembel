import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { 
  dentalClinicSEO, 
  treatmentKeywords, 
  type TreatmentSEOData 
} from '@/utils/multilingual-seo';

// Hook for applying multilingual SEO to treatment pages
export const useMultilingualSEO = (treatmentData?: TreatmentSEOData) => {
  const { language, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    // Always apply hreflang tags for any page
    dentalClinicSEO.applyHreflangTags(location.pathname);

    // If treatment data is provided, apply treatment-specific SEO
    if (treatmentData) {
      const keywords = treatmentKeywords[treatmentData.slug]?.[language] || [];
      const treatmentSEOData = {
        ...treatmentData,
        keywords
      };

      const metaTags = dentalClinicSEO.generateTreatmentMetaTags(
        treatmentSEOData,
        language,
        t
      );

      dentalClinicSEO.applyMetaTags(metaTags);

      const structuredData = dentalClinicSEO.generateTreatmentStructuredData(
        treatmentSEOData,
        language,
        t
      );

      dentalClinicSEO.applyStructuredData(structuredData);
    }
  }, [language, location.pathname, treatmentData, t]);

  return {
    generateMetaTags: (data: TreatmentSEOData) => {
      const keywords = treatmentKeywords[data.slug]?.[language] || [];
      return dentalClinicSEO.generateTreatmentMetaTags(
        { ...data, keywords },
        language,
        t
      );
    },
    generateStructuredData: (data: TreatmentSEOData) => {
      return dentalClinicSEO.generateTreatmentStructuredData(data, language, t);
    }
  };
};