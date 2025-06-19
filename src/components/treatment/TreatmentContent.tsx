
import React, { Suspense } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TreatmentType } from '@/data/treatmentTypes';
import TreatmentTabs from './TreatmentTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { getResponsiveClasses } from '@/utils/responsiveUtils';
import { TranslatedText } from '@/components/ui/translated-text';
import { Phone, MessageCircle, Calendar, Loader2 } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';

interface TreatmentContentProps {
  treatment: TreatmentType;
  treatmentNameKey: string;
  treatmentDescKey: string;
  treatmentType: string;
}

const LoadingSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-8 bg-dental-beige/50 rounded-lg w-3/4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-dental-beige/50 rounded w-full"></div>
      <div className="h-4 bg-dental-beige/50 rounded w-5/6"></div>
      <div className="h-4 bg-dental-beige/50 rounded w-4/6"></div>
    </div>
    <div className="grid grid-cols-6 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-10 bg-dental-beige/50 rounded"></div>
      ))}
    </div>
  </div>
);

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <Card className="border-red-200 bg-red-50">
    <CardContent className="p-6 text-center">
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        <TranslatedText textKey="errors.loadingTreatment" defaultText="שגיאה בטעינת הטיפול" />
      </h3>
      <p className="text-red-600 mb-4">
        <TranslatedText textKey="errors.tryAgain" defaultText="אנא נסה שוב או צור קשר למרפאה" />
      </p>
      <Button onClick={resetErrorBoundary} variant="outline" size="sm">
        <TranslatedText textKey="common.tryAgain" defaultText="נסה שוב" />
      </Button>
    </CardContent>
  </Card>
);

const BookingCTA = () => {
  const { t } = useLanguage();
  
  const handleBooking = () => {
    const phone = "03-566-6915";
    const whatsapp = `https://wa.me/972515666915?text=${encodeURIComponent(t('whatsappMessage', 'שלום! אני מעוניין/ת לקבוע תור עם ד"ר לנה זמבל'))}`;
    
    if (window.innerWidth <= 768) {
      window.open(whatsapp, '_blank');
    } else {
      window.location.href = `tel:${phone}`;
    }
  };

  return (
    <Card className="bg-gradient-to-r from-dental-orange/5 to-dental-pink/5 border-dental-orange/20">
      <CardContent className="p-6 md:p-8 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-dental-navy mb-3">
          <TranslatedText textKey="readyToStart" defaultText="מוכנים להתחיל את הטיפול?" />
        </h3>
        <p className="text-dental-navy/70 mb-6 max-w-md mx-auto">
          <TranslatedText 
            textKey="treatments.booking.description" 
            defaultText="צרו קשר עוד היום לייעוץ מקצועי וללא התחייבות"
          />
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button 
            onClick={handleBooking}
            variant="orange" 
            size="lg" 
            className="w-full sm:w-auto rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            <Calendar className="h-5 w-5 mr-2 group-hover:animate-bounce" />
            <TranslatedText textKey="bookVisit" defaultText="קביעת תור" />
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => window.location.href = 'tel:03-566-6915'}
            >
              <Phone className="h-4 w-4 mr-1" />
              <span className="text-xs">03-566-6915</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => window.open('https://wa.me/972515666915', '_blank')}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">WhatsApp</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TreatmentContent: React.FC<TreatmentContentProps> = ({
  treatment,
  treatmentNameKey,
  treatmentDescKey,
  treatmentType
}) => {
  const { isRTL } = useLanguage();
  const responsive = getResponsiveClasses();

  if (!treatment) {
    return (
      <Section spacing="md" background="white">
        <ErrorFallback 
          error={new Error('Treatment not found')} 
          resetErrorBoundary={() => window.location.reload()} 
        />
      </Section>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-white">
      <Section spacing="md" background="white" maxWidth="xl" containerClass="px-4 md:px-6">
        {/* Enhanced intro card */}
        <Card className="mb-8 shadow-soft hover:shadow-md transition-all duration-300 border-dental-beige/50 bg-gradient-to-br from-white to-dental-beige/10">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-2 h-16 bg-gradient-to-b from-dental-orange to-dental-pink rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <TranslatedText
                  textKey={treatmentNameKey}
                  as="h2"
                  className={`${responsive.responsiveText.h3} mb-3 text-dental-navy font-bold leading-tight`}
                />
                <TranslatedText
                  textKey={treatmentDescKey}
                  as="p"
                  className={`${responsive.responsiveText.body} text-dental-navy/80 leading-relaxed`}
                />
              </div>
            </div>
            
            {/* Quick facts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-dental-beige/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-dental-orange">13+</div>
                <div className="text-sm text-dental-navy/70">שנות ניסיון</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dental-orange">5000+</div>
                <div className="text-sm text-dental-navy/70">מטופלים מרוצים</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dental-orange">4</div>
                <div className="text-sm text-dental-navy/70">שפות שירות</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Enhanced tabs with error boundary and loading */}
        <div className="max-w-7xl mx-auto space-y-8">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSkeleton />}>
              <TreatmentTabs 
                treatmentType={treatmentType}
                treatmentNameKey={treatmentNameKey}
                treatmentDescKey={treatmentDescKey}
              />
            </Suspense>
          </ErrorBoundary>
          
          {/* Enhanced booking CTA */}
          <div className="animate-fade-in">
            <BookingCTA />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default TreatmentContent;
