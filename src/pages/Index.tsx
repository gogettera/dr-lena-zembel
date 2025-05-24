
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supportedLanguages } from '@/utils/languageRoutes';

// Sanitize paths to prevent open redirect vulnerabilities
const sanitizePath = (path: string): string => {
  // Only allow relative paths (no protocols or domains)
  if (path.match(/^(https?:)?\/\//i)) {
    return '/';
  }
  
  // Remove any null bytes or other potentially dangerous characters
  return path.replace(/[^\w\s\-._~:/?#[\]@!$&'()*+,;=]/g, '');
};

// Get language from current URL
const getCurrentLanguageFromURL = (): string | null => {
  const pathname = window.location.pathname;
  const pathLang = pathname.split('/')[1];
  
  if (pathLang && supportedLanguages.includes(pathLang as any)) {
    console.log(`Current URL language: ${pathLang}`);
    return pathLang;
  }
  
  return null;
};

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('Index component mounted, determining redirect language');
    
    // Check if we're already on a language route
    const currentUrlLang = getCurrentLanguageFromURL();
    if (currentUrlLang) {
      console.log(`Already on language route: ${currentUrlLang}, no redirect needed`);
      return;
    }
    
    // Get browser language for potential selection
    const browserLang = navigator.language.split('-')[0];
    console.log(`Browser language: ${browserLang}`);
    
    // Default to 'he' (Hebrew)
    let redirectLang = 'he';
    
    // Use user's preferred language from localStorage if available and supported
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && supportedLanguages.includes(storedLang as any)) {
      redirectLang = storedLang;
      console.log(`Using stored language: ${redirectLang}`);
    }
    // If no stored language, check if browser language is supported
    else if (supportedLanguages.includes(browserLang as any)) {
      redirectLang = browserLang;
      console.log(`Using browser language: ${redirectLang}`);
    }
    
    console.log(`Redirecting to: /${redirectLang}`);
    
    // Perform navigation to language home page
    navigate(`/${redirectLang}`, { replace: true });
  }, [navigate]);

  // Return loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-t-4 border-dental-orange border-solid rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
