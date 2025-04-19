
import React, { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { setupDirectionByLanguage } from '@/utils/direction';

// List of supported languages
const supportedLanguages: Language[] = ['he', 'en', 'ru', 'de', 'ar'];

const LanguageRoute: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { language, setLanguage } = useLanguage();
  
  useEffect(() => {
    // If the URL language is valid and different from current language setting
    if (lang && supportedLanguages.includes(lang as Language) && lang !== language) {
      setLanguage(lang as Language);
    }
  }, [lang, language, setLanguage]);

  // If language is not supported, redirect to default language (Hebrew)
  if (lang && !supportedLanguages.includes(lang as Language)) {
    return <Navigate to="/he" replace />;
  }

  // Use Outlet to render the child routes
  return <Outlet />;
};

export default LanguageRoute;
