
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
  
  // This would come from a real data source in a complete implementation
  const faqs = [
    {
      id: 'faq1',
      question: `${t('faqQuestion1')}`,
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui.'
    },
    {
      id: 'faq2',
      question: `${t('faqQuestion2')}`,
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui.'
    },
    {
      id: 'faq3',
      question: `${t('faqQuestion3')}`,
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui.'
    },
    {
      id: 'faq4',
      question: `${t('faqQuestion4')}`,
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui.'
    },
    {
      id: 'faq5',
      question: `${t('faqQuestion5')}`,
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui.'
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <TranslatedText
          textKey="frequentlyAskedQuestions"
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
