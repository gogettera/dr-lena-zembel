
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface TreatmentProcedureProps {
  treatmentType: string;
}

const TreatmentProcedure: React.FC<TreatmentProcedureProps> = ({ treatmentType }) => {
  const { t } = useLanguage();
  
  // Get treatment-specific procedure steps
  const getProcedureSteps = (type: string) => {
    switch (type) {
      case 'children-dentistry':
        return [
          {
            id: 'step1',
            title: t('childrenDentistry.visitSteps.steps.0.title'),
            description: t('childrenDentistry.visitSteps.steps.0.description')
          },
          {
            id: 'step2',
            title: t('childrenDentistry.visitSteps.steps.1.title'),
            description: t('childrenDentistry.visitSteps.steps.1.description')
          },
          {
            id: 'step3',
            title: t('childrenDentistry.visitSteps.steps.2.title'),
            description: t('childrenDentistry.visitSteps.steps.2.description')
          },
          {
            id: 'step4',
            title: t('childrenDentistry.visitSteps.steps.3.title'),
            description: t('childrenDentistry.visitSteps.steps.3.description')
          },
          {
            id: 'step5',
            title: t('childrenDentistry.visitSteps.steps.4.title'),
            description: t('childrenDentistry.visitSteps.steps.4.description')
          }
        ];
      case 'aesthetic-treatments':
        return [
          {
            id: 'step1',
            title: t('aestheticTreatments.process.steps.consultation'),
            description: t('aestheticTreatments.process.steps.consultationDesc')
          },
          {
            id: 'step2',
            title: t('aestheticTreatments.process.steps.planning'),
            description: t('aestheticTreatments.process.steps.planningDesc')
          },
          {
            id: 'step3',
            title: t('aestheticTreatments.process.steps.treatment'),
            description: t('aestheticTreatments.process.steps.treatmentDesc')
          },
          {
            id: 'step4',
            title: t('aestheticTreatments.process.steps.followup'),
            description: t('aestheticTreatments.process.steps.followupDesc')
          }
        ];
      case 'orthodontics':
        return [
          {
            id: 'step1',
            title: t('orthodontics.visitSteps.steps.0.title'),
            description: t('orthodontics.visitSteps.steps.0.description')
          },
          {
            id: 'step2',
            title: t('orthodontics.visitSteps.steps.1.title'),
            description: t('orthodontics.visitSteps.steps.1.description')
          },
          {
            id: 'step3',
            title: t('orthodontics.visitSteps.steps.2.title'),
            description: t('orthodontics.visitSteps.steps.2.description')
          },
          {
            id: 'step4',
            title: t('orthodontics.visitSteps.steps.3.title'),
            description: t('orthodontics.visitSteps.steps.3.description')
          }
        ];
      case 'root-canal':
        return [
          {
            id: 'step1',
            title: t('rootCanal.visitSteps.steps.0.title'),
            description: t('rootCanal.visitSteps.steps.0.description')
          },
          {
            id: 'step2',
            title: t('rootCanal.visitSteps.steps.1.title'),
            description: t('rootCanal.visitSteps.steps.1.description')
          },
          {
            id: 'step3',
            title: t('rootCanal.visitSteps.steps.2.title'),
            description: t('rootCanal.visitSteps.steps.2.description')
          },
          {
            id: 'step4',
            title: t('rootCanal.visitSteps.steps.3.title'),
            description: t('rootCanal.visitSteps.steps.3.description')
          }
        ];
      case 'preventive-medicine':
        return [
          {
            id: 'step1',
            title: t('treatments.preventiveMedicine.process.examination'),
            description: t('treatments.preventiveMedicine.process.examinationDesc')
          },
          {
            id: 'step2',
            title: t('treatments.preventiveMedicine.process.cleaning'),
            description: t('treatments.preventiveMedicine.process.cleaningDesc')
          },
          {
            id: 'step3',
            title: t('treatments.preventiveMedicine.process.consultation'),
            description: t('treatments.preventiveMedicine.process.consultationDesc')
          },
          {
            id: 'step4',
            title: t('treatments.preventiveMedicine.process.planning'),
            description: t('treatments.preventiveMedicine.process.planningDesc')
          }
        ];
      case 'oral-rehabilitation':
        return [
          {
            id: 'step1',
            title: t('treatments.oralRehabilitation.process.assessment'),
            description: t('treatments.oralRehabilitation.process.assessmentDesc')
          },
          {
            id: 'step2',
            title: t('treatments.oralRehabilitation.process.planning'),
            description: t('treatments.oralRehabilitation.process.planningDesc')
          },
          {
            id: 'step3',
            title: t('treatments.oralRehabilitation.process.preparation'),
            description: t('treatments.oralRehabilitation.process.preparationDesc')
          },
          {
            id: 'step4',
            title: t('treatments.oralRehabilitation.process.restoration'),
            description: t('treatments.oralRehabilitation.process.restorationDesc')
          },
          {
            id: 'step5',
            title: t('treatments.oralRehabilitation.process.maintenance'),
            description: t('treatments.oralRehabilitation.process.maintenanceDesc')
          }
        ];
      default:
        return [
          {
            id: 'step1',
            title: t('treatments.procedure.consultation'),
            description: t('treatments.procedure.consultationDesc')
          },
          {
            id: 'step2',
            title: t('treatments.procedure.examination'),
            description: t('treatments.procedure.examinationDesc')
          },
          {
            id: 'step3',
            title: t('treatments.procedure.treatment'),
            description: t('treatments.procedure.treatmentDesc')
          },
          {
            id: 'step4',
            title: t('treatments.procedure.followup'),
            description: t('treatments.procedure.followupDesc')
          }
        ];
    }
  };

  const procedures = getProcedureSteps(treatmentType);
  
  const getTitleKey = (type: string) => {
    switch (type) {
      case 'children-dentistry':
        return 'childrenDentistry.visitSteps.title';
      case 'aesthetic-treatments':
        return 'aestheticTreatments.process.title';
      case 'orthodontics':
        return 'orthodontics.visitSteps.title';
      case 'root-canal':
        return 'rootCanal.visitSteps.title';
      default:
        return 'treatments.procedure.title';
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-2xl font-bold text-dental-navy mb-6">
          {t(getTitleKey(treatmentType))}
        </h3>
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-dental-beige/70" />
          
          <div className="space-y-8">
            {procedures.map((step, index) => (
              <div key={step.id} className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-dental-pink/30 flex items-center justify-center border-2 border-white">
                  <span className="text-dental-navy font-bold">{index + 1}</span>
                </div>
                <h4 className="text-lg font-semibold text-dental-navy mb-2">{step.title}</h4>
                <p className="text-dental-navy/80">{step.description}</p>
              </div>
            ))}
          </div>
          
          {treatmentType !== 'children-dentistry' && (
            <div className="mt-8 pt-8 border-t border-dental-beige/50">
              <h4 className="text-lg font-semibold text-dental-navy mb-4">
                {t('treatments.procedure.afterCare')}
              </h4>
              <p className="text-dental-navy/80 mb-4">
                {t('treatments.procedure.afterCareDesc')}
              </p>
              <p className="text-dental-navy/80">
                {t('treatments.procedure.followUpDesc')}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentProcedure;
