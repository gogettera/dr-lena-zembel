
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/types/language';
import { ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LanguageFlag } from '@/components/ui/language-flag';
import { supportedLanguages } from '@/utils/languageRoutes';

const languageOptions: { value: Language; label: string; name: string }[] = [
  { value: 'he', label: 'עברית', name: 'עברית' },
  { value: 'en', label: 'English', name: 'English' },
  { value: 'ru', label: 'Русский', name: 'Русский' },
  { value: 'de', label: 'Deutsch', name: 'Deutsch' },
  { value: 'ar', label: 'العربية', name: 'العربية' }
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLanguage: Language) => {
    try {
      // Avoid unnecessary state updates
      if (newLanguage === language) return;
      
      // Security check: validate language is supported
      if (!supportedLanguages.includes(newLanguage)) {
        console.error(`Attempted to switch to unsupported language: ${newLanguage}`);
        return;
      }
      
      // Set language in context
      setLanguage(newLanguage);
      
      // Extract path without language prefix for proper navigation
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const pathWithoutLanguage = pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : '/';
      const hash = location.hash;
      
      // Navigate to the same page with new language
      navigate(`/${newLanguage}${pathWithoutLanguage}${hash}`);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="px-2 py-1.5 hover:bg-gray-50 transition-colors text-sm font-normal gap-2"
          aria-label={`Current language: ${languageOptions.find(o => o.value === language)?.label || 'Unknown'}`}
        >
          <LanguageFlag language={language} />
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 bg-white border border-gray-100 shadow-md rounded-md p-1"
      >
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(
              "flex items-center justify-center text-sm cursor-pointer py-2 px-3",
              "hover:bg-gray-50 transition-colors",
              language === option.value 
                ? 'font-medium text-gray-900' 
                : 'text-gray-600'
            )}
            onClick={() => handleLanguageChange(option.value)}
            aria-label={`Switch to ${option.label}`}
          >
            <LanguageFlag language={option.value} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
