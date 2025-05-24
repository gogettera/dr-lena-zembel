
import { auditSpecificTreatment, auditTranslationKeys } from './core';

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
