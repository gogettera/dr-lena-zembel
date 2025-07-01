
import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo } from 'react';

export type PortraitStyle = 'main' | 'medical' | 'authority';

export function useDoctorPortrait() {
  const { t } = useLanguage();
  
  const portraitImages = useMemo(() => ({
    main: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg',
    medical: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg',
    authority: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg'
  }), []);
  
  const getDoctorPortraitPath = (style: PortraitStyle = 'main'): string => {
    return portraitImages[style];
  };
  
  const getDoctorName = (): string => {
    return t('doctorInfo.name', 'ד״ר לנה זמבל');
  };
  
  const getDoctorTitle = (): string => {
    return t('doctorInfo.title', 'רופאת שיניים מומחית');
  };
  
  return {
    getDoctorPortraitPath,
    getDoctorName,
    getDoctorTitle,
    portraitImages
  };
}
