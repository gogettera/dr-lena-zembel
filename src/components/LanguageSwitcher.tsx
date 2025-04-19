
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const languageOptions: { value: Language; label: string }[] = [
  { value: 'he', label: 'עב' },
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
  { value: 'de', label: 'DE' },
  { value: 'ar', label: 'ع' }
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLanguage = languageOptions.find(option => option.value === language);

  const handleLanguageChange = (newLanguage: Language) => {
    // Don't do anything if it's the same language
    if (newLanguage === language) return;
    
    // Set the language in context
    setLanguage(newLanguage);
    
    // Get the current path without the language prefix
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const pathWithoutLanguage = pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : '/';
    
    // Navigate to the same path but with new language prefix
    navigate(`/${newLanguage}${pathWithoutLanguage}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="px-2"
        >
          <span className="text-sm font-medium">{currentLanguage?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-20 bg-white">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={`flex items-center justify-center text-sm ${language === option.value ? 'bg-dental-beige/30' : ''}`}
            onClick={() => handleLanguageChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
