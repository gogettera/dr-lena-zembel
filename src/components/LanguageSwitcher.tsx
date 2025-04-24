
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/types/language';
import { Globe, ChevronDown } from 'lucide-react';
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
    if (newLanguage === language) return;
    setLanguage(newLanguage);
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const pathWithoutLanguage = pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : '/';
    const hash = location.hash;
    navigate(`/${newLanguage}${pathWithoutLanguage}${hash}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="px-4 py-2.5 hover:bg-dental-beige/20 transition-all duration-300 border-dental-navy/30 hover:border-dental-navy hover:scale-105 gap-2.5 rounded-lg"
        >
          <Globe className="w-[18px] h-[18px]" />
          <span className="text-base font-medium">{currentLanguage?.label}</span>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white/95 backdrop-blur-sm border border-dental-navy/10 shadow-lg rounded-lg p-1 animate-in fade-in-0 zoom-in-95"
      >
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(
              "flex items-center justify-between text-base cursor-pointer py-3 px-4",
              "hover:bg-dental-beige/20 transition-colors duration-200",
              "rounded-md my-0.5",
              language === option.value 
                ? 'bg-dental-beige/30 text-dental-navy font-medium' 
                : 'text-dental-navy/70 hover:text-dental-navy'
            )}
            onClick={() => handleLanguageChange(option.value)}
          >
            <span className="font-medium text-base">{option.label}</span>
            <span className="text-sm opacity-80">{option.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
