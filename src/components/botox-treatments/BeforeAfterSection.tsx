
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { EnhancedImage } from '@/components/ui/enhanced-image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useDirectionalStyles } from '@/utils/direction';

const BeforeAfterSection: React.FC = () => {
  const { t, language } = useLanguage();
  const dir = useDirectionalStyles();

  // For the treatment areas, these are specific areas that might not be in translations
  // So we define area names for each language
  const getAreaName = (areaKey: string, lang: string) => {
    const areas: Record<string, Record<string, string>> = {
      'lips': {
        'he': 'שפתיים',
        'en': 'Lips',
        'ru': 'Губы',
        'de': 'Lippen',
        'ar': 'الشفاه'
      },
      'forehead': {
        'he': 'קמטי מצח',
        'en': 'Forehead Wrinkles',
        'ru': 'Морщины на лбу',
        'de': 'Stirnfalten',
        'ar': 'تجاعيد الجبهة'
      },
      'jawline': {
        'he': 'קו הלסת',
        'en': 'Jawline',
        'ru': 'Линия подбородка',
        'de': 'Kieferlinie',
        'ar': 'خط الفك'
      }
    };
    
    return areas[areaKey]?.[lang] || areas[areaKey]?.['en'] || areaKey;
  };

  const getBeforeDescription = (areaKey: string, lang: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      'lips': {
        'he': 'שפתיים דקות וחסרות נפח',
        'en': 'Thin lips lacking volume',
        'ru': 'Тонкие губы, лишенные объема',
        'de': 'Dünne Lippen ohne Volumen',
        'ar': 'شفاه رقيقة تفتقر إلى الحجم'
      },
      'forehead': {
        'he': 'קמטים בולטים במצח',
        'en': 'Prominent forehead wrinkles',
        'ru': 'Заметные морщины на лбу',
        'de': 'Deutliche Stirnfalten',
        'ar': 'تجاعيد بارزة في الجبهة'
      },
      'jawline': {
        'he': 'קו לסת פחות מוגדר',
        'en': 'Less defined jawline',
        'ru': 'Менее выраженная линия подбородка',
        'de': 'Weniger definierte Kieferlinie',
        'ar': 'خط فك أقل تحديدًا'
      }
    };
    
    return descriptions[areaKey]?.[lang] || descriptions[areaKey]?.['en'] || '';
  };

  const getAfterDescription = (areaKey: string, lang: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      'lips': {
        'he': 'שפתיים מלאות ומוגדרות היטב',
        'en': 'Full and well-defined lips',
        'ru': 'Полные и четко очерченные губы',
        'de': 'Volle und gut definierte Lippen',
        'ar': 'شفاه ممتلئة ومحددة جيدًا'
      },
      'forehead': {
        'he': 'מראה חלק וצעיר יותר',
        'en': 'Smoother and younger appearance',
        'ru': 'Более гладкий и молодой вид',
        'de': 'Glatteres und jüngeres Aussehen',
        'ar': 'مظهر أكثر نعومة وشبابًا'
      },
      'jawline': {
        'he': 'קו לסת מוגדר ומודגש יותר',
        'en': 'More defined and enhanced jawline',
        'ru': 'Более четкая и выраженная линия подбородка',
        'de': 'Besser definierte und betonte Kieferlinie',
        'ar': 'خط فك أكثر تحديدًا وتعزيزًا'
      }
    };
    
    return descriptions[areaKey]?.[lang] || descriptions[areaKey]?.['en'] || '';
  };

  const beforeAfterImages = [
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

  // Get display name for each area based on current language
  const displayAreas = beforeAfterImages.map(img => ({
    ...img,
    displayName: getAreaName(img.area, language)
  }));

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.beforeAfterTitle')}
        subtitle={t('botoxTreatments.beforeAfterSubtitle')}
      />
      
      <Tabs defaultValue={displayAreas[0].area} className="mt-12">
        <TabsList className="w-full flex justify-center mb-8">
          {displayAreas.map(image => (
            <TabsTrigger 
              key={image.area} 
              value={image.area}
              className="px-6 py-2 text-lg"
            >
              {image.displayName}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {beforeAfterImages.map(image => (
          <TabsContent key={image.area} value={image.area}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="overflow-hidden border-0 shadow-md rounded-2xl">
                <div className="relative">
                  <EnhancedImage
                    src={image.before}
                    alt={`${t('before')} ${getAreaName(image.area, language)}`}
                    aspectRatio={4/5}
                    className="w-full"
                    rounded="none"
                  />
                  <div className={`absolute top-4 ${dir.right} bg-dental-navy text-white px-4 py-2 rounded-full text-sm font-bold`}>
                    {t('before')}
                  </div>
                </div>
                
                <div className={`p-4 ${dir.textAlign}`}>
                  <h4 className="text-lg font-medium text-dental-navy">{t('beforeTreatment')}</h4>
                  <p className="text-dental-navy/70 mt-1">
                    {getBeforeDescription(image.area, language)}
                  </p>
                </div>
              </Card>
              
              <Card className="overflow-hidden border-0 shadow-md rounded-2xl">
                <div className="relative">
                  <EnhancedImage
                    src={image.after}
                    alt={`${t('after')} ${getAreaName(image.area, language)}`}
                    aspectRatio={4/5}
                    className="w-full"
                    rounded="none"
                  />
                  <div className={`absolute top-4 ${dir.right} bg-dental-orange text-white px-4 py-2 rounded-full text-sm font-bold`}>
                    {t('after')}
                  </div>
                </div>
                
                <div className={`p-4 ${dir.textAlign}`}>
                  <h4 className="text-lg font-medium text-dental-navy">{t('afterTreatment')}</h4>
                  <p className="text-dental-navy/70 mt-1">
                    {getAfterDescription(image.area, language)}
                  </p>
                </div>
              </Card>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-dental-navy/60">
                * {t('resultsMayVary')}
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  );
};

export default BeforeAfterSection;
