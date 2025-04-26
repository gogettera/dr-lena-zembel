
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
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
  const location = useLocation();
  const { language } = useLanguage();
  
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
    
    // Extract any additional path information after the root
    const pathAfterRoot = location.pathname.replace(/^\/$/, '');
    
    // Sanitize any path components
    const sanitizedPath = sanitizePath(pathAfterRoot);
    const sanitizedSearch = location.search ? sanitizePath(location.search) : '';
    const sanitizedHash = location.hash ? sanitizePath(location.hash) : '';
    
    // Safely redirect to the language home page with path preservation
    const targetPath = `/${redirectLang}${sanitizedPath}${sanitizedSearch}${sanitizedHash}`;
    
    // Perform navigation
    navigate(targetPath, { replace: true });
  }, [navigate, location]);

  return null;
};

export default Index;
