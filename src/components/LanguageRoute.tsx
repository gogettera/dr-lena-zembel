
import React, { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/types/language';
import { setupDirectionByLanguage } from '@/utils/direction';

const LanguageRoute: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { language, setLanguage, availableLanguages } = useLanguage();
  
  useEffect(() => {
    // If the URL language is valid and different from current language setting
    if (lang && availableLanguages.includes(lang as Language) && lang !== language) {
      setLanguage(lang as Language);
    }
  }, [lang, language, setLanguage, availableLanguages]);

  // If language is not supported, redirect to default language (Hebrew)
  if (lang && !availableLanguages.includes(lang as Language)) {
    return <Navigate to="/he" replace />;
  }

  // Use Outlet to render the child routes
  return <Outlet />;
};

export default LanguageRoute;
