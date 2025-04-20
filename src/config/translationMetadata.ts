type TranslationMeta = {
  maxLength: number;
  location: string;
};

type TranslationMetadataType = {
  [key: string]: TranslationMeta;
};

export const translationMetadata: TranslationMetadataType = {
  // Navigation items
  home: { maxLength: 20, location: "Navigation" },
  about: { maxLength: 20, location: "Navigation" },
  treatments: { maxLength: 30, location: "Navigation" },
  contact: { maxLength: 20, location: "Navigation" },
  practice: { maxLength: 30, location: "Navigation" },
  team: { maxLength: 20, location: "Navigation" },
  patients: { maxLength: 30, location: "Navigation" },
  
  // Page headers and descriptions
  testimonials: { maxLength: 50, location: "Reviews Page" },
  patientsExperiences: { maxLength: 100, location: "Reviews Page" },
  ourTreatments: { maxLength: 50, location: "Treatments Page" },
  wideRangeOfTreatments: { maxLength: 100, location: "Treatments Page" },
  updatesFromPractice: { maxLength: 50, location: "Home Page" },
  
  // Social section
  followOnFacebook: { maxLength: 80, location: "Social Section" },
  followOnFacebookButton: { maxLength: 30, location: "Social Section" },
  
  // Hero section
  dentistryWithLove: { maxLength: 60, location: "Home Page Hero" },
  localDental: { maxLength: 200, location: "Home Page Hero" },
  
  // Call to action buttons
  bookVisit: { maxLength: 30, location: "Call to Action" },
  moreDetails: { maxLength: 30, location: "Common UI" },
  bookNow: { maxLength: 20, location: "Call to Action" },
  
  // Features and benefits
  completelyHappy: { maxLength: 50, location: "Home Page" },
  newLook: { maxLength: 50, location: "Home Page" },
  practiceFresh: { maxLength: 200, location: "About Section" },
  experiencedDoctors: { maxLength: 50, location: "Features Section" },
  advancedEquipment: { maxLength: 50, location: "Features Section" },
  shortWaits: { maxLength: 50, location: "Features Section" },
  
  // Treatment types
  childrenDentistry: { maxLength: 30, location: "Services" },
  childrenDentistryDesc: { maxLength: 150, location: "Services" },
  aestheticTreatments: { maxLength: 30, location: "Services" },
  aestheticTreatmentsDesc: { maxLength: 150, location: "Services" },
  preventiveMedicine: { maxLength: 30, location: "Services" },
  preventiveMedicineDesc: { maxLength: 150, location: "Services" },
  rootCanal: { maxLength: 30, location: "Services" },
  rootCanalDesc: { maxLength: 150, location: "Services" },
  oralRehabilitation: { maxLength: 30, location: "Services" },
  oralRehabilitationDesc: { maxLength: 150, location: "Services" },
  orthodontics: { maxLength: 30, location: "Services" },
  orthodonticsDesc: { maxLength: 150, location: "Services" },
  
  // Common UI elements
  learnMore: { maxLength: 20, location: "Common UI" },
  
  // Business information
  openingHours: { maxLength: 30, location: "Business Hours" },
  sundayToThursday: { maxLength: 40, location: "Business Hours" },
  friday: { maxLength: 30, location: "Business Hours" },
  clinicAddress: { maxLength: 100, location: "Contact Information" },
  contactInfo: { maxLength: 30, location: "Contact Information" },
  allRightsReserved: { maxLength: 50, location: "Footer" },
  
  // SEO and descriptions
  clinicDescription: { maxLength: 100, location: "SEO" },
  
  // Video section
  watchOurClinic: { maxLength: 50, location: "Video Section" },
  clinicTourDescription: { maxLength: 100, location: "Video Section" },
  clinicTourVideo: { maxLength: 50, location: "Video Section" },
  
  // Doctor profile
  doctorName: { maxLength: 30, location: "Doctor Profile" },
  doctorEducation: { maxLength: 150, location: "Doctor Profile" },
  doctorTreatments: { maxLength: 200, location: "Doctor Profile" },
  doctorApproach: { maxLength: 200, location: "Doctor Profile" },
  doctorPhilosophy: { maxLength: 200, location: "Doctor Profile" },
  
  // Treatment page sections
  overview: { maxLength: 30, location: "Treatment Page" },
  procedure: { maxLength: 30, location: "Treatment Page" },
  faq: { maxLength: 20, location: "Treatment Page" },
  relatedTreatments: { maxLength: 30, location: "Treatment Page" },
  keyPoints: { maxLength: 30, location: "Treatment Page" },
  idealFor: { maxLength: 30, location: "Treatment Page" },
  otherTreatmentsYouMightLike: { maxLength: 50, location: "Treatment Page" },
  procedureDetails: { maxLength: 50, location: "Treatment Page" },
  afterProcedure: { maxLength: 50, location: "Treatment Page" },
  frequentlyAskedQuestions: { maxLength: 50, location: "FAQ Section" },
  faqDescription: { maxLength: 100, location: "FAQ Section" },
  patientExperiences: { maxLength: 50, location: "Reviews Section" },
  readyToStart: { maxLength: 50, location: "Call to Action" },
  treatmentNotFound: { maxLength: 30, location: "Error Messages" },
  backToHome: { maxLength: 30, location: "Navigation" },
  readFullReview: { maxLength: 30, location: "Reviews" },

  // Values and policies
  transparency: { maxLength: 100, location: "Doctor Values" },
  xrayPolicy: { maxLength: 100, location: "Doctor Values" },
  treatmentOptions: { maxLength: 100, location: "Doctor Values" },
  
  // Clinic Information
  "clinicInfo.name": { maxLength: 50, location: "Global" },
  "clinicInfo.address": { maxLength: 100, location: "Contact Information" },
  "clinicInfo.phone": { maxLength: 20, location: "Contact Information" },
  "clinicInfo.hours.weekdays": { maxLength: 50, location: "Business Hours" },
  "clinicInfo.hours.friday": { maxLength: 30, location: "Business Hours" },
  
  // Doctor Information
  "doctorInfo.name": { maxLength: 30, location: "Doctor Profile" },
  "doctorInfo.title": { maxLength: 30, location: "Doctor Profile" },
  "doctorInfo.education": { maxLength: 100, location: "Doctor Profile" },
  "doctorInfo.languages": { maxLength: 100, location: "Doctor Profile" },
  
  // Copyright
  "copyright": { maxLength: 100, location: "Footer" },
};
