
import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const languageOptions: { value: Language; label: string; flag: string }[] = [
  { value: 'he', label: 'עברית', flag: '🇮🇱' },
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'ru', label: 'Русский', flag: '🇷🇺' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { value: 'ar', label: 'العربية', flag: '🇸🇦' }
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const currentLanguage = languageOptions.find(option => option.value === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 px-2"
        >
          <Globe className="h-4 w-4" />
          <span className="ml-1 text-sm">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-white">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={`flex items-center gap-2 text-sm ${language === option.value ? 'bg-dental-beige/30' : ''}`}
            onClick={() => setLanguage(option.value)}
          >
            <span>{option.flag}</span>
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
