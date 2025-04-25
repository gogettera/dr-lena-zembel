
import React, { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/types/language';
import { setupDirectionByLanguage } from '@/utils/direction';

const LanguageRoute: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { language, setLanguage, availableLanguages } = useLanguage();
  
  useEffect(() => {
    // If the URL language parameter exists and is valid
    if (lang && availableLanguages.includes(lang as Language)) {
      // Only update if different from current language
      if (lang !== language) {
        console.log(`Setting language from URL param: ${lang}`);
        setLanguage(lang as Language);
      }
    }
  }, [lang, language, setLanguage, availableLanguages]);

  // If language is not supported, redirect to default language (Hebrew)
  if (lang && !availableLanguages.includes(lang as Language)) {
    console.log(`Unsupported language: ${lang}, redirecting to Hebrew`);
    return <Navigate to="/he" replace />;
  }

  // Use Outlet to render the child routes
  return <Outlet />;
};

export default LanguageRoute;
