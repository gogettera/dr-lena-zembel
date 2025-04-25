
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useDirectionalStyles } from '@/utils/direction';

const BookingSection: React.FC = () => {
  const { t } = useLanguage();
  const dir = useDirectionalStyles();

  return (
    <Container>
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          {t('botoxTreatments.readyToStart')}
        </h2>
        
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
          {t('botoxTreatments.contactCallout')}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]">
          <Button 
            size="lg" 
            className="bg-dental-orange hover:bg-dental-orange/90 text-white rounded-full text-lg px-8 py-6"
          >
            {t('bookVisit')}
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 rounded-full text-lg px-8 py-6"
          >
            03-566-6915
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto opacity-0 animate-[fade-in_0.5s_ease-out_0.7s_forwards]">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-3">{t('botoxTreatments.clinicLocation')}</h3>
            <p className="text-white/80">{t('address')}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-3">{t('botoxTreatments.openingHours')}</h3>
            <p className="text-white/80">{t('sundayToThursday')}: 8:30-14:00</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-3">{t('botoxTreatments.contactDetails')}</h3>
            <p className="text-white/80">
              {t('contactUs')}: 03-566-6915<br />
              WhatsApp: 051-566-6915
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookingSection;
