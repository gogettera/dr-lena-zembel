
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const SocialHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
        {t('socialUpdates')}
      </h2>
      <p className="text-lg text-dental-navy/80 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
        {t('followUs')}
      </p>
      <div className="w-24 h-1 bg-dental-orange mx-auto mt-6 rounded-full opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]"></div>
    </div>
  );
};

export default SocialHeader;

