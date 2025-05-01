
import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo } from 'react';

export type PortraitStyle = 'main' | 'medical' | 'authority';

export function useDoctorPortrait() {
  const { t } = useLanguage();
  
  const portraitImages = useMemo(() => ({
    main: t('doctorInfo.profileImage', '/lovable-uploads/doctor-portrait-professional.png'),
    medical: t('doctorInfo.profileMedicalImage', '/lovable-uploads/doctor-portrait-stethoscope.png'),
    authority: t('doctorInfo.profileAuthorityImage', '/lovable-uploads/doctor-portrait-crossed-arms.png')
  }), [t]);
  
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
