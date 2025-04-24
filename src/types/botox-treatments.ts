
/**
 * ProcessStep - Represents a single step in a treatment process
 */
export interface ProcessStep {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
}

/**
 * TreatmentBenefit - Represents a benefit of a treatment
 */
export interface TreatmentBenefit {
  title: string;
  description?: string;
  icon?: string;
}

/**
 * FAQItem - Represents a frequently asked question
 */
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

/**
 * TreatmentType - Represents a specific treatment type
 */
export interface TreatmentType {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  benefits?: string[];
  isPopular?: boolean;
  duration?: string;
}

/**
 * Comparison object for comparing different treatment options
 */
export interface TreatmentComparison {
  criteria: string[];
  treatments: {
    name: string;
    values: string[];
  }[];
}

/**
 * Patient testimonial for a treatment
 */
export interface Testimonial {
  id: string;
  name: string;
  age?: number;
  text: string;
  rating: number;
  imageUrl?: string;
  date?: string;
  treatmentType?: string;
}

/**
 * Before/After image pair
 */
export interface BeforeAfterPair {
  id: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
  treatmentType: string;
  patientAge?: number;
}

/**
 * Safety information for treatments
 */
export interface SafetyInfo {
  title: string;
  description: string;
  icon?: string;
}

/**
 * Doctor information
 */
export interface DoctorInfo {
  name: string;
  title: string;
  qualifications: string[];
  imageUrl: string;
  specialties: string[];
  experience: string;
  languages: string[];
  bio: string;
}
