
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
import { isRTLLanguage } from '@/utils/direction';
import { TranslatedText } from './ui/translated-text';

const languageOptions: { value: Language; label: string; name: string }[] = [
  { value: 'he', label: 'עברית', name: 'עברית' },
  { value: 'en', label: 'English', name: 'English' },
  { value: 'ru', label: 'Русский', name: 'Русский' },
  { value: 'de', label: 'Deutsch', name: 'Deutsch' },
  { value: 'ar', label: 'العربية', name: 'العربية' }
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
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
      
      // Log navigation intent
      console.log(`Switching language from ${language} to ${newLanguage}`);
      console.log(`Current path: ${location.pathname}, hash: ${location.hash}`);
      
      // Check if we're switching between RTL/LTR languages
      const isCurrentRTL = isRTLLanguage(language);
      const isTargetRTL = isRTLLanguage(newLanguage);
      const isDirectionChange = isCurrentRTL !== isTargetRTL;
      
      if (isDirectionChange) {
        console.log('Direction will change: ', isCurrentRTL ? 'RTL → LTR' : 'LTR → RTL');
      }
      
      // Set language in context
      setLanguage(newLanguage);
      
      // Extract path without language prefix for proper navigation
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const pathWithoutLanguage = pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : '/';
      const hash = location.hash;
      
      // Build the new URL
      const newUrl = `/${newLanguage}${pathWithoutLanguage}${hash}`;
      console.log(`Navigating to: ${newUrl}`);
      
      // Navigate to the same page with new language
      navigate(newUrl);
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
          data-testid="language-switcher-button"
        >
          <LanguageFlag language={language} />
          <ChevronDown className={cn("w-4 h-4 opacity-50", isRTL && "rotate-180")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={isRTL ? "start" : "end"}
        className="w-40 bg-white border border-gray-100 shadow-md rounded-md p-1"
        side={isRTL ? "right" : "bottom"}
      >
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(
              "flex items-center justify-between text-sm cursor-pointer py-2 px-3",
              "hover:bg-gray-50 transition-colors",
              language === option.value 
                ? 'font-medium text-gray-900' 
                : 'text-gray-600'
            )}
            onClick={() => handleLanguageChange(option.value)}
            aria-label={t('common.switchToLanguage', `Switch to ${option.label}`)}
            data-testid={`language-option-${option.value}`}
            dir={isRTLLanguage(option.value) ? 'rtl' : 'ltr'}
          >
            <LanguageFlag language={option.value} />
            <span className={isRTLLanguage(option.value) ? "mr-2" : "ml-2"}>
              {option.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
