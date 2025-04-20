type TranslationMeta = {
  maxLength: number;
  location: string;
};

type TranslationMetadataType = {
  [key: string]: TranslationMeta;
};

export const translationMetadata: TranslationMetadataType = {
  home: { maxLength: 20, location: "Navigation" },
  about: { maxLength: 20, location: "Navigation" },
  treatments: { maxLength: 30, location: "Navigation" },
  contact: { maxLength: 20, location: "Navigation" },
  practice: { maxLength: 30, location: "Navigation" },
  team: { maxLength: 20, location: "Navigation" },
  patients: { maxLength: 30, location: "Navigation" },
  testimonials: { maxLength: 50, location: "Reviews Page" },
  patientsExperiences: { maxLength: 100, location: "Reviews Page" },
  ourTreatments: { maxLength: 50, location: "Treatments Page" },
  wideRangeOfTreatments: { maxLength: 100, location: "Treatments Page" },
  updatesFromPractice: { maxLength: 50, location: "Home Page" },
  followOnFacebook: { maxLength: 80, location: "Social Section" },
  followOnFacebookButton: { maxLength: 30, location: "Social Section" },
  dentistryWithLove: { maxLength: 60, location: "Home Page Hero" },
  localDental: { maxLength: 200, location: "Home Page Hero" },
  bookVisit: { maxLength: 30, location: "Call to Action" },
  moreDetails: { maxLength: 30, location: "Common UI" },
  completelyHappy: { maxLength: 50, location: "Home Page" },
  newLook: { maxLength: 50, location: "Home Page" },
  practiceFresh: { maxLength: 200, location: "About Section" },
  experiencedDoctors: { maxLength: 50, location: "Features Section" },
  advancedEquipment: { maxLength: 50, location: "Features Section" },
  shortWaits: { maxLength: 50, location: "Features Section" },
  bookNow: { maxLength: 20, location: "Call to Action" },
  childrenDentistry: { maxLength: 30, location: "Services" },
  childrenDentistryDesc: { maxLength: 100, location: "Services" },
  aestheticTreatments: { maxLength: 30, location: "Services" },
  aestheticTreatmentsDesc: { maxLength: 100, location: "Services" },
  preventiveMedicine: { maxLength: 30, location: "Services" },
  preventiveMedicineDesc: { maxLength: 100, location: "Services" },
  rootCanal: { maxLength: 30, location: "Services" },
  rootCanalDesc: { maxLength: 100, location: "Services" },
  oralRehabilitation: { maxLength: 30, location: "Services" },
  oralRehabilitationDesc: { maxLength: 100, location: "Services" },
  orthodontics: { maxLength: 30, location: "Services" },
  orthodonticsDesc: { maxLength: 100, location: "Services" },
  learnMore: { maxLength: 20, location: "Common UI" },
  openingHours: { maxLength: 30, location: "Footer" },
  sundayToThursday: { maxLength: 30, location: "Footer" },
  friday: { maxLength: 20, location: "Footer" },
  contactUs: { maxLength: 30, location: "Footer" },
  address: { maxLength: 100, location: "Footer" },
  allRightsReserved: { maxLength: 50, location: "Footer" },
  clinicDescription: { maxLength: 100, location: "SEO" },
  watchOurClinic: { maxLength: 50, location: "Video Section" },
  clinicTourDescription: { maxLength: 100, location: "Video Section" },
  readFullReview: { maxLength: 30, location: "Reviews" },
  
  // Doctor profile section
  doctorName: { maxLength: 30, location: "Doctor Profile" },
  doctorEducation: { maxLength: 150, location: "Doctor Profile" },
  doctorTreatments: { maxLength: 200, location: "Doctor Profile" },
  doctorApproach: { maxLength: 200, location: "Doctor Profile" },
  doctorPhilosophy: { maxLength: 200, location: "Doctor Profile" },
  transparency: { maxLength: 100, location: "Doctor Values" },
  xrayPolicy: { maxLength: 100, location: "Doctor Values" },
  treatmentOptions: { maxLength: 100, location: "Doctor Values" },
  
  // Add or update FAQ related metadata
  "frequentlyAskedQuestions": { maxLength: 30, location: "FAQ Section" },
  "faqDescription": { maxLength: 100, location: "FAQ Section" },
  
  // Update address and contact information
  "address": { maxLength: 50, location: "Contact Information" },
  "contactUs": { maxLength: 20, location: "Contact Information" },
  "phoneNumber": { maxLength: 20, location: "Contact Information" },
  
  // Update opening hours
  "openingHours": { maxLength: 30, location: "Business Hours" },
  "sundayToFriday": { maxLength: 40, location: "Business Hours" },
  
  // Update doctor information
  "aboutMeIntro": { maxLength: 250, location: "Doctor Profile" },
  "aboutMeClinic": { maxLength: 250, location: "Doctor Profile" },
  "aboutMeLanguages": { maxLength: 150, location: "Doctor Profile" },
  "aboutMeInvite": { maxLength: 100, location: "Doctor Profile" }
};
