
import { DoctorInfo, TreatmentArea } from '@/types/doctor';

/**
 * Helper function to safely access doctor information
 * @param doctorInfo The doctor information object
 * @param treatmentArea The specific treatment area
 * @returns The specialty information for the treatment area
 */
export const getDoctorSpecialtyInfo = (
  doctorInfo: DoctorInfo | null | undefined,
  treatmentArea: TreatmentArea
) => {
  if (!doctorInfo || !doctorInfo.specialties) {
    return {
      title: '',
      description: ''
    };
  }

  return doctorInfo.specialties[treatmentArea] || {
    title: '',
    description: ''
  };
};

/**
 * Helper function to safely access doctor tags
 * @param doctorInfo The doctor information object
 * @param treatmentArea The specific treatment area
 * @returns The tags for the treatment area
 */
export const getDoctorTagsInfo = (
  doctorInfo: DoctorInfo | null | undefined,
  treatmentArea: TreatmentArea
): string[] => {
  if (!doctorInfo || !doctorInfo.tags) {
    return [];
  }

  return doctorInfo.tags[treatmentArea] || [];
};
