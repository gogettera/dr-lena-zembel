
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import TreatmentBenefits from './TreatmentBenefits';
import TreatmentFAQ from './TreatmentFAQ';
import TreatmentTestimonials from './TreatmentTestimonials';
import TreatmentProcedure from './TreatmentProcedure';
import RelatedTreatments from './RelatedTreatments';
import ChildrenDentistryLanding from '@/components/children-dentistry/ChildrenDentistryLanding';

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
  const { t } = useLanguage();

  // Special case: children-dentistry gets its own dedicated landing page
  if (treatmentType === "children-dentistry") {
    return <ChildrenDentistryLanding />;
  }

  // For all other treatments, use tab-based content
  const defaultBenefits = [
    t('benefit1'),
    t('benefit2'),
    t('benefit3'),
    t('benefit4')
  ];

  return (
    <Tabs defaultValue="overview" className="w-full mt-4">
      <TabsList className="flex flex-wrap mb-4 gap-2">
        <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
        <TabsTrigger value="procedure">{t('procedure')}</TabsTrigger>
        <TabsTrigger value="benefits">{t('benefits')}</TabsTrigger>
        <TabsTrigger value="faq">{t('faq')}</TabsTrigger>
        <TabsTrigger value="testimonials">{t('testimonials')}</TabsTrigger>
        <TabsTrigger value="related">{t('relatedTreatments')}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <Card>
          <CardContent className="pt-4">
            <h3 className="text-lg font-bold mb-2">{t(treatmentNameKey)}</h3>
            <p className="mb-4">{t(treatmentDescKey)}</p>
            <div className="mb-2">
              <b>{t('keyPoints')}</b>
              <ul className="ml-4 mt-1 list-disc">
                {defaultBenefits.map((benefit, index) =>
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
            <TreatmentBenefits benefits={defaultBenefits} showBooking={true} />
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
  );
};

export default TreatmentTabs;
