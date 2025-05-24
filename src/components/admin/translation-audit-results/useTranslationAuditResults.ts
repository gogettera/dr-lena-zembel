
import { auditSpecificTreatment } from '@/utils/translationAudit';

export const useTranslationAuditResults = () => {
  const allTreatments = [
    'children-dentistry',
    'aesthetic-treatments',
    'orthodontics',
    'root-canal',
    'oral-rehabilitation',
    'preventive-medicine'
  ];

  const childrenDentistryAudit = auditSpecificTreatment('children-dentistry');
  
  const allAudits = allTreatments.map(treatment => ({
    treatment,
    audit: auditSpecificTreatment(treatment)
  }));

  return {
    childrenDentistryAudit,
    allAudits
  };
};
