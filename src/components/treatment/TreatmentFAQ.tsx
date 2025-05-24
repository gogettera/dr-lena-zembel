
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TranslatedText } from '@/components/ui/translated-text';

interface TreatmentFAQProps {
  treatmentType: string;
}

const TreatmentFAQ: React.FC<TreatmentFAQProps> = ({ treatmentType }) => {
  const { t } = useLanguage();
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  
  // Get treatment-specific FAQ content
  const getFAQs = (type: string) => {
    switch (type) {
      case 'children-dentistry':
        return [
          {
            id: 'faq1',
            question: t('childrenDentistry.faq.items.0.question'),
            answer: t('childrenDentistry.faq.items.0.answer')
          },
          {
            id: 'faq2',
            question: t('childrenDentistry.faq.items.1.question'),
            answer: t('childrenDentistry.faq.items.1.answer')
          },
          {
            id: 'faq3',
            question: t('childrenDentistry.faq.items.2.question'),
            answer: t('childrenDentistry.faq.items.2.answer')
          },
          {
            id: 'faq4',
            question: t('childrenDentistry.faq.items.3.question'),
            answer: t('childrenDentistry.faq.items.3.answer')
          },
          {
            id: 'faq5',
            question: t('childrenDentistry.faq.items.4.question'),
            answer: t('childrenDentistry.faq.items.4.answer')
          }
        ];
      case 'aesthetic-treatments':
        return [
          {
            id: 'faq1',
            question: t('aestheticTreatments.faq.items.0.question'),
            answer: t('aestheticTreatments.faq.items.0.answer')
          },
          {
            id: 'faq2',
            question: t('aestheticTreatments.faq.items.1.question'),
            answer: t('aestheticTreatments.faq.items.1.answer')
          },
          {
            id: 'faq3',
            question: t('aestheticTreatments.faq.items.2.question'),
            answer: t('aestheticTreatments.faq.items.2.answer')
          },
          {
            id: 'faq4',
            question: t('aestheticTreatments.faq.items.3.question'),
            answer: t('aestheticTreatments.faq.items.3.answer')
          }
        ];
      case 'orthodontics':
        return [
          {
            id: 'faq1',
            question: t('orthodontics.faq.items.0.question'),
            answer: t('orthodontics.faq.items.0.answer')
          },
          {
            id: 'faq2',
            question: t('orthodontics.faq.items.1.question'),
            answer: t('orthodontics.faq.items.1.answer')
          },
          {
            id: 'faq3',
            question: t('orthodontics.faq.items.2.question'),
            answer: t('orthodontics.faq.items.2.answer')
          },
          {
            id: 'faq4',
            question: t('orthodontics.faq.items.3.question'),
            answer: t('orthodontics.faq.items.3.answer')
          }
        ];
      case 'root-canal':
        return [
          {
            id: 'faq1',
            question: t('rootCanal.faq.items.0.question'),
            answer: t('rootCanal.faq.items.0.answer')
          },
          {
            id: 'faq2',
            question: t('rootCanal.faq.items.1.question'),
            answer: t('rootCanal.faq.items.1.answer')
          },
          {
            id: 'faq3',
            question: t('rootCanal.faq.items.2.question'),
            answer: t('rootCanal.faq.items.2.answer')
          },
          {
            id: 'faq4',
            question: t('rootCanal.faq.items.3.question'),
            answer: t('rootCanal.faq.items.3.answer')
          }
        ];
      case 'preventive-medicine':
        return [
          {
            id: 'faq1',
            question: t('treatments.preventiveMedicine.faq.frequency'),
            answer: t('treatments.preventiveMedicine.faq.frequencyAnswer')
          },
          {
            id: 'faq2',
            question: t('treatments.preventiveMedicine.faq.pain'),
            answer: t('treatments.preventiveMedicine.faq.painAnswer')
          },
          {
            id: 'faq3',
            question: t('treatments.preventiveMedicine.faq.duration'),
            answer: t('treatments.preventiveMedicine.faq.durationAnswer')
          },
          {
            id: 'faq4',
            question: t('treatments.preventiveMedicine.faq.preparation'),
            answer: t('treatments.preventiveMedicine.faq.preparationAnswer')
          }
        ];
      case 'oral-rehabilitation':
        return [
          {
            id: 'faq1',
            question: t('treatments.oralRehabilitation.faq.timeline'),
            answer: t('treatments.oralRehabilitation.faq.timelineAnswer')
          },
          {
            id: 'faq2',
            question: t('treatments.oralRehabilitation.faq.cost'),
            answer: t('treatments.oralRehabilitation.faq.costAnswer')
          },
          {
            id: 'faq3',
            question: t('treatments.oralRehabilitation.faq.options'),
            answer: t('treatments.oralRehabilitation.faq.optionsAnswer')
          },
          {
            id: 'faq4',
            question: t('treatments.oralRehabilitation.faq.maintenance'),
            answer: t('treatments.oralRehabilitation.faq.maintenanceAnswer')
          }
        ];
      default:
        return [
          {
            id: 'faq1',
            question: t('treatments.faq.duration'),
            answer: t('treatments.faq.durationAnswer')
          },
          {
            id: 'faq2',
            question: t('treatments.faq.pain'),
            answer: t('treatments.faq.painAnswer')
          },
          {
            id: 'faq3',
            question: t('treatments.faq.cost'),
            answer: t('treatments.faq.costAnswer')
          },
          {
            id: 'faq4',
            question: t('treatments.faq.aftercare'),
            answer: t('treatments.faq.aftercareAnswer')
          },
          {
            id: 'faq5',
            question: t('treatments.faq.followup'),
            answer: t('treatments.faq.followupAnswer')
          }
        ];
    }
  };

  const faqs = getFAQs(treatmentType);
  
  const getTitleKey = (type: string) => {
    switch (type) {
      case 'children-dentistry':
        return 'childrenDentistry.faq.title';
      case 'aesthetic-treatments':
        return 'aestheticTreatments.faq.title';
      case 'orthodontics':
        return 'orthodontics.faq.title';
      case 'root-canal':
        return 'rootCanal.faq.title';
      default:
        return 'treatments.faq.title';
    }
  };

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <TranslatedText
          textKey={getTitleKey(treatmentType)}
          as="h3"
          className="text-2xl font-bold text-dental-navy mb-6" 
        />
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Collapsible
              key={faq.id}
              open={openItem === faq.id}
              onOpenChange={() => toggleItem(faq.id)}
              className="border border-dental-beige rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-dental-beige/10 text-left">
                <h4 className="text-lg font-medium text-dental-navy">{faq.question}</h4>
                {openItem === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-dental-orange" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-dental-navy" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white">
                <p className="text-dental-navy/80">{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentFAQ;
