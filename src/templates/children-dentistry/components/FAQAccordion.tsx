
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQAccordion: React.FC = () => {
  const { t } = useLanguage();
  
  // Get FAQ items from the translation file
  const faqItems = [
    {
      question: t('childrenDentistry.faq.items.0.q'),
      answer: t('childrenDentistry.faq.items.0.a')
    },
    {
      question: t('childrenDentistry.faq.items.1.q'),
      answer: t('childrenDentistry.faq.items.1.a')
    },
    {
      question: t('childrenDentistry.faq.items.2.q'),
      answer: t('childrenDentistry.faq.items.2.a')
    },
    {
      question: t('childrenDentistry.faq.items.3.q'),
      answer: t('childrenDentistry.faq.items.3.a')
    },
    {
      question: t('childrenDentistry.faq.items.4.q'),
      answer: t('childrenDentistry.faq.items.4.a')
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-20 px-4 bg-white scroll-mt-24">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-3 text-center">
          {t('childrenDentistry.faq.title')}
        </h2>
        <p className="text-center text-dental-navy/70 mb-8">
          {t('childrenDentistry.faq.subtitle')}
        </p>
        
        <Accordion type="single" collapsible className="bg-white rounded-2xl shadow-soft overflow-hidden">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-dental-beige/30 last:border-none px-6">
              <AccordionTrigger className="text-dental-navy font-medium py-4 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-dental-navy/70 pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQAccordion;
