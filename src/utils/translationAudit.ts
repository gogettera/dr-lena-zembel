import { translations } from '@/utils/translation/core';
import { Language } from '@/types/language';

export interface MissingTranslationKey {
  key: string;
  missingInLanguages: Language[];
  usedInFiles: string[];
  category: string;
  priority: 'high' | 'medium' | 'low';
}

export interface TranslationAuditReport {
  totalKeysChecked: number;
  missingKeys: MissingTranslationKey[];
  completionByLanguage: Record<Language, number>;
  categorySummary: Record<string, number>;
}

// Treatment-specific keys that should exist for each treatment
const EXPECTED_TREATMENT_KEYS = [
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
const EXPECTED_UI_KEYS = [
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
const TREATMENT_TYPES = [
  'children-dentistry',
  'aesthetic-treatments',
  'orthodontics',
  'root-canal',
  'oral-rehabilitation',
  'preventive-medicine'
];

export function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

export function checkKeyExists(translations: any, language: Language, key: string): boolean {
  const langTranslations = translations[language];
  if (!langTranslations) return false;
  
  const value = getNestedValue(langTranslations, key);
  return value !== undefined && value !== null && value !== '';
}

export function generateTreatmentKeys(treatment: string): string[] {
  return EXPECTED_TREATMENT_KEYS.map(key => key.replace('{treatment}', treatment));
}

export function auditSpecificTreatment(treatmentType: string): TranslationAuditReport {
  const missingKeys: MissingTranslationKey[] = [];
  const languages: Language[] = ['he', 'en', 'ru', 'de', 'ar'];
  const completionByLanguage: Record<Language, number> = {} as Record<Language, number>;
  const categorySummary: Record<string, number> = {};
  
  // Generate keys for specific treatment
  const treatmentKeys = generateTreatmentKeys(treatmentType);
  const allKeysToCheck: Array<{key: string, category: string, priority: 'high' | 'medium' | 'low'}> = [];
  
  // Add treatment-specific keys
  treatmentKeys.forEach(key => {
    let priority: 'high' | 'medium' | 'low' = 'high';
    if (key.includes('.faq.') || key.includes('.testimonials.')) {
      priority = 'medium';
    }
    if (key.includes('.contact.') || key.includes('.bookVisit.')) {
      priority = 'low';
    }
    
    allKeysToCheck.push({
      key,
      category: `Treatment: ${treatmentType}`,
      priority
    });
  });
  
  // Check each key across all languages
  allKeysToCheck.forEach(({key, category, priority}) => {
    const missingInLanguages: Language[] = [];
    
    languages.forEach(language => {
      if (!checkKeyExists(translations, language, key)) {
        missingInLanguages.push(language);
      }
    });
    
    if (missingInLanguages.length > 0) {
      missingKeys.push({
        key,
        missingInLanguages,
        usedInFiles: [], // Will be populated by file analysis
        category,
        priority
      });
      
      categorySummary[category] = (categorySummary[category] || 0) + 1;
    }
  });
  
  // Calculate completion percentage by language
  languages.forEach(language => {
    const totalKeys = allKeysToCheck.length;
    const missingInThisLanguage = missingKeys.filter(mk => 
      mk.missingInLanguages.includes(language)
    ).length;
    completionByLanguage[language] = Math.round(((totalKeys - missingInThisLanguage) / totalKeys) * 100);
  });
  
  return {
    totalKeysChecked: allKeysToCheck.length,
    missingKeys,
    completionByLanguage,
    categorySummary
  };
}

export function auditTranslationKeys(): TranslationAuditReport {
  const missingKeys: MissingTranslationKey[] = [];
  const languages: Language[] = ['he', 'en', 'ru', 'de', 'ar'];
  const completionByLanguage: Record<Language, number> = {} as Record<Language, number>;
  const categorySummary: Record<string, number> = {};
  
  // Collect all keys to check
  const allKeysToCheck: Array<{key: string, category: string, priority: 'high' | 'medium' | 'low'}> = [];
  
  // Add UI keys
  EXPECTED_UI_KEYS.forEach(key => {
    allKeysToCheck.push({
      key,
      category: 'UI Components',
      priority: 'high'
    });
  });
  
  // Add treatment-specific keys
  TREATMENT_TYPES.forEach(treatment => {
    const treatmentKeys = generateTreatmentKeys(treatment);
    treatmentKeys.forEach(key => {
      allKeysToCheck.push({
        key,
        category: `Treatment: ${treatment}`,
        priority: key.includes('.faq.') ? 'medium' : 'high'
      });
    });
  });
  
  // Check each key across all languages
  allKeysToCheck.forEach(({key, category, priority}) => {
    const missingInLanguages: Language[] = [];
    
    languages.forEach(language => {
      if (!checkKeyExists(translations, language, key)) {
        missingInLanguages.push(language);
      }
    });
    
    if (missingInLanguages.length > 0) {
      missingKeys.push({
        key,
        missingInLanguages,
        usedInFiles: [], // Will be populated by file analysis
        category,
        priority
      });
      
      categorySummary[category] = (categorySummary[category] || 0) + 1;
    }
  });
  
  // Calculate completion percentage by language
  languages.forEach(language => {
    const totalKeys = allKeysToCheck.length;
    const missingInThisLanguage = missingKeys.filter(mk => 
      mk.missingInLanguages.includes(language)
    ).length;
    completionByLanguage[language] = Math.round(((totalKeys - missingInThisLanguage) / totalKeys) * 100);
  });
  
  return {
    totalKeysChecked: allKeysToCheck.length,
    missingKeys,
    completionByLanguage,
    categorySummary
  };
}

export function generateDetailedTreatmentReport(treatmentType: string): string {
  const report = auditSpecificTreatment(treatmentType);
  
  let output = `# Translation Audit Report - ${treatmentType}\n\n`;
  
  // Summary
  output += `## Summary\n`;
  output += `- Total keys checked: ${report.totalKeysChecked}\n`;
  output += `- Missing keys found: ${report.missingKeys.length}\n`;
  output += `- Completion rate: ${Math.round(((report.totalKeysChecked - report.missingKeys.length) / report.totalKeysChecked) * 100)}%\n\n`;
  
  // Completion by language
  output += `## Completion by Language\n`;
  Object.entries(report.completionByLanguage).forEach(([lang, percentage]) => {
    const status = percentage === 100 ? '✅' : percentage >= 80 ? '⚠️' : '❌';
    output += `- ${status} **${lang.toUpperCase()}**: ${percentage}%\n`;
  });
  output += '\n';
  
  // Missing keys by priority
  const priorities = ['high', 'medium', 'low'] as const;
  priorities.forEach(priority => {
    const priorityKeys = report.missingKeys.filter(mk => mk.priority === priority);
    if (priorityKeys.length === 0) return;
    
    output += `## ${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority Missing Keys (${priorityKeys.length})\n\n`;
    
    priorityKeys.forEach(mk => {
      output += `### \`${mk.key}\`\n`;
      output += `**Missing in:** ${mk.missingInLanguages.join(', ')}\n\n`;
    });
  });
  
  return output;
}

export function generateTranslationReport(): string {
  const report = auditTranslationKeys();
  
  let output = '# Translation Audit Report\n\n';
  
  // Summary
  output += `## Summary\n`;
  output += `- Total keys checked: ${report.totalKeysChecked}\n`;
  output += `- Missing keys found: ${report.missingKeys.length}\n`;
  output += `- Completion rate: ${Math.round(((report.totalKeysChecked - report.missingKeys.length) / report.totalKeysChecked) * 100)}%\n\n`;
  
  // Completion by language
  output += `## Completion by Language\n`;
  Object.entries(report.completionByLanguage).forEach(([lang, percentage]) => {
    output += `- ${lang.toUpperCase()}: ${percentage}%\n`;
  });
  output += '\n';
  
  // Category summary
  output += `## Missing Keys by Category\n`;
  Object.entries(report.categorySummary).forEach(([category, count]) => {
    output += `- ${category}: ${count} missing keys\n`;
  });
  output += '\n';
  
  // High priority missing keys
  const highPriorityMissing = report.missingKeys.filter(mk => mk.priority === 'high');
  if (highPriorityMissing.length > 0) {
    output += `## High Priority Missing Keys (${highPriorityMissing.length})\n`;
    highPriorityMissing.forEach(mk => {
      output += `- **${mk.key}** (missing in: ${mk.missingInLanguages.join(', ')})\n`;
    });
    output += '\n';
  }
  
  // Medium priority missing keys
  const mediumPriorityMissing = report.missingKeys.filter(mk => mk.priority === 'medium');
  if (mediumPriorityMissing.length > 0) {
    output += `## Medium Priority Missing Keys (${mediumPriorityMissing.length})\n`;
    mediumPriorityMissing.forEach(mk => {
      output += `- **${mk.key}** (missing in: ${mk.missingInLanguages.join(', ')})\n`;
    });
    output += '\n';
  }
  
  return output;
}
