
import React from 'react';
import { auditSpecificTreatment } from '@/utils/translationAudit';
import TranslationAuditOverview from './translation-audit-results/TranslationAuditOverview';
import TranslationAuditTreatmentDetail from './translation-audit-results/TranslationAuditTreatmentDetail';
import TranslationAuditAllTreatmentsSummary from './translation-audit-results/TranslationAuditAllTreatmentsSummary';
import TranslationAuditCriticalKeys from './translation-audit-results/TranslationAuditCriticalKeys';
import TranslationAuditConsoleOutput from './translation-audit-results/TranslationAuditConsoleOutput';
import { useTranslationAuditResults } from './translation-audit-results/useTranslationAuditResults';

const TranslationAuditResults: React.FC = () => {
  const { childrenDentistryAudit, allAudits } = useTranslationAuditResults();

  return (
    <div className="space-y-6">
      <TranslationAuditOverview
        missingKeysCount={childrenDentistryAudit.missingKeys.length}
        totalKeysCount={childrenDentistryAudit.totalKeysChecked}
      />

      <TranslationAuditTreatmentDetail audit={childrenDentistryAudit} />

      <TranslationAuditAllTreatmentsSummary allAudits={allAudits} />

      <TranslationAuditCriticalKeys allAudits={allAudits} />

      <TranslationAuditConsoleOutput allAudits={allAudits} />
    </div>
  );
};

// Console logging for immediate feedback
const logAuditResults = () => {
  const treatments = [
    'children-dentistry',
    'aesthetic-treatments', 
    'orthodontics',
    'root-canal',
    'oral-rehabilitation',
    'preventive-medicine'
  ];

  console.group('🔍 COMPREHENSIVE TRANSLATION AUDIT');
  
  treatments.forEach(treatment => {
    const audit = auditSpecificTreatment(treatment);
    const completion = Math.round(((audit.totalKeysChecked - audit.missingKeys.length) / audit.totalKeysChecked) * 100);
    
    console.group(`📄 ${treatment.toUpperCase()}`);
    console.log(`Total Keys: ${audit.totalKeysChecked}`);
    console.log(`Missing Keys: ${audit.missingKeys.length}`);
    console.log(`Completion: ${completion}%`);
    console.log(`High Priority Missing: ${audit.missingKeys.filter(k => k.priority === 'high').length}`);
    
    const highPriority = audit.missingKeys.filter(k => k.priority === 'high').slice(0, 5);
    if (highPriority.length > 0) {
      console.log('Top Missing Keys:');
      highPriority.forEach(key => {
        console.log(`  ❌ ${key.key} (missing in: ${key.missingInLanguages.join(', ')})`);
      });
    }
    console.groupEnd();
  });
  
  console.groupEnd();
};

// Run the audit immediately
logAuditResults();

export default TranslationAuditResults;
