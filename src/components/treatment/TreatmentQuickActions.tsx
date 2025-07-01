
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';

export const TreatmentQuickActions: React.FC = () => {
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
