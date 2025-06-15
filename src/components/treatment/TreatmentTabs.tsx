import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { createLocalizedPath } from '@/utils/languageRoutes';
import TreatmentBenefits from './TreatmentBenefits';
import TreatmentFAQ from './TreatmentFAQ';
import TreatmentTestimonials from './TreatmentTestimonials';
import TreatmentProcedure from './TreatmentProcedure';
import RelatedTreatments from './RelatedTreatments';

interface TreatmentTabsProps {
  treatmentType: string;
  treatmentNameKey: string;
  treatmentDescKey: string;
}

const TreatmentTabs: React.FC<TreatmentTabsProps> = ({
  treatmentType,
  treatmentNameKey,
  treatmentDescKey
}) => {
  const { t, language } = useLanguage();

  // Treatments that have dedicated landing pages
  const treatmentsWithLandingPages = [
    'children-dentistry',
    'aesthetic-treatments', 
    'orthodontics',
    'root-canal',
    'oral-rehabilitation',
    'preventive-medicine'
  ];

  const hasLandingPage = treatmentsWithLandingPages.includes(treatmentType);

  // Get treatment-specific benefits
  const getTreatmentBenefits = (type: string) => {
    const { t } = useLanguage();
    // Always try dynamic array first: `${type}.benefits.items`
    const dynamicArray = t(`${type}.benefits.items`, { returnObjects: true });
    if (Array.isArray(dynamicArray) && dynamicArray.length > 0) {
      return dynamicArray.map((b: any) => b.title || "");
    }
    // Fallback: old logic for known types
    switch (type) {
      case "children-dentistry":
        return [
          t('childrenDentistry.whyUs.reasons.0.title', ''),
          t('childrenDentistry.whyUs.reasons.1.title', ''),
          t('childrenDentistry.whyUs.reasons.2.title', ''),
          t('childrenDentistry.whyUs.reasons.3.title', '')
        ].filter(Boolean);
      case "orthodontics":
        return [
          t('orthodontics.whyUs.reasons.0.title', ''),
          t('orthodontics.whyUs.reasons.1.title', ''),
          t('orthodontics.whyUs.reasons.2.title', ''),
          t('orthodontics.whyUs.reasons.3.title', '')
        ].filter(Boolean);
      case "root-canal":
        return [
          t('rootCanal.whyUs.reasons.0.title', ''),
          t('rootCanal.whyUs.reasons.1.title', ''),
          t('rootCanal.whyUs.reasons.2.title', ''),
          t('rootCanal.whyUs.reasons.3.title', '')
        ].filter(Boolean);
      default:
        // Use base fallback (generic benefits)
        const baseBenefits = t('treatments.benefits.items', { returnObjects: true });
        if (Array.isArray(baseBenefits) && baseBenefits.length > 0) {
          return baseBenefits.map((b: any) => b.title || "");
        }
        return [
          t('treatments.benefits.professional', ''),
          t('treatments.benefits.modern', ''),
          t('treatments.benefits.comfortable', ''),
          t('treatments.benefits.effective', '')
        ].filter(Boolean);
    }
  };

  const benefits = getTreatmentBenefits(treatmentType);

  return (
    <div className="w-full mt-4">
      {hasLandingPage && (
        <div className="mb-6 p-4 bg-dental-beige/20 rounded-lg border border-dental-orange/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-dental-navy mb-1">
                {t('treatments.fullExperience')}
              </h3>
              <p className="text-sm text-dental-navy/70">
                {t('treatments.viewCompleteLandingPage')}
              </p>
            </div>
            <Link to={createLocalizedPath(language, `/treatments/${treatmentType}/landing`)}>
              <Button variant="orange" size="sm" className="flex items-center gap-2">
                {t('treatments.viewFullPage')}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex flex-wrap mb-4 gap-2">
          <TabsTrigger value="overview">{t('treatments.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="procedure">{t('treatments.tabs.procedure')}</TabsTrigger>
          <TabsTrigger value="benefits">{t('treatments.tabs.benefits')}</TabsTrigger>
          <TabsTrigger value="faq">{t('treatments.tabs.faq')}</TabsTrigger>
          <TabsTrigger value="testimonials">{t('treatments.tabs.testimonials')}</TabsTrigger>
          <TabsTrigger value="related">{t('treatments.tabs.related')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardContent className="pt-4">
              <h3 className="text-lg font-bold mb-2">{t(treatmentNameKey)}</h3>
              <p className="mb-4">{t(treatmentDescKey)}</p>
              <div className="mb-2">
                <b>{t('treatments.keyPoints')}</b>
                <ul className="ml-4 mt-1 list-disc">
                  {benefits.map((benefit, index) =>
                    benefit ? (
                      <li key={index}>{benefit}</li>
                    ) : null
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="procedure">
          <TreatmentProcedure treatmentType={treatmentType} />
        </TabsContent>
        
        <TabsContent value="benefits">
          <Card>
            <CardContent className="pt-4">
              <TreatmentBenefits benefits={benefits} showBooking={true} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq">
          <TreatmentFAQ treatmentType={treatmentType} />
        </TabsContent>
        
        <TabsContent value="testimonials">
          <TreatmentTestimonials treatmentType={treatmentType} />
        </TabsContent>
        
        <TabsContent value="related">
          <RelatedTreatments currentTreatment={treatmentType} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TreatmentTabs;
