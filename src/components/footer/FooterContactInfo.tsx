
import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const FooterContactInfo = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-white mb-4">
        {t('contact.contactInfo')}
      </h4>
      <div className="space-y-4">
        <a 
          href="https://maps.app.goo.gl/qxrRjRQXFwKPuodw6" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-start gap-3 text-dental-beige hover:text-white transition-colors duration-300 group"
        >
          <MapPin className="h-5 w-5 shrink-0 mt-1 group-hover:text-dental-orange" />
          <span>{t('contact.clinicAddress')}</span>
        </a>
        <a 
          href="tel:03-566-6915"
          className="flex items-center gap-3 text-dental-beige hover:text-white transition-colors duration-300 group"
        >
          <Phone className="h-5 w-5 shrink-0 group-hover:text-dental-orange" />
          <span>{t('contact.phone')}</span>
        </a>
        <a 
          href="mailto:info@drlena.co.il"
          className="flex items-center gap-3 text-dental-beige hover:text-white transition-colors duration-300 group"
        >
          <Mail className="h-5 w-5 shrink-0 group-hover:text-dental-orange" />
          <span>info@drlena.co.il</span>
        </a>
        <div className="pt-2">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 shrink-0 text-dental-orange mt-1" />
            <div>
              <div className="font-semibold text-white">{t('contact.openingHours')}</div>
              <div className="text-dental-beige">{t('contact.sundayToThursday')}</div>
              <div className="text-dental-beige">{t('contact.friday')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContactInfo;
