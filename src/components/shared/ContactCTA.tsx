
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MessageCircle, Calendar, Clock } from 'lucide-react';

interface ContactCTAProps {
  variant?: 'default' | 'emergency' | 'booking' | 'minimal';
  title?: string;
  subtitle?: string;
  showHours?: boolean;
  className?: string;
}

const ContactCTA: React.FC<ContactCTAProps> = ({
  variant = 'default',
  title,
  subtitle,
  showHours = true,
  className = ''
}) => {
  const { t, language, isRTL } = useLanguage();

  const getWhatsAppLink = () => {
    const phone = "972535666915";
    const message = encodeURIComponent(t('common.whatsappMessage', 'שלום, אני מעוניין/ת לקבוע תור לטיפול'));
    return `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
  };

  const getPhoneLink = () => {
    return `tel:${language === 'he' ? '035666915' : '+972-3-566-6915'}`;
  };

  if (variant === 'emergency') {
    return (
      <Card className={`bg-red-50 border-red-200 ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-red-700 mb-2">
            {title || 'זקוקים לטיפול דחוף?'}
          </h3>
          <p className="text-red-600 mb-4">
            {subtitle || 'אנחנו זמינים למקרי חירום 24/7'}
          </p>
          <Button variant="destructive" size="lg" className="w-full" asChild>
            <a href={getPhoneLink()}>
              <Phone className="h-5 w-5 mr-2" />
              <TranslatedText textKey="common.callNow" defaultText="התקשרו עכשיו" />
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'booking') {
    return (
      <Card className={`bg-gradient-to-br from-dental-orange/10 to-dental-pink/10 border-dental-orange/20 ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="bg-dental-orange/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="h-8 w-8 text-dental-orange" />
          </div>
          <h3 className="text-2xl font-bold text-dental-navy mb-4">
            {title || 'מוכנים לקבוע תור?'}
          </h3>
          <p className="text-dental-navy/70 mb-6">
            {subtitle || 'אנו כאן לעזור לכם לקבל את הטיפול הטוב ביותר'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="orange" size="lg" className="w-full" asChild>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
            </Button>
            
            <Button variant="outline" size="lg" className="w-full border-dental-orange text-dental-orange hover:bg-dental-orange hover:text-white" asChild>
              <a href={getPhoneLink()}>
                <Phone className="h-5 w-5 mr-2" />
                <TranslatedText textKey="common.call" defaultText="התקשרו" />
              </a>
            </Button>
          </div>

          {showHours && (
            <div className="mt-6 p-4 bg-white/50 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-sm text-dental-navy/70 mb-2">
                <Clock className="h-4 w-4" />
                <span>שעות פעילות</span>
              </div>
              <div className="text-sm text-dental-navy/60">
                <p>ראשון-חמישי: 09:00-18:00</p>
                <p>שישי: 09:00-13:00 | שבת: סגור</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex flex-col sm:flex-row gap-4 justify-center ${className}`}>
        <Button variant="orange" size="lg" asChild>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp
          </a>
        </Button>
        
        <Button variant="outline" size="lg" asChild>
          <a href={getPhoneLink()}>
            <Phone className="h-5 w-5 mr-2" />
            <TranslatedText textKey="common.call" defaultText="התקשרו" />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <Card className={`bg-gradient-to-br from-dental-beige/30 to-white border-dental-orange/20 ${className}`}>
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold text-dental-navy mb-4">
          {title || <TranslatedText textKey="common.contactUs" defaultText="צרו קשר עכשיו" />}
        </h3>
        <p className="text-dental-navy/70 mb-6">
          {subtitle || <TranslatedText textKey="common.contactDescription" defaultText="נשמח לענות על כל שאלה ולעזור לכם" />}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button variant="orange" size="lg" className="w-full" asChild>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp
            </a>
          </Button>
          
          <Button variant="outline" size="lg" className="w-full border-dental-orange text-dental-orange hover:bg-dental-orange hover:text-white" asChild>
            <a href={getPhoneLink()}>
              <Phone className="h-5 w-5 mr-2" />
              03-566-6915
            </a>
          </Button>
        </div>

        {showHours && (
          <div className="text-sm text-dental-navy/60">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-4 w-4" />
              <span>שעות פעילות</span>
            </div>
            <p>ראשון-חמישי: 09:00-18:00 | שישי: 09:00-13:00</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactCTA;
