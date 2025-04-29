
export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface TreatmentComparisonFeature {
  name: string;
  botox: string;
  hyaluronic: string;
}

export interface TreatmentComparison {
  title: string;
  botoxTitle: string;
  hyaluronicTitle: string;
  features: TreatmentComparisonFeature[];
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  treatment: string;
}

export interface BotoxTreatmentsTranslations {
  headline1: string;
  headline2: string;
  mobileFactoid: string;
  mobileTip: string;
  botoxTitle: string;
  hyaluronicTitle: string;
  botoxDesc: string;
  hyaluronicDesc: string;
  benefitsTitle: string;
  benefitsSubtitle: string;
  processTitle: string;
  processSubtitle: string;
  beforeAfterTitle: string;
  beforeAfterSubtitle: string;
  doctorTitle: string;
  safetyTitle: string;
  safetySubtitle: string;
  pricingTitle: string;
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  faqTitle: string;
  faqSubtitle: string;
  faqCallout: string;
  comparisonTitle: string;
  callUs: string;
  bookAppointment: string;
  commonTreatmentAreas: string;
  moreInfo: string;
  newInClinic: string;
  yearsExperience: string;
  satisfiedPatients: string;
  treatmentSpeed: string;
  recoveryTime: string;
  monthsEffect: string;
  quickTreatments: string;
  noDowntime: string;
  longLastingResults: string;
  treatmentApproach: string;
  certifications: string;
  clinicLocation: string;
  openingHours: string;
  contactDetails: string;
  readFullReview: string;
  benefits: string[];
  botoxAreas: string[];
  hyaluronicAreas: string[];
  processSteps: ProcessStep[];
  safetyConcerns: string[];
  faqItems: FAQItem[];
  contactCallout: string;
  bookingButtonText: string;
  readyToStart: string;
  testimonials: Testimonial[];
  treatmentComparison: TreatmentComparison;
  doctor: {
    name: string;
    title: string;
    education: string;
    specialization: string;
    approach: string;
    approachQuote: string;
  };
  safetyCommitment: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  certificationsList: string[];
  languages: {
    hebrew: string;
    english: string;
    russian: string;
    german: string;
  };
  beforeAfter: any; // We can define this more specifically if needed
}
