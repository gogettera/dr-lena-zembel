
import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FooterContactInfo = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-5">
      <h4 className="text-xl font-bold text-white mb-3">
        {t('contact.contactInfo', 'פרטי התקשרות')}
      </h4>
      <div className="flex flex-col gap-3 text-dental-beige">
        <a
          href="https://maps.app.goo.gl/qxrRjRQXFwKPuodw6"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 underline hover:text-dental-orange transition-colors"
        >
          <MapPin className="h-5 w-5 shrink-0" />
          <span className="text-sm">{t('contact.clinicAddress')}</span>
        </a>
        <a
          href="tel:03-566-6915"
          className="flex items-center gap-2 underline hover:text-dental-orange transition-colors"
        >
          <Phone className="h-5 w-5 shrink-0" />
          <span className="text-sm" dir="ltr">03-566-6915</span>
        </a>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 shrink-0" />
          <div>
            <p className="text-sm text-white">{t('contact.openingHours')}</p>
            <p className="text-xs text-dental-beige">{t('contact.sundayToThursday')}</p>
            <p className="text-xs text-dental-beige">{t('contact.friday')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContactInfo;
