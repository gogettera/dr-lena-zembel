
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/types/language';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const languageOptions: { value: Language; label: string; name: string }[] = [
  { value: 'he', label: 'עב', name: 'עברית' },
  { value: 'en', label: 'EN', name: 'English' },
  { value: 'ru', label: 'RU', name: 'Русский' },
  { value: 'de', label: 'DE', name: 'Deutsch' },
  { value: 'ar', label: 'ع', name: 'العربية' }
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
    
    // Preserve hash if exists
    const hash = location.hash;
    
    // Navigate to the same path but with new language prefix
    navigate(`/${newLanguage}${pathWithoutLanguage}${hash}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="px-2 hover:bg-dental-beige/20 transition-colors"
        >
          <span className="text-sm font-medium">{currentLanguage?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-24 bg-white">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(
              "flex items-center justify-between text-sm cursor-pointer",
              language === option.value ? 'bg-dental-beige/30 text-dental-navy font-medium' : 'text-dental-navy/80'
            )}
            onClick={() => handleLanguageChange(option.value)}
          >
            <span>{option.label}</span>
            <span className="text-xs opacity-70">{option.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
