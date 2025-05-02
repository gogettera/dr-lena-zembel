
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const SocialHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-dental-navy mb-2">
        {t('social.header.title', 'עקבו אחרינו')}
      </h2>
      <p className="text-dental-navy/70 text-lg">
        {t('social.header.subtitle', 'הישארו מעודכנים עם התכנים החדשים שלנו')}
      </p>
    </div>
  );
};

export default SocialHeader;
