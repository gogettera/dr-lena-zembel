
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQItem } from '@/types/botox-treatments';
import { useDirectionalStyles } from '@/utils/direction';

const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const dir = useDirectionalStyles();
  
  // Default FAQs in case translations aren't available
  const defaultFAQs: FAQItem[] = [
    {
      question: "Are botox and hyaluronic acid treatments painful?",
      answer: "The treatments involve minimal discomfort. Local anesthetic cream can be applied before injection. Most patients report only a slight pinching sensation."
    },
    {
      question: "How long do the results last?",
      answer: "Botox results last between 3-6 months. Hyaluronic acid treatments can last 6-18 months, depending on the treated area and type of material."
    },
    {
      question: "When will I see results?",
      answer: "Botox results begin to show within 3-7 days and peak after about two weeks. Hyaluronic acid results are immediate."
    }
  ];

  // Safely get FAQ items from translations or use defaults
  let faqItems: FAQItem[] = defaultFAQs;
  try {
    const translatedFAQs = t('botoxTreatments.faqItems');
    if (translatedFAQs && typeof translatedFAQs !== 'string' && Array.isArray(translatedFAQs)) {
      faqItems = translatedFAQs as FAQItem[];
    }
  } catch (error) {
    console.error('Error parsing FAQ items:', error);
  }

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.faqTitle') as string}
        subtitle={t('botoxTreatments.faqSubtitle') as string}
      />
      
      <div className="max-w-3xl mx-auto mt-12">
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className={`border border-dental-beige/30 rounded-xl px-6 overflow-hidden ${dir.textAlign}`}
            >
              <AccordionTrigger className="text-lg font-medium text-dental-navy py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-dental-navy/80 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-lg text-dental-navy/70 mb-6">
          {t('botoxTreatments.faqCallout') as string}
        </p>
        <div className={`flex justify-center space-x-4 ${dir.spaceDir}`}>
          <a 
            href={`tel:${t('clinicInfo.phone')}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-dental-orange hover:bg-dental-orange/90"
          >
            {t('botoxTreatments.callUs') as string}
          </a>
          <a 
            href="#booking"
            className="inline-flex items-center justify-center px-6 py-3 border border-dental-orange text-base font-medium rounded-full text-dental-orange bg-white hover:bg-dental-beige/10"
          >
            {t('botoxTreatments.bookAppointment') as string}
          </a>
        </div>
      </div>
    </Container>
  );
};

export default FAQSection;
