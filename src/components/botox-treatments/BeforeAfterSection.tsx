
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { EnhancedImage } from '@/components/ui/enhanced-image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const BeforeAfterSection: React.FC = () => {
  const { t } = useLanguage();

  const beforeAfterImages = [
    {
      area: "שפתיים",
      before: "/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg",
      after: "/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg"
    },
    {
      area: "קמטי מצח",
      before: "/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg",
      after: "/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
    },
    {
      area: "קו הלסת",
      before: "/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg",
      after: "/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
    }
  ];

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.beforeAfterTitle')}
        subtitle="תוצאות אמיתיות של מטופלים שלנו"
      />
      
      <Tabs defaultValue={beforeAfterImages[0].area} className="mt-12">
        <TabsList className="w-full flex justify-center mb-8">
          {beforeAfterImages.map(image => (
            <TabsTrigger 
              key={image.area} 
              value={image.area}
              className="px-6 py-2 text-lg"
            >
              {image.area}
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
                    alt={`לפני טיפול ב${image.area}`}
                    aspectRatio={4/5}
                    className="w-full"
                    rounded="none"
                  />
                  <div className="absolute top-4 right-4 bg-dental-navy text-white px-4 py-2 rounded-full text-sm font-bold">
                    לפני
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-medium text-dental-navy">לפני הטיפול</h4>
                  <p className="text-dental-navy/70 mt-1">
                    {image.area === "שפתיים" ? "שפתיים דקות וחסרות נפח" : 
                     image.area === "קמטי מצח" ? "קמטים בולטים במצח" : 
                     "קו לסת פחות מוגדר"}
                  </p>
                </div>
              </Card>
              
              <Card className="overflow-hidden border-0 shadow-md rounded-2xl">
                <div className="relative">
                  <EnhancedImage
                    src={image.after}
                    alt={`אחרי טיפול ב${image.area}`}
                    aspectRatio={4/5}
                    className="w-full"
                    rounded="none"
                  />
                  <div className="absolute top-4 right-4 bg-dental-orange text-white px-4 py-2 rounded-full text-sm font-bold">
                    אחרי
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-medium text-dental-navy">אחרי הטיפול</h4>
                  <p className="text-dental-navy/70 mt-1">
                    {image.area === "שפתיים" ? "שפתיים מלאות ומוגדרות היטב" : 
                     image.area === "קמטי מצח" ? "מראה חלק וצעיר יותר" : 
                     "קו לסת מוגדר ומודגש יותר"}
                  </p>
                </div>
              </Card>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-dental-navy/60">
                * התוצאות עשויות להשתנות בין מטופלים שונים. התמונות להמחשה בלבד.
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  );
};

export default BeforeAfterSection;
