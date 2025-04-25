
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { EnhancedImage } from '@/components/ui/enhanced-image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useDirectionalStyles } from '@/utils/direction';

interface BeforeAfterArea {
  name: string;
  before: string;
  after: string;
}

interface BeforeAfterImage {
  area: string;
  before: string;
  after: string;
}

const BeforeAfterSection: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const dir = useDirectionalStyles();

  // Get translation data for areas
  const beforeAfterTranslations = t('botoxTreatments.beforeAfter', { returnObjects: true });
  const areasTranslations = beforeAfterTranslations.areas;
  
  // Transform the areas object to the format we need
  const areasData = Object.keys(areasTranslations).map(key => ({
    area: key,
    name: areasTranslations[key].name,
    beforeDesc: areasTranslations[key].before,
    afterDesc: areasTranslations[key].after
  }));

  const beforeAfterImages: BeforeAfterImage[] = [
    {
      area: 'lips',
      before: "/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg",
      after: "/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg"
    },
    {
      area: 'forehead',
      before: "/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg",
      after: "/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
    },
    {
      area: 'jawline',
      before: "/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg",
      after: "/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
    }
  ];

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.beforeAfterTitle')}
        subtitle={t('botoxTreatments.beforeAfterSubtitle')}
      />
      
      <Tabs defaultValue={beforeAfterImages[0].area} className="mt-12">
        <TabsList className="w-full flex justify-center mb-8">
          {areasData.map(area => (
            <TabsTrigger 
              key={area.area} 
              value={area.area}
              className="px-6 py-2 text-lg"
            >
              {area.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {beforeAfterImages.map(image => {
          // Find the corresponding area data
          const areaData = areasData.find(a => a.area === image.area);
          
          return (
            <TabsContent key={image.area} value={image.area}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="overflow-hidden border-0 shadow-md rounded-2xl">
                  <div className="relative">
                    <EnhancedImage
                      src={image.before}
                      alt={`${t('botoxTreatments.beforeAfter.before')} ${areaData?.name || ''}`}
                      aspectRatio={4/5}
                      className="w-full"
                      rounded="none"
                    />
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-dental-navy text-white px-4 py-2 rounded-full text-sm font-bold`}>
                      {t('botoxTreatments.beforeAfter.before')}
                    </div>
                  </div>
                  
                  <div className={`p-4 ${dir.textAlign}`}>
                    <h4 className="text-lg font-medium text-dental-navy">{t('botoxTreatments.beforeAfter.beforeTreatment')}</h4>
                    <p className="text-dental-navy/70 mt-1">
                      {areaData?.beforeDesc || ''}
                    </p>
                  </div>
                </Card>
                
                <Card className="overflow-hidden border-0 shadow-md rounded-2xl">
                  <div className="relative">
                    <EnhancedImage
                      src={image.after}
                      alt={`${t('botoxTreatments.beforeAfter.after')} ${areaData?.name || ''}`}
                      aspectRatio={4/5}
                      className="w-full"
                      rounded="none"
                    />
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-dental-orange text-white px-4 py-2 rounded-full text-sm font-bold`}>
                      {t('botoxTreatments.beforeAfter.after')}
                    </div>
                  </div>
                  
                  <div className={`p-4 ${dir.textAlign}`}>
                    <h4 className="text-lg font-medium text-dental-navy">{t('botoxTreatments.beforeAfter.afterTreatment')}</h4>
                    <p className="text-dental-navy/70 mt-1">
                      {areaData?.afterDesc || ''}
                    </p>
                  </div>
                </Card>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-dental-navy/60">
                  * {t('botoxTreatments.beforeAfter.resultsMayVary')}
                </p>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </Container>
  );
};

export default BeforeAfterSection;
