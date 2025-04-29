
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

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get browser language for potential selection
    const browserLang = navigator.language.split('-')[0];
    
    // Default to 'he' (Hebrew)
    let redirectLang = 'he';
    
    // Use user's preferred language from localStorage if available and supported
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && supportedLanguages.includes(storedLang as any)) {
      redirectLang = storedLang;
    }
    // If no stored language, check if browser language is supported
    else if (supportedLanguages.includes(browserLang as any)) {
      redirectLang = browserLang;
    }
    
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
