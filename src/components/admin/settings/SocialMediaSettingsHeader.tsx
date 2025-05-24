
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const SocialMediaSettingsHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{t('admin.settings.social.title')}</h2>
      <p className="text-gray-600">{t('admin.settings.social.description')}</p>
    </div>
  );
};

export default SocialMediaSettingsHeader;
