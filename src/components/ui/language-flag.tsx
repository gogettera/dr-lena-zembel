
import React from 'react';
import { cn } from '@/lib/utils';
import { Language } from '@/types/language';

interface LanguageFlagProps {
  language: Language;
  size?: 'sm' | 'md';
  className?: string;
}

const flagUrls: Record<Language, string> = {
  he: 'https://flagcdn.com/il.svg',
  en: 'https://flagcdn.com/gb.svg',
  ru: 'https://flagcdn.com/ru.svg',
  de: 'https://flagcdn.com/de.svg',
  ar: 'https://flagcdn.com/sa.svg',
};

export function LanguageFlag({ language, size = 'sm', className }: LanguageFlagProps) {
  const dimensions = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  
  return (
    <img
      src={flagUrls[language]}
      alt={`${language} flag`}
      className={cn(
        dimensions,
        'rounded-sm object-cover border border-gray-200',
        className
      )}
    />
  );
}
