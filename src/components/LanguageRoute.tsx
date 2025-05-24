
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/types/language';

const LanguageRoute: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    console.log(`LanguageRoute effect - URL param: ${lang}, Context language: ${language}`);
    
    // If URL has a valid language parameter
    if (lang && availableLanguages.includes(lang as Language)) {
      // Only update context if it doesn't match URL
      if (lang !== language) {
        console.log(`Updating context language from ${language} to ${lang}`);
        setLanguage(lang as Language);
      } else {
        console.log(`Language already synchronized: ${lang}`);
      }
      setIsReady(true);
    } else if (lang && !availableLanguages.includes(lang as Language)) {
      // Invalid language in URL
      console.log(`Invalid language in URL: ${lang}`);
      setIsReady(true);
    } else {
      // No language in URL (shouldn't happen with our routing)
      console.log(`No language parameter in URL`);
      setIsReady(true);
    }
  }, [lang, language, setLanguage, availableLanguages]);

  // If language is not supported, redirect to default language (Hebrew)
  if (lang && !availableLanguages.includes(lang as Language)) {
    console.log(`Redirecting unsupported language ${lang} to Hebrew`);
    return <Navigate to="/he" replace />;
  }

  // Show loading while language is being synchronized
  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-t-2 border-dental-orange border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Use Outlet to render the child routes
  return <Outlet />;
};

export default LanguageRoute;
