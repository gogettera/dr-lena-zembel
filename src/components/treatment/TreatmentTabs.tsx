
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import TreatmentBenefits from './TreatmentBenefits';
import TreatmentProcedure from './TreatmentProcedure';
import TreatmentTestimonials from './TreatmentTestimonials';
import TreatmentFAQ from './TreatmentFAQ';
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
  const { t } = useLanguage();
  
  return (
    <Tabs defaultValue="benefits" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-10 bg-transparent gap-2">
        <TabsTrigger 
          value="benefits" 
          className="bg-white shadow-sm border border-dental-beige/30 hover:bg-dental-beige/10 data-[state=active]:bg-dental-orange data-[state=active]:text-white rounded-lg"
        >
          {t('benefits')}
        </TabsTrigger>
        <TabsTrigger 
          value="procedure" 
          className="bg-white shadow-sm border border-dental-beige/30 hover:bg-dental-beige/10 data-[state=active]:bg-dental-orange data-[state=active]:text-white rounded-lg"
        >
          {t('procedure')}
        </TabsTrigger>
        <TabsTrigger 
          value="testimonials" 
          className="bg-white shadow-sm border border-dental-beige/30 hover:bg-dental-beige/10 data-[state=active]:bg-dental-orange data-[state=active]:text-white rounded-lg"
        >
          {t('testimonials')}
        </TabsTrigger>
        <TabsTrigger 
          value="faq" 
          className="bg-white shadow-sm border border-dental-beige/30 hover:bg-dental-beige/10 data-[state=active]:bg-dental-orange data-[state=active]:text-white rounded-lg"
        >
          {t('faq')}
        </TabsTrigger>
        <TabsTrigger 
          value="related" 
          className="bg-white shadow-sm border border-dental-beige/30 hover:bg-dental-beige/10 data-[state=active]:bg-dental-orange data-[state=active]:text-white rounded-lg"
        >
          {t('related')}
        </TabsTrigger>
      </TabsList>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-dental-beige/50 shadow-lg">
        <TabsContent value="benefits" className="mt-0">
          <TreatmentBenefits treatmentType={treatmentType} />
        </TabsContent>
        
        <TabsContent value="procedure" className="mt-0">
          <TreatmentProcedure treatmentType={treatmentType} />
        </TabsContent>
        
        <TabsContent value="testimonials" className="mt-0">
          <TreatmentTestimonials treatmentType={treatmentType} />
        </TabsContent>
        
        <TabsContent value="faq" className="mt-0">
          <TreatmentFAQ treatmentType={treatmentType} />
        </TabsContent>
        
        <TabsContent value="related" className="mt-0">
          <RelatedTreatments currentTreatment={treatmentType} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TreatmentTabs;
