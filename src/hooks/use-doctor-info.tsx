
import { useLanguage } from '@/contexts/LanguageContext';
import { DoctorInfo, TreatmentArea } from '@/types/doctor';

export const useDoctorInfo = () => {
  const { t } = useLanguage();
  
  // Get the full doctor info object
  const getDoctorInfo = (): DoctorInfo => {
    try {
      // Parse the doctorInfo object from translations
      const doctorInfoString = t('doctorInfo');
      
      if (doctorInfoString && typeof doctorInfoString === 'object') {
        return doctorInfoString as unknown as DoctorInfo;
      }
      
      // If we couldn't get it as an object, try to parse it from JSON
      try {
        if (typeof doctorInfoString === 'string') {
          return JSON.parse(doctorInfoString) as DoctorInfo;
        }
      } catch (e) {
        console.error('Error parsing doctor info:', e);
      }
      
      // Fallback to accessing individual properties
      return {
        name: t('doctorInfo.name'),
        title: t('doctorInfo.title'),
        education: t('doctorInfo.education'),
        languages: t('doctorInfo.languages'),
        experience: t('doctorInfo.experience', '13 שנות ניסיון בתחום רפואת השיניים'),
        approach: t('doctorInfo.approach', 'גישה אישית ומקיפה לכל מטופל'),
        profileImage: t('doctorInfo.profileImage', '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg'),
        specialties: {},
        tags: {}
      };
    } catch (error) {
      console.error('Error in getDoctorInfo:', error);
      return {
        name: 'ד״ר לנה זמבל',
        title: 'רופאת שיניים מומחית',
        education: 'בוגרת הפקולטה לרפואת שיניים באוניברסיטת קלן, גרמניה',
        languages: 'עברית, גרמנית, אנגלית ורוסית',
        experience: '13 שנות ניסיון בתחום רפואת השיניים',
        approach: 'גישה אישית ומקיפה לכל מטופל',
        profileImage: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg',
        specialties: {},
        tags: {}
      };
    }
  };
  
  // Get doctor specialty info for a specific treatment area
  const getDoctorSpecialty = (treatmentArea: TreatmentArea) => {
    try {
      const doctorInfo = getDoctorInfo();
      return doctorInfo.specialties?.[treatmentArea] || {
        title: t(`doctorInfo.specialties.${treatmentArea}.title`, ''),
        description: t(`doctorInfo.specialties.${treatmentArea}.description`, '')
      };
    } catch (error) {
      console.error(`Error getting doctor specialty for ${treatmentArea}:`, error);
      return {
        title: '',
        description: ''
      };
    }
  };
  
  // Get tags for a specific treatment area
  const getDoctorTags = (treatmentArea: TreatmentArea): string[] => {
    try {
      const doctorInfo = getDoctorInfo();
      return doctorInfo.tags?.[treatmentArea] || 
        JSON.parse(t(`doctorInfo.tags.${treatmentArea}`, '[]'));
    } catch (error) {
      console.error(`Error getting doctor tags for ${treatmentArea}:`, error);
      return [];
    }
  };

  return {
    getDoctorInfo,
    getDoctorSpecialty,
    getDoctorTags
  };
};
