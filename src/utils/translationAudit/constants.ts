
// Treatment-specific keys that should exist for each treatment
export const EXPECTED_TREATMENT_KEYS = [
  // Basic treatment info
  'treatments.{treatment}',
  'treatments.{treatment}Desc',
  
  // Landing page content
  '{treatment}.hero.title',
  '{treatment}.hero.subtitle',
  '{treatment}.whyUs.title',
  '{treatment}.whyUs.subtitle',
  '{treatment}.whyUs.reasons.0.title',
  '{treatment}.whyUs.reasons.0.description',
  '{treatment}.whyUs.reasons.1.title',
  '{treatment}.whyUs.reasons.1.description',
  '{treatment}.whyUs.reasons.2.title',
  '{treatment}.whyUs.reasons.2.description',
  '{treatment}.whyUs.reasons.3.title',
  '{treatment}.whyUs.reasons.3.description',
  
  // Visit steps
  '{treatment}.visitSteps.title',
  '{treatment}.visitSteps.subtitle',
  '{treatment}.visitSteps.steps.0.title',
  '{treatment}.visitSteps.steps.0.description',
  '{treatment}.visitSteps.steps.1.title',
  '{treatment}.visitSteps.steps.1.description',
  '{treatment}.visitSteps.steps.2.title',
  '{treatment}.visitSteps.steps.2.description',
  '{treatment}.visitSteps.steps.3.title',
  '{treatment}.visitSteps.steps.3.description',
  '{treatment}.visitSteps.steps.4.title',
  '{treatment}.visitSteps.steps.4.description',
  
  // FAQ
  '{treatment}.faq.title',
  '{treatment}.faq.items.0.question',
  '{treatment}.faq.items.0.answer',
  '{treatment}.faq.items.1.question',
  '{treatment}.faq.items.1.answer',
  '{treatment}.faq.items.2.question',
  '{treatment}.faq.items.2.answer',
  '{treatment}.faq.items.3.question',
  '{treatment}.faq.items.3.answer',
  '{treatment}.faq.items.4.question',
  '{treatment}.faq.items.4.answer',
  
  // Benefits
  '{treatment}.benefits.items.0.title',
  '{treatment}.benefits.items.1.title',
  '{treatment}.benefits.items.2.title',
  '{treatment}.benefits.items.3.title',
  
  // Testimonials
  '{treatment}.testimonials.title',
  '{treatment}.testimonials.subtitle',
  
  // Contact form
  '{treatment}.contact.title',
  '{treatment}.contact.subtitle',
  '{treatment}.contact.form.parentName',
  '{treatment}.contact.form.childName',
  '{treatment}.contact.form.age',
  '{treatment}.contact.form.phone',
  '{treatment}.contact.form.message',
  '{treatment}.contact.form.privacy',
  '{treatment}.contact.form.submitButton',
  '{treatment}.contact.form.sending',
  '{treatment}.contact.form.success',
  '{treatment}.contact.success.title',
  '{treatment}.contact.success.description',
  
  // Book visit section
  '{treatment}.bookVisit.title',
  '{treatment}.bookVisit.subtitle',
  '{treatment}.bookVisit.address',
  '{treatment}.bookVisit.hours',
  '{treatment}.bookVisit.wazeButton',
  '{treatment}.bookVisit.backToTop',
  
  // Clinic expertise
  '{treatment}.clinicExpertise.title',
  '{treatment}.clinicExpertise.items.0.title',
  '{treatment}.clinicExpertise.items.0.description',
  '{treatment}.clinicExpertise.items.1.title',
  '{treatment}.clinicExpertise.items.1.description',
  '{treatment}.clinicExpertise.items.2.title',
  '{treatment}.clinicExpertise.items.2.description'
];

// Common UI keys that should exist
export const EXPECTED_UI_KEYS = [
  'treatments.tabs.overview',
  'treatments.tabs.procedure',
  'treatments.tabs.benefits',
  'treatments.tabs.faq',
  'treatments.tabs.testimonials',
  'treatments.tabs.related',
  'treatments.fullExperience',
  'treatments.viewCompleteLandingPage',
  'treatments.viewFullPage',
  'treatments.keyPoints',
  'treatments.procedure.title',
  'treatments.procedure.consultation',
  'treatments.procedure.examination',
  'treatments.procedure.treatment',
  'treatments.procedure.followup',
  'treatments.procedure.afterCare',
  'treatments.procedure.afterCareDesc',
  'treatments.procedure.followUpDesc',
  'treatments.benefits.professional',
  'treatments.benefits.modern',
  'treatments.benefits.comfortable',
  'treatments.benefits.effective',
];

// Treatment types to audit
export const TREATMENT_TYPES = [
  'children-dentistry',
  'aesthetic-treatments',
  'orthodontics',
  'root-canal',
  'oral-rehabilitation',
  'preventive-medicine'
];

export const SUPPORTED_LANGUAGES: Language[] = ['he', 'en', 'ru', 'de', 'ar'];
