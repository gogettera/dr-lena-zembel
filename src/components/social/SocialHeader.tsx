
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';

const SocialHeader = () => {
  return (
    <div className="text-center mb-10">
      <TranslatedText
        textKey="social.updatesFromPractice"
        defaultText="Updates From Our Practice"
        as="h2" 
        className="text-3xl md:text-4xl font-bold text-dental-navy mb-4"
      />
      <TranslatedText
        textKey="social.followOnFacebook"
        defaultText="Follow us on Facebook for regular updates"
        as="p" 
        className="text-lg text-dental-navy/70 max-w-3xl mx-auto"
      />
    </div>
  );
};

export default SocialHeader;
