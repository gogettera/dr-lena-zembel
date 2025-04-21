import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import TreatmentBenefits from './TreatmentBenefits';
import TreatmentFAQ from './TreatmentFAQ';
import TreatmentTestimonials from './TreatmentTestimonials';
import TreatmentProcedure from './TreatmentProcedure';
import RelatedTreatments from './RelatedTreatments';
import { Check } from 'lucide-react';

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

  // Render the custom landing page if this is the children dentistry route
  if (treatmentType === "children-dentistry") {
    return <ChildrenDentistryLanding />;
  }

  const defaultBenefits = [
    t('benefit1'),
    t('benefit2'),
    t('benefit3'),
    t('benefit4')
  ];

  return (
    <Tabs defaultValue="overview" className="w-full mt-8">
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
        <TabsTrigger value="procedure">{t('procedure')}</TabsTrigger>
        <TabsTrigger value="faq">{t('faq')}</TabsTrigger>
        <TabsTrigger value="testimonials">{t('testimonials')}</TabsTrigger>
        <TabsTrigger value="related">{t('relatedTreatments')}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-dental-navy mb-4">
                  {t(treatmentNameKey)}
                </h3>
                <p className="text-dental-navy/80 mb-6">
                  {t(treatmentDescKey)}
                </p>
                <p className="text-dental-navy/80 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui. Curabitur et odio vel orci scelerisque malesuada.
                </p>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-dental-navy mb-2">
                    {t('keyPoints')}
                  </h4>
                  <ul className="space-y-2">
                    {defaultBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-dental-pink/20 p-1 rounded-full mr-2 mt-0.5">
                          <Check className="h-4 w-4 text-dental-orange" />
                        </span>
                        <span className="text-dental-navy/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <img 
                  src={`/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg`} 
                  alt={t(treatmentNameKey)} 
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
                <div className="mt-6 bg-dental-beige/20 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-dental-navy mb-2">
                    {t('idealFor')}
                  </h4>
                  <p className="text-dental-navy/80">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-dental-beige pt-6">
              <TreatmentBenefits benefits={defaultBenefits} showBooking={false} />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="procedure">
        <TreatmentProcedure treatmentType={treatmentType} />
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
