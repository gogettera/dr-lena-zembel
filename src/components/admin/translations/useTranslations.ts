
import { useMemo, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import en from '@/translations/en.json';
import he from '@/translations/he.json';
import de from '@/translations/de.json';
import ru from '@/translations/ru.json';
import ar from '@/translations/ar.json';
import { translationMetadata } from '@/config/translationMetadata';
import { Translation } from './types';

export const useTranslations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const translations: Translation[] = useMemo(() => {
    try {
      const allKeys = new Set([
        ...Object.keys(en || {}),
        ...Object.keys(he || {}),
        ...Object.keys(de || {}),
        ...Object.keys(ru || {}),
        ...Object.keys(ar || {})
      ]);
      
      setIsLoading(false);
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
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error loading translations",
        description: "There was a problem loading the translations. Please try again.",
        variant: "destructive"
      });
      return [];
    }
  }, [toast]);

  return { translations, isLoading };
};
