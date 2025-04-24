
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
          className="px-3 py-2 hover:bg-dental-beige/20 transition-all duration-200 border-dental-navy/20 hover:border-dental-navy gap-2"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{currentLanguage?.label}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32 bg-white">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(
              "flex items-center justify-between text-sm cursor-pointer py-2.5 px-3 hover:bg-dental-beige/10 transition-colors",
              language === option.value ? 'bg-dental-beige/20 text-dental-navy font-medium' : 'text-dental-navy/80'
            )}
            onClick={() => handleLanguageChange(option.value)}
          >
            <span className="font-medium">{option.label}</span>
            <span className="text-xs opacity-70">{option.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
