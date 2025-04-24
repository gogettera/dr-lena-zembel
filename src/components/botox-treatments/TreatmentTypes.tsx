
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/ui/section-header';
import { EnhancedImage } from '@/components/ui/enhanced-image';
import { Syringe } from 'lucide-react';
import { ListItem, ListItemText, ListItemIcon } from '@/components/ui/list';

const TreatmentTypes: React.FC = () => {
  const { t } = useLanguage();
  
  // Fix: Cast the result to string arrays
  const botoxAreas = t('botoxTreatments.botoxAreas', { returnObjects: true }) as string[];
  const hyaluronicAreas = t('botoxTreatments.hyaluronicAreas', { returnObjects: true }) as string[];

  return (
    <Container>
      <SectionHeader 
        title={t('treatments')} 
        subtitle={t('wideRangeOfTreatments')}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Botox Treatments */}
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-shadow">
          <div className="aspect-video overflow-hidden">
            <EnhancedImage
              src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
              alt={t('botoxTreatments.botoxTitle')}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              aspectRatio={16/9}
            />
          </div>
          
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Syringe className="w-5 h-5 text-dental-orange" />
              <CardTitle className="text-2xl">{t('botoxTreatments.botoxTitle')}</CardTitle>
            </div>
            <CardDescription className="text-lg font-normal">
              {t('botoxTreatments.botoxDesc')}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <h4 className="text-lg font-medium text-dental-navy mb-3">אזורי טיפול נפוצים:</h4>
            <ul className="space-y-2 mb-6">
              {botoxAreas.map((area, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <div className="w-6 h-6 bg-dental-orange/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-dental-orange">{index + 1}</span>
                    </div>
                  </ListItemIcon>
                  <ListItemText>{area}</ListItemText>
                </ListItem>
              ))}
            </ul>
            
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="rounded-full border-dental-navy text-dental-navy hover:bg-dental-navy/5">
                למידע נוסף
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Hyaluronic Acid Treatments */}
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-shadow">
          <div className="aspect-video overflow-hidden">
            <EnhancedImage
              src="/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg"
              alt={t('botoxTreatments.hyaluronicTitle')}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              aspectRatio={16/9}
            />
          </div>
          
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Syringe className="w-5 h-5 text-dental-orange" />
              <CardTitle className="text-2xl">{t('botoxTreatments.hyaluronicTitle')}</CardTitle>
            </div>
            <CardDescription className="text-lg font-normal">
              {t('botoxTreatments.hyaluronicDesc')}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <h4 className="text-lg font-medium text-dental-navy mb-3">אזורי טיפול נפוצים:</h4>
            <ul className="space-y-2 mb-6">
              {hyaluronicAreas.map((area, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <div className="w-6 h-6 bg-dental-orange/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-dental-orange">{index + 1}</span>
                    </div>
                  </ListItemIcon>
                  <ListItemText>{area}</ListItemText>
                </ListItem>
              ))}
            </ul>
            
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="rounded-full border-dental-navy text-dental-navy hover:bg-dental-navy/5">
                למידע נוסף
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default TreatmentTypes;
