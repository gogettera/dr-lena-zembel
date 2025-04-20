
import { useMemo } from 'react';
import en from '@/translations/en.json';
import he from '@/translations/he.json';
import de from '@/translations/de.json';
import ru from '@/translations/ru.json';
import ar from '@/translations/ar.json';
import { translationMetadata } from '@/config/translationMetadata';
import { Translation } from './types';

export const useTranslations = () => {
  const translations: Translation[] = useMemo(() => {
    const allKeys = new Set([
      ...Object.keys(en || {}),
      ...Object.keys(he || {}),
      ...Object.keys(de || {}),
      ...Object.keys(ru || {}),
      ...Object.keys(ar || {})
    ]);
    
    return Array.from(allKeys).map(key => ({
      key,
      en: (en as any)[key] || '',
      he: (he as any)[key] || '',
      de: (de as any)[key] || '',
      ru: (ru as any)[key] || '',
      ar: (ar as any)[key] || '',
      maxLength: translationMetadata[key]?.maxLength || 0,
      location: translationMetadata[key]?.location || 'Unknown'
    }));
  }, []);

  return translations;
};
